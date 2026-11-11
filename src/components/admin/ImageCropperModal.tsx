import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Modal, Button, Chip } from '@heroui/react';
import {
  Crop,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
  RotateCcw,
  Info,
  Sparkles,
  Move,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type AspectRatioType = '16:9' | '4:3' | '1:1' | 'free';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  initialAspect?: AspectRatioType;
  title?: string;
  targetModule?: 'NEWS' | 'GALLERY' | 'MEDIA' | 'GENERAL';
  onClose: () => void;
  onCropComplete: (
    croppedDataUrl: string,
    metadata: { width: number; height: number; aspect: string }
  ) => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  initialAspect = '16:9',
  title = 'Sesuaikan & Potong Gambar (Crop Tool)',
  targetModule = 'GENERAL',
  onClose,
  onCropComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>(initialAspect);
  const [zoom, setZoom] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Canvas internal buffer size
  const CANVAS_WIDTH = 640;
  const CANVAS_HEIGHT = 380;

  // Sync initial aspect ratio when modal opens
  useEffect(() => {
    if (isOpen) {
      setAspectRatio(initialAspect);
      setZoom(1.0);
      setRotation(0);
      setPan({ x: 0, y: 0 });
      setImageError(null);
    }
  }, [isOpen, initialAspect]);

  // Load image element
  useEffect(() => {
    if (!imageSrc || !isOpen) {
      setLoadedImage(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setLoadedImage(img);
      setImageError(null);
    };
    img.onerror = () => {
      setImageError('Gagal memuat berkas gambar. Pastikan format gambar valid (JPG, PNG, atau WebP).');
    };
    img.src = imageSrc;
  }, [imageSrc, isOpen]);

  // Compute Crop Box within Canvas Viewport
  const getCropBox = useCallback(() => {
    const margin = 24;
    const availW = CANVAS_WIDTH - margin * 2;
    const availH = CANVAS_HEIGHT - margin * 2;

    let targetRatio = 16 / 9;
    if (aspectRatio === '4:3') targetRatio = 4 / 3;
    else if (aspectRatio === '1:1') targetRatio = 1;
    else if (aspectRatio === 'free') {
      if (loadedImage) {
        const isRot90 = rotation === 90 || rotation === 270;
        const w = isRot90 ? loadedImage.height : loadedImage.width;
        const h = isRot90 ? loadedImage.width : loadedImage.height;
        targetRatio = w / h;
      } else {
        targetRatio = 16 / 9;
      }
    }

    let w = availW;
    let h = w / targetRatio;

    if (h > availH) {
      h = availH;
      w = h * targetRatio;
    }

    const x = (CANVAS_WIDTH - w) / 2;
    const y = (CANVAS_HEIGHT - h) / 2;

    return { x, y, w, h };
  }, [aspectRatio, loadedImage, rotation]);

  // Render to Interactive Canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loadedImage) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cropBox = getCropBox();
    const isRot90 = rotation === 90 || rotation === 270;
    const effW = isRot90 ? loadedImage.height : loadedImage.width;
    const effH = isRot90 ? loadedImage.width : loadedImage.height;

    // Minimum scale required to fully cover crop box
    const baseScale = Math.max(cropBox.w / effW, cropBox.h / effH);
    const currentScale = baseScale * zoom;

    // 1. Clear background
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#0f0619';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 2. Draw transformed image
    ctx.save();
    const centerX = cropBox.x + cropBox.w / 2 + pan.x;
    const centerY = cropBox.y + cropBox.h / 2 + pan.y;

    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(currentScale, currentScale);
    ctx.drawImage(
      loadedImage,
      -loadedImage.width / 2,
      -loadedImage.height / 2,
      loadedImage.width,
      loadedImage.height
    );
    ctx.restore();

    // 3. Draw dark overlay outside crop box
    ctx.fillStyle = 'rgba(10, 4, 18, 0.72)';
    // Top
    ctx.fillRect(0, 0, CANVAS_WIDTH, cropBox.y);
    // Bottom
    ctx.fillRect(0, cropBox.y + cropBox.h, CANVAS_WIDTH, CANVAS_HEIGHT - (cropBox.y + cropBox.h));
    // Left
    ctx.fillRect(0, cropBox.y, cropBox.x, cropBox.h);
    // Right
    ctx.fillRect(cropBox.x + cropBox.w, cropBox.y, CANVAS_WIDTH - (cropBox.x + cropBox.w), cropBox.h);

    // 4. Draw active crop box border (Warm Yellow & Glow)
    ctx.strokeStyle = '#F5D32F';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(cropBox.x, cropBox.y, cropBox.w, cropBox.h);

    // 5. Draw rule-of-thirds grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    // Vertical grid lines
    ctx.moveTo(cropBox.x + cropBox.w / 3, cropBox.y);
    ctx.lineTo(cropBox.x + cropBox.w / 3, cropBox.y + cropBox.h);
    ctx.moveTo(cropBox.x + (cropBox.w * 2) / 3, cropBox.y);
    ctx.lineTo(cropBox.x + (cropBox.w * 2) / 3, cropBox.y + cropBox.h);
    // Horizontal grid lines
    ctx.moveTo(cropBox.x, cropBox.y + cropBox.h / 3);
    ctx.lineTo(cropBox.x + cropBox.w, cropBox.y + cropBox.h / 3);
    ctx.moveTo(cropBox.x, cropBox.y + (cropBox.h * 2) / 3);
    ctx.lineTo(cropBox.x + cropBox.w, cropBox.y + (cropBox.h * 2) / 3);
    ctx.stroke();
    ctx.setLineDash([]);

    // 6. Corner accents
    const cornerSize = 14;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(cropBox.x, cropBox.y + cornerSize);
    ctx.lineTo(cropBox.x, cropBox.y);
    ctx.lineTo(cropBox.x + cornerSize, cropBox.y);
    // Top-right
    ctx.moveTo(cropBox.x + cropBox.w - cornerSize, cropBox.y);
    ctx.lineTo(cropBox.x + cropBox.w, cropBox.y);
    ctx.lineTo(cropBox.x + cropBox.w, cropBox.y + cornerSize);
    // Bottom-left
    ctx.moveTo(cropBox.x, cropBox.y + cropBox.h - cornerSize);
    ctx.lineTo(cropBox.x, cropBox.y + cropBox.h);
    ctx.lineTo(cropBox.x + cornerSize, cropBox.y + cropBox.h);
    // Bottom-right
    ctx.moveTo(cropBox.x + cropBox.w - cornerSize, cropBox.y + cropBox.h);
    ctx.lineTo(cropBox.x + cropBox.w, cropBox.y + cropBox.h);
    ctx.lineTo(cropBox.x + cropBox.w, cropBox.y + cropBox.h - cornerSize);
    ctx.stroke();
  }, [loadedImage, rotation, zoom, pan, getCropBox]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Mouse & Touch Drag Event Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    setZoom((prev) => Math.min(3.0, Math.max(1.0, prev + delta)));
  };

  // Zoom helpers
  const handleZoomIn = () => setZoom((z) => Math.min(3.0, Number((z + 0.15).toFixed(2))));
  const handleZoomOut = () => setZoom((z) => Math.max(1.0, Number((z - 0.15).toFixed(2))));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);
  const handleReset = () => {
    setZoom(1.0);
    setRotation(0);
    setPan({ x: 0, y: 0 });
  };

  // Target Resolution Calculation
  const getTargetDimensions = () => {
    if (aspectRatio === '16:9') {
      return { width: 1200, height: 675, label: '1200 × 675 px (16:9 HD)' };
    }
    if (aspectRatio === '4:3') {
      return { width: 1200, height: 900, label: '1200 × 900 px (4:3 Standar)' };
    }
    if (aspectRatio === '1:1') {
      return { width: 800, height: 800, label: '800 × 800 px (1:1 Persegi)' };
    }
    if (loadedImage) {
      const isRot90 = rotation === 90 || rotation === 270;
      const w = isRot90 ? loadedImage.height : loadedImage.width;
      const h = isRot90 ? loadedImage.width : loadedImage.height;
      const maxSide = 1200;
      if (w >= h) {
        const outW = Math.min(w, maxSide);
        const outH = Math.round(outW * (h / w));
        return { width: outW, height: outH, label: `${outW} × ${outH} px (Bebas / Asli)` };
      } else {
        const outH = Math.min(h, maxSide);
        const outW = Math.round(outH * (w / h));
        return { width: outW, height: outH, label: `${outW} × ${outH} px (Bebas / Asli)` };
      }
    }
    return { width: 1200, height: 675, label: '1200 × 675 px' };
  };

  // Export Cropped High-Res Image
  const handleSaveCrop = () => {
    if (!loadedImage) return;

    const cropBox = getCropBox();
    const isRot90 = rotation === 90 || rotation === 270;
    const effW = isRot90 ? loadedImage.height : loadedImage.width;
    const effH = isRot90 ? loadedImage.width : loadedImage.height;
    const baseScale = Math.max(cropBox.w / effW, cropBox.h / effH);
    const currentScale = baseScale * zoom;

    const { width: targetW, height: targetH, label } = getTargetDimensions();

    const offscreen = document.createElement('canvas');
    offscreen.width = targetW;
    offscreen.height = targetH;
    const oCtx = offscreen.getContext('2d');

    if (!oCtx) return;

    oCtx.imageSmoothingEnabled = true;
    oCtx.imageSmoothingQuality = 'high';

    const outScale = targetW / cropBox.w;
    const targetCenterX = targetW / 2 + pan.x * outScale;
    const targetCenterY = targetH / 2 + pan.y * outScale;

    oCtx.save();
    oCtx.translate(targetCenterX, targetCenterY);
    oCtx.rotate((rotation * Math.PI) / 180);
    oCtx.scale(currentScale * outScale, currentScale * outScale);
    oCtx.drawImage(
      loadedImage,
      -loadedImage.width / 2,
      -loadedImage.height / 2,
      loadedImage.width,
      loadedImage.height
    );
    oCtx.restore();

    // Export as high quality JPEG (92%)
    const croppedDataUrl = offscreen.toDataURL('image/jpeg', 0.92);

    onCropComplete(croppedDataUrl, {
      width: targetW,
      height: targetH,
      aspect: label,
    });
    onClose();
  };

  const targetDim = getTargetDimensions();

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Container placement="center">
        <Modal.Dialog className="w-[96vw] sm:max-w-3xl max-h-[92vh] flex flex-col p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
          <Modal.CloseTrigger />

          {/* Modal Header */}
          <Modal.Header className="p-4 sm:p-5 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30 shrink-0">
            <div className="flex items-center justify-between gap-3 pr-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#6B18A8] text-white flex items-center justify-center font-black shadow-xs">
                  <Crop className="w-5 h-5 text-[#F5D32F]" />
                </div>
                <div>
                  <Modal.Heading className="text-base sm:text-lg font-black text-[#292333]">
                    {title}
                  </Modal.Heading>
                  <span className="text-[11px] text-neutral-500 block">
                    Sesuaikan komposisi foto agar presisi dengan template tata letak website publik.
                  </span>
                </div>
              </div>

              <Chip
                size="sm"
                className="bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] font-black text-[11px] hidden sm:inline-flex"
              >
                {targetDim.label}
              </Chip>
            </div>
          </Modal.Header>

          {/* Modal Body */}
          <Modal.Body className="p-4 sm:p-6 space-y-4 overflow-y-auto">
            {/* Guide Card for Dimensions */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#6B18A8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#6B18A8] block">
                    {targetModule === 'NEWS'
                      ? 'Standar Rekomendasi Banner Berita: 1200 × 675 px (Rasio 16:9)'
                      : targetModule === 'GALLERY'
                      ? 'Standar Rekomendasi Galeri Kegiatan: 1200 × 900 px (4:3) atau 1200 × 675 px (16:9)'
                      : 'Ukuran Standar Desain Website LPH UIN SGD'}
                  </span>
                  <p className="text-neutral-600 text-[11px] mt-0.5 leading-relaxed">
                    Gunakan rasio terpilih untuk template Canva / Photoshop Anda. Geser foto untuk menempatkan objek utama di dalam kotak panduan garis bantu (*Rule of Thirds*).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 bg-white px-3 py-1.5 rounded-xl border border-[#C9A5E8]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#F5D32F]" />
                <span className="font-mono font-bold text-[11px] text-neutral-800">
                  Target: {targetDim.width} × {targetDim.height}
                </span>
              </div>
            </div>

            {/* Aspect Ratio Preset Selector */}
            <div>
              <div className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Pilih Rasio Aspek Sesuai Penempatan:</span>
                <span className="text-neutral-400 font-normal">
                  Fokus tengah diutamakan
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    id: '16:9' as AspectRatioType,
                    label: '16:9 (Berita & Banner)',
                    dim: '1200 × 675 px',
                    rec: targetModule === 'NEWS',
                  },
                  {
                    id: '4:3' as AspectRatioType,
                    label: '4:3 (Galeri Lapangan)',
                    dim: '1200 × 900 px',
                    rec: targetModule === 'GALLERY',
                  },
                  {
                    id: '1:1' as AspectRatioType,
                    label: '1:1 (Persegi/Avatar)',
                    dim: '800 × 800 px',
                    rec: false,
                  },
                  {
                    id: 'free' as AspectRatioType,
                    label: 'Bebas (Rasio Asli)',
                    dim: 'Sesuai Foto',
                    rec: false,
                  },
                ].map((item) => {
                  const isActive = aspectRatio === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setAspectRatio(item.id);
                        setZoom(1.0);
                        setPan({ x: 0, y: 0 });
                      }}
                      className={cn(
                        'p-2.5 rounded-2xl border text-left transition-all cursor-pointer relative',
                        isActive
                          ? 'border-[#6B18A8] bg-[#6B18A8] text-white shadow-md shadow-purple-950/20'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:bg-[#FAF7FD] hover:border-[#C9A5E8]'
                      )}
                    >
                      <div className="text-xs font-bold truncate">{item.label}</div>
                      <div
                        className={cn(
                          'text-[10px] font-mono mt-0.5',
                          isActive ? 'text-[#F5D32F]' : 'text-neutral-500'
                        )}
                      >
                        {item.dim}
                      </div>
                      {item.rec && (
                        <span
                          className={cn(
                            'text-[9px] font-bold px-1.5 py-0.5 rounded-full absolute top-2 right-2',
                            isActive ? 'bg-[#F5D32F] text-[#4B0D78]' : 'bg-[#FFF7D1] text-[#713f12]'
                          )}
                        >
                          Disarankan
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Canvas Viewport */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-300 bg-[#0f0619] shadow-inner select-none flex items-center justify-center">
              {imageError ? (
                <div className="p-8 text-center text-rose-300 space-y-2">
                  <p className="font-bold text-xs">{imageError}</p>
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseUp}
                  onWheel={handleWheel}
                  className="w-full h-64 sm:h-80 object-contain cursor-grab active:cursor-grabbing touch-none"
                  title="Klik dan seret untuk memindahkan posisi gambar, putar roda mouse untuk zoom"
                />
              )}

              {/* Pan & Hint Overlay Pill */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center gap-1.5 pointer-events-none">
                <Move className="w-3 h-3 text-[#F5D32F]" />
                <span>Seret foto untuk mengatur posisi</span>
              </div>

              {/* Rotation Indicator */}
              {rotation > 0 && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-bold flex items-center gap-1 pointer-events-none">
                  <RotateCw className="w-3 h-3 text-[#F5D32F]" />
                  <span>{rotation}°</span>
                </div>
              )}
            </div>

            {/* Transform Controls Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-neutral-700 whitespace-nowrap">
                  Zoom:
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onPress={handleZoomOut}
                  isDisabled={zoom <= 1.0}
                  className="w-8 h-8 min-w-8 p-0 rounded-xl border-neutral-300 bg-white"
                  aria-label="Perkecil"
                >
                  <ZoomOut className="w-4 h-4 text-neutral-700" />
                </Button>

                {/* Range Slider */}
                <input
                  type="range"
                  min="1.0"
                  max="3.0"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-32 sm:w-40 accent-[#6B18A8] cursor-pointer"
                />

                <Button
                  size="sm"
                  variant="outline"
                  onPress={handleZoomIn}
                  isDisabled={zoom >= 3.0}
                  className="w-8 h-8 min-w-8 p-0 rounded-xl border-neutral-300 bg-white"
                  aria-label="Perbesar"
                >
                  <ZoomIn className="w-4 h-4 text-neutral-700" />
                </Button>

                <span className="text-xs font-mono font-bold text-[#6B18A8] w-12 text-right">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

              {/* Action Buttons: Rotate & Reset */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onPress={handleRotate}
                  className="text-xs font-bold rounded-xl border-neutral-300 bg-white hover:bg-neutral-50 px-3 py-1.5 flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#6B18A8]" />
                  <span>Putar 90°</span>
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onPress={handleReset}
                  className="text-xs font-bold rounded-xl border-neutral-300 bg-white hover:bg-neutral-50 px-3 py-1.5 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Reset</span>
                </Button>
              </div>
            </div>
          </Modal.Body>

          {/* Modal Footer */}
          <Modal.Footer className="p-4 sm:p-5 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="text-[11px] text-neutral-500 hidden sm:block">
              Format ekspor otomatis: <strong>JPEG 92% (High Resolution)</strong>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Button
                variant="secondary"
                onPress={onClose}
                className="text-xs font-bold rounded-xl px-4 py-2 cursor-pointer"
              >
                Batal
              </Button>
              <Button
                variant="primary"
                onPress={handleSaveCrop}
                isDisabled={!loadedImage || !!imageError}
                className="bg-[#6B18A8] hover:bg-[#58138c] text-white text-xs font-bold rounded-xl px-5 py-2 flex items-center gap-1.5 shadow-md shadow-purple-950/25 cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#F5D32F]" />
                <span>Terapkan Hasil Crop ({targetDim.width}×{targetDim.height})</span>
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};

export default ImageCropperModal;
