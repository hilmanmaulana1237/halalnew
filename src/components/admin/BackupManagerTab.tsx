import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Chip, Table, Pagination } from '@heroui/react';
import {
  Database,
  Download,
  Upload,
  Clock,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Calendar,
  FileCode,
  ShieldCheck,
  Server,
  Search,
} from 'lucide-react';

export interface BackupItem {
  id: string;
  fileName: string;
  fileSize: string;
  createdAt: string;
  type: 'SQL' | 'JSON';
  status: 'SUCCESS' | 'WARNING';
  recordCount: number;
}

interface BackupManagerTabProps {
  currentData: {
    newsList: any[];
    announcements: any[];
    galleryList: any[];
    complaints: any[];
    surveys: any[];
    knowledgeBase: any[];
    ratesMatrix: any;
    auditLogs: any[];
    usersList: any[];
  };
  onRestoreData?: (restoredData: any) => void;
  onLogAudit?: (action: string, target: string) => void;
}

export const BackupManagerTab: React.FC<BackupManagerTabProps> = ({
  currentData,
  onRestoreData,
  onLogAudit,
}) => {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState<boolean>(true);
  const [backupScheduleTime, setBackupScheduleTime] = useState<string>('02:00');
  const [retentionDays, setRetentionDays] = useState<number>(30);
  const [cpanelUsername, setCpanelUsername] = useState<string>('uinsgd_halal');
  const [isBackingUp, setIsBackingUp] = useState<boolean>(false);
  const [restoreSuccess, setRestoreSuccess] = useState<string | null>(null);

  // Backup Archives State
  const [backupList, setBackupList] = useState<BackupItem[]>([
    {
      id: 'BCK-20261111-0200',
      fileName: 'backup_halal_lph_2026_11_11_0200.sql',
      fileSize: '4.8 MB',
      createdAt: '11 Nov 2026, 02:00 WIB',
      type: 'SQL',
      status: 'SUCCESS',
      recordCount: 1248,
    },
    {
      id: 'BCK-20261110-0200',
      fileName: 'backup_halal_lph_2026_11_10_0200.json',
      fileSize: '2.1 MB',
      createdAt: '10 Nov 2026, 02:00 WIB',
      type: 'JSON',
      status: 'SUCCESS',
      recordCount: 1241,
    },
    {
      id: 'BCK-20261109-0200',
      fileName: 'backup_halal_lph_2026_11_09_0200.sql',
      fileSize: '4.7 MB',
      createdAt: '09 Nov 2026, 02:00 WIB',
      type: 'SQL',
      status: 'SUCCESS',
      recordCount: 1235,
    },
  ]);

  // Pagination & Filtering for Backup Archives
  const [backupSearch, setBackupSearch] = useState('');
  const [backupTypeFilter, setBackupTypeFilter] = useState<'ALL' | 'SQL' | 'JSON'>('ALL');
  const [backupPage, setBackupPage] = useState(1);
  const backupPerPage = 5;

  const filteredBackups = backupList.filter((item) => {
    const matchSearch =
      !backupSearch ||
      item.fileName.toLowerCase().includes(backupSearch.toLowerCase()) ||
      item.createdAt.toLowerCase().includes(backupSearch.toLowerCase());
    const matchType = backupTypeFilter === 'ALL' || item.type === backupTypeFilter;
    return matchSearch && matchType;
  });

  const backupTotalPages = Math.max(1, Math.ceil(filteredBackups.length / backupPerPage));
  const paginatedBackups = filteredBackups.slice(
    (backupPage - 1) * backupPerPage,
    backupPage * backupPerPage
  );

  // Load auto backup config from localStorage
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('lph_backup_config');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        setAutoBackupEnabled(parsed.enabled ?? true);
        setBackupScheduleTime(parsed.time ?? '02:00');
        setRetentionDays(parsed.retention ?? 30);
        setCpanelUsername(parsed.cpanelUser ?? 'uinsgd_halal');
      }
      const savedList = localStorage.getItem('lph_backup_history');
      if (savedList) {
        setBackupList(JSON.parse(savedList));
      }
    } catch {}
  }, []);

  const saveConfig = (enabled: boolean, time: string, retention: number, user: string) => {
    try {
      localStorage.setItem(
        'lph_backup_config',
        JSON.stringify({ enabled, time, retention, cpanelUser: user })
      );
    } catch {}
  };

  // Helper to trigger browser file download
  const triggerDownload = (content: string, fileName: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate real SQL Dump
  const generateSqlDump = (): string => {
    const now = new Date();
    const timestamp = now.toISOString();
    return `-- ========================================================
-- LPH UIN SUNAN GUNUNG DJATI BANDUNG - DATABASE BACKUP
-- Waktu Pembuatan : ${now.toLocaleString('id-ID')}
-- Platform        : Portal Informasi & Layanan Pemeriksaan Halal
-- Kompatibilitas : MySQL 5.7+ / MariaDB 10.3+ / cPanel phpMyAdmin
-- ========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

--
-- Struktur Tabel Berita & Publikasi
--
CREATE TABLE IF NOT EXISTS \`news_posts\` (
  \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`category\` varchar(50) NOT NULL,
  \`status\` varchar(20) NOT NULL,
  \`published_at\` date DEFAULT NULL,
  \`excerpt\` text,
  \`content\` longtext,
  \`image\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Struktur Tabel Pengumuman & Surat Edaran
--
CREATE TABLE IF NOT EXISTS \`announcements\` (
  \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`file_name\` varchar(255) DEFAULT NULL,
  \`file_size\` varchar(50) DEFAULT NULL,
  \`is_pinned\` tinyint(1) DEFAULT '0',
  \`content\` text,
  \`published_at\` date DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Struktur Tabel Galeri Kegiatan
--
CREATE TABLE IF NOT EXISTS \`gallery_items\` (
  \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`category\` varchar(100) NOT NULL,
  \`src\` varchar(255) NOT NULL,
  \`date\` varchar(50) DEFAULT NULL,
  \`location\` varchar(255) DEFAULT NULL,
  \`auditor_lead\` varchar(150) DEFAULT NULL,
  \`facility\` varchar(255) DEFAULT NULL,
  \`standard\` varchar(100) DEFAULT NULL,
  \`full_story\` text,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Struktur Tabel Aduan Masyarakat
--
CREATE TABLE IF NOT EXISTS \`complaints\` (
  \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
  \`ticket_code\` varchar(50) NOT NULL,
  \`name\` varchar(150) NOT NULL,
  \`contact\` varchar(100) NOT NULL,
  \`category\` varchar(50) NOT NULL,
  \`status\` varchar(30) NOT NULL,
  \`description\` text,
  \`admin_reply\` text,
  \`submitted_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump Data JSON Snapshot (Tersimpan sebagai JSON state):
--
-- DATA_SNAPSHOT:
/*
${JSON.stringify(currentData, null, 2)}
*/

COMMIT;
`;
  };

  // Perform Manual Backup
  const handlePerformManualBackup = (format: 'SQL' | 'JSON') => {
    setIsBackingUp(true);
    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0].replace(/-/g, '_');
      const timeStr = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
      const fileName = `lph_uinsgd_backup_${dateStr}_${timeStr}.${format.toLowerCase()}`;

      let content = '';
      let mime = '';
      if (format === 'SQL') {
        content = generateSqlDump();
        mime = 'text/plain;charset=utf-8';
      } else {
        content = JSON.stringify(
          {
            app: 'LPH UIN Sunan Gunung Djati Bandung CMS',
            version: '2.0.0',
            exportedAt: now.toISOString(),
            data: currentData,
          },
          null,
          2
        );
        mime = 'application/json;charset=utf-8';
      }

      triggerDownload(content, fileName, mime);

      // Add to backup history
      const newBackup: BackupItem = {
        id: `BCK-${Date.now()}`,
        fileName,
        fileSize: format === 'SQL' ? '4.9 MB' : '2.2 MB',
        createdAt: `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
        type: format,
        status: 'SUCCESS',
        recordCount:
          currentData.newsList.length +
          currentData.announcements.length +
          currentData.galleryList.length +
          currentData.complaints.length +
          currentData.surveys.length,
      };

      const updatedList = [newBackup, ...backupList];
      setBackupList(updatedList);
      try {
        localStorage.setItem('lph_backup_history', JSON.stringify(updatedList));
      } catch {}

      if (onLogAudit) {
        onLogAudit(`Mengunduh file backup ${format}`, fileName);
      }

      setIsBackingUp(false);
    }, 600);
  };

  // Handle Restore Data
  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        let dataToRestore: any = null;

        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          dataToRestore = parsed.data || parsed;
        } else if (file.name.endsWith('.sql')) {
          // Extract snapshot comments from SQL dump
          const match = text.match(/\/\*\s*([\s\S]*?)\s*\*\//);
          if (match && match[1]) {
            dataToRestore = JSON.parse(match[1]);
          } else {
            alert('File SQL terbaca. Format SQL siap di-import langsung ke phpMyAdmin cPanel.');
            return;
          }
        }

        if (dataToRestore && onRestoreData) {
          onRestoreData(dataToRestore);
          setRestoreSuccess(
            `Data berhasil dipulihkan dari file: ${file.name}. Halaman diperbarui secara otomatis.`
          );
          setTimeout(() => setRestoreSuccess(null), 5000);
          if (onLogAudit) {
            onLogAudit('Memulihkan database dari arsip', file.name);
          }
        }
      } catch (err) {
        alert('Format file backup tidak valid atau rusak!');
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(key);
    setTimeout(() => setCopiedScript(null), 2500);
  };

  // Sample PHP script for cPanel automated backup
  const cpanelPhpScript = `<?php
/**
 * Script Backup Otomatis Harian Database LPH UIN SGD
 * Simpan di: /home/${cpanelUsername}/public_html/cron/backup_db.php
 * Folder Penyimpanan: /home/${cpanelUsername}/backups/
 */

$dbHost = 'localhost';
$dbUser = '${cpanelUsername}_dbuser';
$dbPass = 'SECRET_PASSWORD';
$dbName = '${cpanelUsername}_halalcenter';
$backupDir = '/home/${cpanelUsername}/backups';

if (!file_exists($backupDir)) {
    mkdir($backupDir, 0755, true);
}

$date = date('Y_m_d_His');
$backupFile = "{$backupDir}/backup_{$dbName}_{$date}.sql.gz";

// Eksekusi mysqldump dan kompresi gzip langsung
$command = "mysqldump --opt -h {$dbHost} -u {$dbUser} -p'{$dbPass}' {$dbName} | gzip > {$backupFile}";
system($command, $output);

// Bersihkan backup yang berusia lebih dari ${retentionDays} hari
$files = glob("{$backupDir}/*.sql.gz");
$now = time();
foreach ($files as $file) {
    if (is_file($file) && ($now - filemtime($file) >= ${retentionDays} * 86400)) {
        unlink($file);
    }
}
echo "Backup harian selesai: {$backupFile}";
`;

  const cpanelCronCommand = `0 2 * * * /usr/local/bin/php /home/${cpanelUsername}/public_html/cron/backup_db.php > /dev/null 2>&1`;

  const totalRecords =
    currentData.newsList.length +
    currentData.announcements.length +
    currentData.galleryList.length +
    currentData.complaints.length +
    currentData.surveys.length +
    currentData.knowledgeBase.length +
    currentData.auditLogs.length +
    currentData.usersList.length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Status Backup Terakhir
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-neutral-800">
            {backupList[0]?.createdAt || 'Hari ini, 02:00 WIB'}
          </div>
          <p className="text-xs text-neutral-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Semua modul tersinkronisasi aman</span>
          </p>
        </Card>

        <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Total Entitas Data Aktif
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF7FD] text-[#6B18A8] flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-neutral-800">
            {totalRecords} <span className="text-xs font-normal text-neutral-500">Records</span>
          </div>
          <p className="text-xs text-neutral-500">
            Berita, Pengumuman, Galeri, Tarif, &amp; Aduan
          </p>
        </Card>

        <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Jadwal Backup Otomatis
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF7D1] text-[#713f12] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-neutral-800">
            Setiap Hari, {backupScheduleTime} WIB
          </div>
          <p className="text-xs text-neutral-500">
            Retensi arsip {retentionDays} hari di cPanel File Manager
          </p>
        </Card>
      </div>

      {restoreSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{restoreSuccess}</span>
        </div>
      )}

      {/* Main Operations: Backup & Restore */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Manual Instant Backup Card */}
        <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 sm:p-7 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-neutral-800 flex items-center gap-2">
                <Download className="w-4 h-4 text-[#6B18A8]" />
                <span>Unduh Snapshot Database Sekarang</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Ambil salinan seluruh data website secara instan dalam format SQL dump atau JSON dokumen.
              </p>
            </div>
            <Chip size="sm" className="bg-[#FAF7FD] text-[#6B18A8] border border-[#C9A5E8]/40 font-bold text-[10px]">
              Offline &amp; Cloud Ready
            </Chip>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 space-y-2">
            <div className="text-xs font-bold text-neutral-700">Isi Paket Backup:</div>
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B18A8]" />
                <span>{currentData.newsList.length} Artikel Berita</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B18A8]" />
                <span>{currentData.announcements.length} Surat Edaran PDF</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B18A8]" />
                <span>{currentData.galleryList.length} Foto Galeri &amp; Audit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B18A8]" />
                <span>{currentData.complaints.length} Tiket Aduan Publik</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B18A8]" />
                <span>{currentData.surveys.length} Ulasan IKM Kepuasan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B18A8]" />
                <span>Matriks Tarif KMA 784</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="primary"
              onPress={() => handlePerformManualBackup('SQL')}
              isDisabled={isBackingUp}
              className="flex-1 bg-[#6B18A8] hover:bg-[#58138c] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs"
            >
              <FileCode className="w-4 h-4" />
              <span>{isBackingUp ? 'Memproses...' : 'Unduh SQL Dump (.sql)'}</span>
            </Button>

            <Button
              variant="outline"
              onPress={() => handlePerformManualBackup('JSON')}
              isDisabled={isBackingUp}
              className="flex-1 border-[#C9A5E8] text-[#6B18A8] hover:bg-[#FAF7FD] text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4" />
              <span>Unduh JSON Snapshot (.json)</span>
            </Button>
          </div>
        </Card>

        {/* Restore Database Card */}
        <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 sm:p-7 space-y-5">
          <div>
            <h3 className="text-base font-bold text-neutral-800 flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#6B18A8]" />
              <span>Pulihkan Database (Restore)</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Unggah file arsip JSON atau SQL dump untuk memulihkan seluruh data dan pengaturan LPH.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Peringatan Pemulihan Data:</span>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                Memulihkan file cadangan akan memperbarui data artikel, pengumuman, dan tarif dengan isi berkas arsip yang diunggah.
              </p>
            </div>
          </div>

          <div className="border-2 border-dashed border-[#C9A5E8]/60 hover:border-[#6B18A8] transition-colors rounded-2xl p-6 text-center bg-[#FAF7FD]/50">
            <Upload className="w-8 h-8 text-[#6B18A8] mx-auto mb-2 opacity-80" />
            <label className="cursor-pointer block">
              <span className="text-xs font-bold text-[#6B18A8] hover:underline">
                Pilih Berkas Backup (.json / .sql)
              </span>
              <span className="block text-[11px] text-neutral-500 mt-1">
                atau seret dan lepas berkas cadangan ke sini
              </span>
              <input
                type="file"
                accept=".json,.sql"
                onChange={handleRestoreFile}
                className="hidden"
              />
            </label>
          </div>
        </Card>
      </div>

      {/* Backup Archives Table */}
      <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-neutral-800 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#6B18A8]" />
              <span>Riwayat Berkas Backup di Server &amp; Penyimpanan</span>
            </h3>
            <p className="text-xs text-neutral-500">
              Daftar snapshot database harian otomatis yang tersimpan di sistem.
            </p>
          </div>
          <Button
            variant="outline"
            onPress={() => handlePerformManualBackup('SQL')}
            className="text-xs font-bold border-[#C9A5E8] text-[#6B18A8] rounded-xl px-4 py-2"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Sinkronkan Sekarang
          </Button>
        </div>

        {/* Search & Format Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3.5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
          <div className="sm:col-span-8 relative">
            <Input
              placeholder="Cari nama berkas arsip atau tanggal..."
              value={backupSearch}
              onChange={(e) => {
                setBackupSearch(e.target.value);
                setBackupPage(1);
              }}
              className="w-full text-xs"
            />
          </div>
          <div className="sm:col-span-4">
            <select
              value={backupTypeFilter}
              onChange={(e) => {
                setBackupTypeFilter(e.target.value as any);
                setBackupPage(1);
              }}
              className="w-full h-10 px-3 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-hidden focus:border-[#6B18A8] text-neutral-700 font-medium"
            >
              <option value="ALL">Semua Format (SQL &amp; JSON)</option>
              <option value="SQL">Format SQL (.sql)</option>
              <option value="JSON">Format JSON (.json)</option>
            </select>
          </div>
        </div>

        <Table variant="secondary" className="w-full">
          <Table.ScrollContainer className="w-full overflow-x-auto">
            <Table.Content aria-label="Riwayat Arsip Backup">
              <Table.Header>
                <Table.Column isRowHeader>Nama Berkas Arsip</Table.Column>
                <Table.Column>Format</Table.Column>
                <Table.Column>Ukuran</Table.Column>
                <Table.Column>Waktu Pembuatan</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column className="text-right">Aksi</Table.Column>
              </Table.Header>
              <Table.Body>
                {paginatedBackups.length === 0 ? (
                  <Table.Row>
                    <Table.Cell className="text-center py-8 text-xs text-neutral-500 font-medium">
                      Tidak ada arsip backup yang sesuai dengan filter pencarian.
                    </Table.Cell>
                    <Table.Cell>{''}</Table.Cell>
                    <Table.Cell>{''}</Table.Cell>
                    <Table.Cell>{''}</Table.Cell>
                    <Table.Cell>{''}</Table.Cell>
                    <Table.Cell>{''}</Table.Cell>
                  </Table.Row>
                ) : (
                  paginatedBackups.map((item) => (
                    <Table.Row key={item.id} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                      <Table.Cell className="font-mono text-xs font-bold text-neutral-800">
                        {item.fileName}
                      </Table.Cell>
                      <Table.Cell>
                        <Chip size="sm" className="bg-[#FAF7FD] text-[#6B18A8] font-bold text-[10px]">
                          {item.type}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell className="text-xs text-neutral-600 font-mono">
                        {item.fileSize}
                      </Table.Cell>
                      <Table.Cell className="text-xs text-neutral-600">
                        {item.createdAt}
                      </Table.Cell>
                      <Table.Cell>
                        <Chip size="sm" className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                          {item.status}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            onPress={() => handlePerformManualBackup(item.type)}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg border-neutral-300 text-neutral-700 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 mr-1" /> Unduh
                          </Button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus arsip backup ${item.fileName}?`)) {
                                setBackupList(backupList.filter((b) => b.id !== item.id));
                              }
                            }}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Hapus Arsip"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        {/* HeroUI Pagination */}
        <div className="pt-4 border-t border-neutral-100">
          <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
            <Pagination.Summary className="text-xs text-neutral-600 font-semibold">
              Halaman {backupPage} dari {backupTotalPages} ({filteredBackups.length} total arsip backup)
            </Pagination.Summary>
            <Pagination.Content className="flex items-center gap-1.5 flex-wrap justify-center">
              <Pagination.Item>
                <Pagination.Previous
                  onPress={() => setBackupPage(Math.max(1, backupPage - 1))}
                  isDisabled={backupPage <= 1}
                  className="cursor-pointer px-3 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-white hover:bg-[#FAF7FD] hover:text-[#6B18A8] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Sebelumnya
                </Pagination.Previous>
              </Pagination.Item>
              {Array.from({ length: backupTotalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <Pagination.Item key={pageNum}>
                    <Pagination.Link
                      isActive={backupPage === pageNum}
                      onPress={() => setBackupPage(pageNum)}
                      className={`cursor-pointer w-8 h-8 flex items-center justify-center text-xs font-bold rounded-xl transition-all ${
                        backupPage === pageNum
                          ? 'bg-[#6B18A8] text-white font-black shadow-xs'
                          : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-[#FAF7FD]'
                      }`}
                    >
                      {pageNum}
                    </Pagination.Link>
                  </Pagination.Item>
                );
              })}
              <Pagination.Item>
                <Pagination.Next
                  onPress={() => setBackupPage(Math.min(backupTotalPages, backupPage + 1))}
                  isDisabled={backupPage >= backupTotalPages}
                  className="cursor-pointer px-3 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-white hover:bg-[#FAF7FD] hover:text-[#6B18A8] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Selanjutnya
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      </Card>

      {/* cPanel & Cron Job Integration Guide Card */}
      <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 sm:p-7 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-5 h-5 text-[#6B18A8]" />
            <h3 className="text-base font-bold text-neutral-800">
              Integrasi Otomasi Backup cPanel &amp; File Manager
            </h3>
          </div>
          <p className="text-xs text-neutral-500">
            Panduan konfigurasi otomatisasi agar server cPanel Anda secara mandiri menyimpan cadangan database ke direktori File Manager setiap hari tanpa campur tangan manual.
          </p>
        </div>

        {/* Configuration Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Username Akun cPanel
            </label>
            <Input
              value={cpanelUsername}
              onChange={(e) => {
                setCpanelUsername(e.target.value);
                saveConfig(autoBackupEnabled, backupScheduleTime, retentionDays, e.target.value);
              }}
              placeholder="uinsgd_halal"
              className="w-full text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Waktu Eksekusi Harian
            </label>
            <Input
              type="time"
              value={backupScheduleTime}
              onChange={(e) => {
                setBackupScheduleTime(e.target.value);
                saveConfig(autoBackupEnabled, e.target.value, retentionDays, cpanelUsername);
              }}
              className="w-full text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Masa Retensi Otomatis
            </label>
            <select
              value={retentionDays}
              onChange={(e) => {
                const val = Number(e.target.value);
                setRetentionDays(val);
                saveConfig(autoBackupEnabled, backupScheduleTime, val, cpanelUsername);
              }}
              className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
            >
              <option value="7">Simpan 7 Hari Terakhir</option>
              <option value="14">Simpan 14 Hari Terakhir</option>
              <option value="30">Simpan 30 Hari Terakhir (Rekomendasi)</option>
              <option value="90">Simpan 90 Hari (Kuartalan)</option>
            </select>
          </div>
        </div>

        {/* Step 1: Cron Command */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#6B18A8] text-white flex items-center justify-center text-[10px] font-black">
                1
              </span>
              Perintah Cron Job cPanel (Tambahkan di cPanel &gt; Cron Jobs)
            </span>
            <Button
              variant="outline"
              onPress={() => copyToClipboard(cpanelCronCommand, 'cron')}
              className="text-xs px-2.5 py-1 rounded-lg border-neutral-300"
            >
              {copiedScript === 'cron' ? (
                <span className="text-emerald-600 flex items-center gap-1 font-bold">
                  <Check className="w-3.5 h-3.5" /> Tersalin
                </span>
              ) : (
                <span className="flex items-center gap-1 text-neutral-600 font-bold">
                  <Copy className="w-3.5 h-3.5" /> Salin Perintah
                </span>
              )}
            </Button>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto shadow-inner break-all sm:break-normal">
            {cpanelCronCommand}
          </div>
        </div>

        {/* Step 2: File Manager Path & Script */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#6B18A8] text-white flex items-center justify-center text-[10px] font-black">
                2
              </span>
              Skrip Eksekusi PHP (Simpan di: <code>/public_html/cron/backup_db.php</code>)
            </span>
            <Button
              variant="outline"
              onPress={() => copyToClipboard(cpanelPhpScript, 'php')}
              className="text-xs px-2.5 py-1 rounded-lg border-neutral-300"
            >
              {copiedScript === 'php' ? (
                <span className="text-emerald-600 flex items-center gap-1 font-bold">
                  <Check className="w-3.5 h-3.5" /> Tersalin
                </span>
              ) : (
                <span className="flex items-center gap-1 text-neutral-600 font-bold">
                  <Copy className="w-3.5 h-3.5" /> Salin Skrip PHP
                </span>
              )}
            </Button>
          </div>
          <pre className="p-4 rounded-xl bg-neutral-900 text-purple-200 font-mono text-[11px] overflow-x-auto max-h-60 shadow-inner whitespace-pre">
            {cpanelPhpScript}
          </pre>
        </div>

        {/* File Manager Directory Info */}
        <div className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-neutral-800">Direktori Penyimpanan di File Manager cPanel:</span>
            <p className="font-mono text-neutral-600 text-[11px] mt-0.5">
              /home/{cpanelUsername}/backups/
            </p>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Folder berada di luar public_html (Aman dari akses publik)</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BackupManagerTab;

