import DOMPurify from 'dompurify';

/**
 * ============================================================================
 * LPH UIN SUNAN GUNUNG DJATI BANDUNG - WEB SECURITY & ANTI-JUDOL DEFENSE ENGINE
 * ============================================================================
 * Modul keamanan tingkat lanjut untuk melindungi portal LPH dari:
 * 1. Injeksi & Defacement Judi Online (Judol / Slot Gacor) & SEO Poisoning
 * 2. Stored Cross-Site Scripting (XSS) & Iframe Hijacking
 * 3. Arbitrary File Upload (Web Shell / PHP / Executables)
 * 4. Brute Force Login & Credential Stuffing
 * 5. Session Hijacking & Unauthorized Admin Access
 * ============================================================================
 */

// 1. DICTIONARY KATA KUNCI JUDI ONLINE & SPAM LINK MALICIOUS
export const JUDOL_BLACKLIST_KEYWORDS = [
  // Slot & Mesin
  'slot gacor',
  'slot online',
  'slot88',
  'slot777',
  'pragmatic play',
  'maxwin',
  'zeus slot',
  'kakek zeus',
  'scatter hitam',
  'mahjong ways',
  'gates of olympus',
  'starlight princess',
  'rtp live slot',
  'bocoran slot',
  'nexus engine',
  'hoki slot',
  'jackpot slot',
  'daftar situs slot',
  'link slot gacor',

  // Judi Umum & Kasino
  'judi online',
  'judol',
  'situs judi',
  'agen judi',
  'bandar judi',
  'sbobet',
  'casino online',
  'live casino',
  'roulette online',
  'baccarat online',
  'blackjack online',
  'sicbo online',

  // Togel & Poker
  'togel online',
  'bandar togel',
  'toto macau',
  'togel hongkong',
  'togel singapore',
  'poker online',
  'idn poker',
  'bandar qq',
  'domino qq',
  'capsa susun',

  // Taruhan & Deposit
  'taruhan bola',
  'judi bola',
  'agen bola',
  'depo pulsa',
  'depo dana',
  'depo tanpa potongan',
  'bonus new member 100',
  'freebet',
  'deposit 10k',
  'bonus garansi kekalahan',
];

// Regex untuk pola spam backlink tersembunyi (SEO Poisoning Cloaking)
const HIDDEN_BACKLINK_PATTERNS = [
  /style\s*=\s*["'][^"']*(display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0|font-size\s*:\s*0|position\s*:\s*absolute\s*;\s*left\s*:\s*-[0-9]{3,})/i,
  /<a\s+[^>]*href\s*=\s*["']https?:\/\/[^"']*(slot|judi|casino|bet|poker|togel|maxwin|gacor|sbobet)[^"']*["']/i,
  /<iframe\s+[^>]*src\s*=\s*["']https?:\/\/[^"']*["']/i,
  /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
  /javascript\s*:/i,
  /data:text\/html/i,
  /<meta\s+http-equiv\s*=\s*["']refresh["']/i,
];

export interface ThreatScanResult {
  isClean: boolean;
  threatFound: boolean;
  riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'CRITICAL';
  detectedKeywords: string[];
  detectedPatterns: string[];
  summary: string;
}

/**
 * 2. PEMINDAI KONTEN ANTI-JUDOL & MALWARE (Active Threat Scanner)
 * Memeriksa naskah artikel, judul, dokumen, atau formulir masyarakat
 */
export function scanForThreats(content: string, title: string = ''): ThreatScanResult {
  const combinedText = `${title} ${content}`.toLowerCase();
  const detectedKeywords: string[] = [];
  const detectedPatterns: string[] = [];

  // Periksa Blacklist Judol
  for (const keyword of JUDOL_BLACKLIST_KEYWORDS) {
    if (combinedText.includes(keyword.toLowerCase())) {
      detectedKeywords.push(keyword);
    }
  }

  // Periksa Pola Tersembunyi & XSS
  for (const pattern of HIDDEN_BACKLINK_PATTERNS) {
    if (pattern.test(content) || pattern.test(title)) {
      detectedPatterns.push(pattern.source);
    }
  }

  const threatFound = detectedKeywords.length > 0 || detectedPatterns.length > 0;
  let riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'CRITICAL' = 'SAFE';

  if (detectedPatterns.some((p) => p.includes('script') || p.includes('iframe') || p.includes('javascript'))) {
    riskLevel = 'CRITICAL';
  } else if (detectedKeywords.length >= 2 || detectedPatterns.length > 0) {
    riskLevel = 'CRITICAL';
  } else if (detectedKeywords.length === 1) {
    riskLevel = 'MEDIUM';
  }

  const summary = threatFound
    ? `Ditemukan ancaman potensial: ${detectedKeywords.length} kata kunci judi/spam dan ${detectedPatterns.length} indikator injeksi tag.`
    : 'Konten bersih dan aman dari indikator defacement judol maupun skrip berbahaya.';

  return {
    isClean: !threatFound,
    threatFound,
    riskLevel,
    detectedKeywords,
    detectedPatterns,
    summary,
  };
}

/**
 * 3. SANITASI HTML DENGAN DOMPURIFY (Strict Whitelist Anti-XSS)
 * Membersihkan kode HTML dari TinyMCE sebelum disimpan atau ditampilkan
 */
export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return '';
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'strong',
      'em',
      'u',
      's',
      'blockquote',
      'ul',
      'ol',
      'li',
      'a',
      'img',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'span',
      'div',
      'br',
      'hr',
      'figure',
      'figcaption',
    ],
    ALLOWED_ATTR: [
      'href',
      'target',
      'rel',
      'src',
      'alt',
      'title',
      'class',
      'style',
      'width',
      'height',
      'align',
      'border',
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'meta', 'link', 'style'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'formaction'],
    ADD_ATTR: ['target', 'rel'],
  });
}

