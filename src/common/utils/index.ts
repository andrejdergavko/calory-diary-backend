export function getDayBounds(daysAgo = 0): { start: Date; end: Date } {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  base.setDate(base.getDate() - daysAgo);
  const start = new Date(base);
  const end = new Date(base);
  end.setDate(start.getDate() + 1);
  return { start, end };
}
