export interface GalleryStatItem {
  id: string;
  value: string;
  labelId: string;
  labelEn: string;
  icon: 'award' | 'building' | 'users' | 'clock';
}

export interface GalleryStatsConfig {
  items: GalleryStatItem[];
  lastUpdated: string;
}

export const DEFAULT_GALLERY_STATS: GalleryStatsConfig = {
  items: [
    {
      id: 'stat_cert',
      value: '1.718+',
      labelId: 'Sertifikat Halal Terbit',
      labelEn: 'Halal Certificates Issued',
      icon: 'award',
    },
    {
      id: 'stat_sppg',
      value: '531+',
      labelId: 'Sertifikasi Fasilitas SPPG',
      labelEn: 'SPPG Halal Facilities Certified',
      icon: 'building',
    },
    {
      id: 'stat_duration',
      value: '2 Minggu',
      labelId: 'Estimasi Durasi Layanan',
      labelEn: 'Estimated Service Duration',
      icon: 'clock',
    },
    {
      id: 'stat_fatwa',
      value: '2x / Bulan',
      labelId: 'Sidang Fatwa Rutin Terjadwal',
      labelEn: 'Scheduled Monthly Fatwa Hearings',
      icon: 'users',
    },
  ],
  lastUpdated: new Date().toISOString(),
};

const STORAGE_KEY = 'lph_gallery_stats';

export const getGalleryStats = (): GalleryStatsConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GALLERY_STATS;
    const parsed = JSON.parse(raw);
    if (!parsed.items || !Array.isArray(parsed.items)) return DEFAULT_GALLERY_STATS;
    return parsed;
  } catch {
    return DEFAULT_GALLERY_STATS;
  }
};

export const saveGalleryStats = (config: GalleryStatsConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('lph-gallery-stats-updated'));
  } catch (err) {
    console.error('Failed to save gallery stats:', err);
  }
};

export const resetGalleryStats = (): GalleryStatsConfig => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('lph-gallery-stats-updated'));
  } catch (err) {
    console.error('Failed to reset gallery stats:', err);
  }
  return DEFAULT_GALLERY_STATS;
};
