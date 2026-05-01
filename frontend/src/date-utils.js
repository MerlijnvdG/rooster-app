export const DAYS_SHORT = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
export const DAYS_FULL = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
export const MONTHS = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];

export function getMonday(weekOffset = 0) {
  const d = new Date();
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1 + weekOffset * 7);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isToday(dateStr) {
  return dateStr === toISO(new Date());
}

export function isPast(dateStr) {
  return dateStr < toISO(new Date());
}

export function diffHours(startTime, endTime) {
  const [sh, sm] = startTime.slice(0, 5).split(':').map(Number);
  const [eh, em] = endTime.slice(0, 5).split(':').map(Number);
  return ((eh * 60 + em) - (sh * 60 + sm)) / 60;
}

export function formatWeekLabel(weekOffset) {
  const mon = getMonday(weekOffset);
  const sun = addDays(mon, 6);
  return `${mon.getDate()} ${MONTHS[mon.getMonth()]} - ${sun.getDate()} ${MONTHS[sun.getMonth()]} ${sun.getFullYear()}`;
}

const MONTHS_SHORT = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];

export function formatWeekShort(weekOffset) {
  const mon = getMonday(weekOffset);
  const sun = addDays(mon, 6);
  return `${mon.getDate()} ${MONTHS_SHORT[mon.getMonth()]} - ${sun.getDate()} ${MONTHS_SHORT[sun.getMonth()]}`;
}

export function getWeekNumber(weekOffset = 0) {
  const d = getMonday(weekOffset);
  const jan4 = new Date(d.getFullYear(), 0, 4);
  const startOfWeek1 = new Date(jan4);
  startOfWeek1.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
  return Math.round((d - startOfWeek1) / (7 * 86400000)) + 1;
}

export function getWeekDays(weekOffset) {
  const mon = getMonday(weekOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(mon, i);
    return { date: d, iso: toISO(d), dayShort: DAYS_SHORT[i], dayFull: DAYS_FULL[i] };
  });
}

// elke medewerker een vaste kleur
const EMPLOYEE_COLORS = [
  '#1976D2', '#388E3C', '#7B1FA2', '#F57C00', '#00838F',
  '#C62828', '#2E7D32', '#AD1457', '#0277BD', '#558B2F',
];

export function employeeColor(id) {
  return EMPLOYEE_COLORS[(id - 1) % EMPLOYEE_COLORS.length];
}
