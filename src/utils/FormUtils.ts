function parseCSV(csv: string): string[][] {
  return csv
    .split('\n')
    .map(row => row
      .split(',')
      .map(cell => cell.trim())
    )
    .filter(row => row.length > 0);
}

function toCSV(rows: string[][]): string {
  return rows
    .map(row => row.join(','))
    .join('\n');
}

export {
  parseCSV,
  toCSV
}