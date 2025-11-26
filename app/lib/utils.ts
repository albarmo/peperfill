export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function randomId(length = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCoupleName(bride: string, groom: string): string {
  return `${capitalize(bride)} & ${capitalize(groom)}`;
}

export function hexToRgb(hex: string): string {
  const sanitized = hex.replace(/^#/, "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}