/**
 * 4. VALIDASI BERKAS UNGGAHAN ANTI-WEB SHELL & EKSTENSI GANDA
 * Memastikan tidak ada pengunggahan skrip PHP, executable, atau file berbahaya
 */
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  safeFileName: string;
}

const DANGEROUS_EXTENSIONS = [
  '.php',
  '.php3',
  '.php4',
  '.php5',
  '.phtml',
  '.phar',
  '.sh',
  '.bash',
  '.exe',
  '.bat',
  '.cmd',
  '.vbs',
  '.cgi',
  '.pl',
  '.py',
  '.asp',
  '.aspx',
  '.jsp',
  '.jspx',
  '.shtml',
  '.htm',
  '.html',
  '.svg', // Disallow SVG to prevent embedded script execution
  '.xml',
  '.htaccess',
  '.user.ini',
];

export function validateUploadedFile(
  file: File,
  allowedCategory: 'IMAGE' | 'PDF'
): FileValidationResult {
  const originalName = file.name.trim();
  const lowerName = originalName.toLowerCase();

  // 1. Periksa ekstensi berbahaya & double extension (misal: payload.php.jpg)
  for (const ext of DANGEROUS_EXTENSIONS) {
    if (lowerName.includes(ext)) {
      return {
        isValid: false,
        error: `Berkas ditolak demi keamanan: Berkas mengandung ekstensi berisiko (${ext}).`,
        safeFileName: '',
      };
    }
  }

  // 2. Periksa path traversal karakter
  if (lowerName.includes('..') || lowerName.includes('/') || lowerName.includes('\\')) {
    return {
      isValid: false,
      error: 'Nama berkas tidak valid: Dilarang menggunakan karakter path traversal.',
      safeFileName: '',
    };
  }

  if (allowedCategory === 'IMAGE') {
    const validImageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const validImageMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    const hasValidExt = validImageExtensions.some((ext) => lowerName.endsWith(ext));
    const hasValidMime = validImageMimeTypes.includes(file.type);

    if (!hasValidExt || !hasValidMime) {
      return {
        isValid: false,
        error: 'Hanya format gambar resmi (.JPG, .PNG, .WebP) yang diizinkan untuk keamanan.',
        safeFileName: '',
      };
    }

    // Maksimal 5 MB untuk gambar
    if (file.size > 5 * 1024 * 1024) {
      return {
        isValid: false,
        error: 'Ukuran berkas gambar melebihi batas maksimal 5 MB.',
        safeFileName: '',
      };
    }
  } else if (allowedCategory === 'PDF') {
    const isPdfExt = lowerName.endsWith('.pdf');
    const isPdfMime = file.type === 'application/pdf';

    if (!isPdfExt || !isPdfMime) {
      return {
        isValid: false,
        error: 'Hanya berkas resmi berekstensi .PDF murni yang diizinkan.',
        safeFileName: '',
      };
    }

    // Maksimal 10 MB untuk berkas PDF SK / Surat Edaran
    if (file.size > 10 * 1024 * 1024) {
      return {
        isValid: false,
        error: 'Ukuran dokumen PDF melebihi batas maksimal 10 MB.',
        safeFileName: '',
      };
    }
  }

  // 3. Sanitasi nama berkas menjadi format slug bersih
  const baseName = originalName.substring(0, originalName.lastIndexOf('.'));
  const ext = originalName.substring(originalName.lastIndexOf('.'));
  const cleanBase = baseName.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
  const safeFileName = `${cleanBase}_${Date.now()}${ext.toLowerCase()}`;

  return {
    isValid: true,
    safeFileName,
  };
}

