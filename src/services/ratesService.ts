export interface HalalRateConfig {
  id: string;
  category: string;
  label: string;
  description: string;
  bpjphPrice: number;
  lphPrice: number;
  regulation: string;
  isActive: boolean;
}

export interface FlyerRatesConfig {
  bandung: {
    mikroKecil: number;
    menengahBesar: number;
  };
  jabar: {
    mikroKecil: {
      p0_50: number;
      p50_100: number;
      p100_200: number;
      pOver200: number;
    };
    menengah: number;
    besar: number;
  };
  international: {
    minPrice: number;
    contactWa: string;
  };
  updatedAt: string;
}

export const DEFAULT_FLYER_RATES: FlyerRatesConfig = {
  bandung: {
    mikroKecil: 1820000,
    menengahBesar: 17000000,
  },
  jabar: {
    mikroKecil: {
      p0_50: 3300000,
      p50_100: 3900000,
      p100_200: 4400000,
      pOver200: 4900000,
    },
    menengah: 21000000,
    besar: 30000000,
  },
  international: {
    minPrice: 60000000,
    contactWa: '6282126493700',
  },
  updatedAt: new Date().toISOString(),
};

const FLYER_STORAGE_KEY = 'lph_flyer_rates_config';

export const getFlyerRates = (): FlyerRatesConfig => {
  try {
    const raw = localStorage.getItem(FLYER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_FLYER_RATES,
        ...parsed,
        bandung: { ...DEFAULT_FLYER_RATES.bandung, ...(parsed.bandung || {}) },
        jabar: {
          ...DEFAULT_FLYER_RATES.jabar,
          ...(parsed.jabar || {}),
          mikroKecil: {
            ...DEFAULT_FLYER_RATES.jabar.mikroKecil,
            ...(parsed.jabar?.mikroKecil || {}),
          },
        },
        international: {
          ...DEFAULT_FLYER_RATES.international,
          ...(parsed.international || {}),
        },
      };
    }
  } catch (e) {
    console.error('Failed to parse stored flyer rates:', e);
  }
  return DEFAULT_FLYER_RATES;
};

export const saveFlyerRates = (rates: FlyerRatesConfig): void => {
  try {
    rates.updatedAt = new Date().toISOString();
    localStorage.setItem(FLYER_STORAGE_KEY, JSON.stringify(rates));
    window.dispatchEvent(new CustomEvent('lph-rates-updated', { detail: rates }));
  } catch (e) {
    console.error('Failed to save flyer rates:', e);
  }
};

export const resetFlyerRates = (): FlyerRatesConfig => {
  saveFlyerRates(DEFAULT_FLYER_RATES);
  return DEFAULT_FLYER_RATES;
};

export interface RatesMatrix {
  baseRates: {
    MIKRO: { bpjph: number; lph: number; label: string };
    KECIL: { bpjph: number; lph: number; label: string };
    MENENGAH: { bpjph: number; lph: number; label: string };
    BESAR: { bpjph: number; lph: number; label: string };
  };
  productAddonPerItem: { bpjph: number; lph: number };
  ingredientAddonPerItem: { bpjph: number; lph: number; threshold: number };
  labTesting: {
    qpcrDna: { price: number; name: string };
    gcFidEtanol: { price: number; name: string };
  };
  customItems: HalalRateConfig[];
  updatedAt: string;
}

export const DEFAULT_RATES: RatesMatrix = {
  baseRates: {
    MIKRO: { bpjph: 300000, lph: 350000, label: 'Usaha Mikro (UMK - Self Declare / Reguler)' },
    KECIL: { bpjph: 650000, lph: 2500000, label: 'Usaha Kecil (1 Lini Produksi / Restoran)' },
    MENENGAH: { bpjph: 1250000, lph: 5500000, label: 'Usaha Menengah (Pabrik Kompleks / Bahan Tambahan Pangan)' },
    BESAR: { bpjph: 3500000, lph: 12500000, label: 'Usaha Besar (Industri Multinasional / Farmasi / RPH)' },
  },
  productAddonPerItem: { bpjph: 25000, lph: 20000 },
  ingredientAddonPerItem: { bpjph: 15000, lph: 12000, threshold: 10 },
  labTesting: {
    qpcrDna: { price: 1200000, name: 'Uji Laboratorium DNA Porcine qPCR (Per Sampel)' },
    gcFidEtanol: { price: 650000, name: 'Uji Laboratorium Etanol GC-FID (Per Sampel)' },
  },
  customItems: [
    {
      id: 'rate-1',
      category: 'Pemeriksaan Lapangan',
      label: 'Audit Lapangan Tambahan Luar Provinsi',
      description: 'Biaya akomodasi & transportasi auditor di luar wilayah Jawa Barat sesuai SBM Kemenkeu.',
      bpjphPrice: 0,
      lphPrice: 1500000,
      regulation: 'SBM Kemenkeu 2026',
      isActive: true,
    },
    {
      id: 'rate-2',
      category: 'Verifikasi Dokumen',
      label: 'Percepatan Uji Bahan Baku Kritis Impor',
      description: 'Validasi dokumen LHLN dan sertifikat kehalalan rantai pasok global.',
      bpjphPrice: 200000,
      lphPrice: 450000,
      regulation: 'Kepkaban BPJPH 2026',
      isActive: true,
    },
  ],
  updatedAt: new Date().toISOString(),
};

const STORAGE_KEY = 'lph_custom_rates_matrix';

export const getRatesMatrix = (): RatesMatrix => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse stored rates:', e);
  }
  return DEFAULT_RATES;
};

export const saveRatesMatrix = (matrix: RatesMatrix): void => {
  try {
    matrix.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matrix));
    // Dispatch storage event for cross-component sync
    window.dispatchEvent(new CustomEvent('lph-rates-updated', { detail: matrix }));
  } catch (e) {
    console.error('Failed to save rates:', e);
  }
};

export const resetRatesMatrix = (): RatesMatrix => {
  saveRatesMatrix(DEFAULT_RATES);
  return DEFAULT_RATES;
};

