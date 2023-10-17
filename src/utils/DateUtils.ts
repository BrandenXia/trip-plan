function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

function parseDate(date: string): Date | null {
  const newDate = new Date(date);
  if (!isValidDate(newDate)) return null;
  return newDate;
}

function toDateString(date: Date | null): string | undefined {
  return date?.toJSON()?.slice(0, 10);
}

function toTimeString(date: Date | null): string | undefined {
  return date?.toJSON()?.slice(11, 16);
}

export {
  isValidDate,
  parseDate,
  toDateString,
  toTimeString
}