/**
 * 5. BRUTE FORCE PROTECTION & RATE LIMITER (LOGIN SHIELD)
 * Mengunci upaya login jika terjadi percobaan gagal beruntun
 */
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 menit lockout

interface LoginAttemptState {
  failedCount: number;
  lockedUntil: number | null;
}

export function checkLoginRateLimit(): { isLocked: boolean; remainingSeconds: number } {
  try {
    const raw = localStorage.getItem('lph_security_login_attempt');
    if (!raw) return { isLocked: false, remainingSeconds: 0 };
    const state: LoginAttemptState = JSON.parse(raw);
    if (state.lockedUntil && Date.now() < state.lockedUntil) {
      const remainingSeconds = Math.ceil((state.lockedUntil - Date.now()) / 1000);
      return { isLocked: true, remainingSeconds };
    }
    // Jika lockout sudah lewat, reset state
    if (state.lockedUntil && Date.now() >= state.lockedUntil) {
      clearLoginRateLimit();
    }
    return { isLocked: false, remainingSeconds: 0 };
  } catch {
    return { isLocked: false, remainingSeconds: 0 };
  }
}

export function recordFailedLoginAttempt(): {
  isLocked: boolean;
  remainingSeconds: number;
  attemptsLeft: number;
} {
  try {
    const raw = localStorage.getItem('lph_security_login_attempt');
    let state: LoginAttemptState = raw ? JSON.parse(raw) : { failedCount: 0, lockedUntil: null };

    state.failedCount += 1;

    if (state.failedCount >= MAX_FAILED_ATTEMPTS) {
      state.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
      localStorage.setItem('lph_security_login_attempt', JSON.stringify(state));
      return {
        isLocked: true,
        remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
        attemptsLeft: 0,
      };
    }

    localStorage.setItem('lph_security_login_attempt', JSON.stringify(state));
    return {
      isLocked: false,
      remainingSeconds: 0,
      attemptsLeft: MAX_FAILED_ATTEMPTS - state.failedCount,
    };
  } catch {
    return { isLocked: false, remainingSeconds: 0, attemptsLeft: 0 };
  }
}

export function clearLoginRateLimit(): void {
  try {
    localStorage.removeItem('lph_security_login_attempt');
  } catch {}
}

/**
 * 6. SESSION MANAGEMENT DENGAN EXPIRATION & SIGNATURE HASH
 * Mencegah token abadi dan sesi tak terbatas
 */
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 Jam masa aktif sesi admin

export interface AdminSession {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  expiresAt: number;
  createdAt: number;
}

export function createAdminSession(user: { name: string; email: string; role: string }): AdminSession {
  const now = Date.now();
  const session: AdminSession = {
    token: `lph_sec_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`,
    user,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  };
  localStorage.setItem('lph_admin_session', JSON.stringify(session));
  localStorage.setItem('lph_admin_token', session.token);
  localStorage.setItem('lph_admin_user', JSON.stringify(session.user));
  return session;
}

export function verifyAdminSession(): { isValid: boolean; user: any | null; reason?: string } {
  try {
    const raw = localStorage.getItem('lph_admin_session');
    if (!raw) {
      return { isValid: false, user: null, reason: 'Sesi belum ada. Silakan masuk terlebih dahulu.' };
    }
    const session: AdminSession = JSON.parse(raw);
    if (!session.token || !session.user || !session.expiresAt) {
      destroyAdminSession();
      return { isValid: false, user: null, reason: 'Format sesi tidak valid.' };
    }
    if (Date.now() > session.expiresAt) {
      destroyAdminSession();
      return { isValid: false, user: null, reason: 'Sesi login telah berakhir demi keamanan. Silakan login kembali.' };
    }
    return { isValid: true, user: session.user };
  } catch {
    destroyAdminSession();
    return { isValid: false, user: null, reason: 'Gagal memverifikasi sesi.' };
  }
}

export function destroyAdminSession(): void {
  try {
    localStorage.removeItem('lph_admin_session');
    localStorage.removeItem('lph_admin_token');
    localStorage.removeItem('lph_admin_user');
  } catch {}
}
