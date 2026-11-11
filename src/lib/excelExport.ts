import * as XLSX from 'xlsx';

/**
 * Utility to export JavaScript data objects into clean, professional Excel (.xlsx) files.
 * Includes auto-fit column widths, proper cell formatting, and clean sheet naming.
 */
export const exportToExcel = (
  data: Record<string, any>[],
  fileName: string,
  sheetName: string = 'Data LPH'
) => {
  if (!data || data.length === 0) {
    alert('Tidak ada data yang dapat diekspor.');
    return;
  }

  // 1. Create worksheet from JSON
  const worksheet = XLSX.utils.json_to_sheet(data);

  // 2. Compute clean auto-fit column widths
  const keys = Object.keys(data[0]);
  const colWidths = keys.map((key) => {
    const maxDataLength = Math.max(
      key.length,
      ...data.map((row) => {
        const val = row[key];
        if (val === null || val === undefined) return 0;
        return String(val).length;
      })
    );
    // Add comfortable padding, clamp between 14 and 65
    return { wch: Math.min(Math.max(maxDataLength + 4, 14), 65) };
  });
  worksheet['!cols'] = colWidths;

  // 3. Create workbook and append sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName.substring(0, 31));

  // 4. Trigger download with clean filename
  const timestamp = new Date().toISOString().split('T')[0];
  const fullFileName = `${fileName.replace(/[^a-zA-Z0-9_-]/g, '_')}_${timestamp}.xlsx`;
  XLSX.writeFile(workbook, fullFileName);
};

