import { Color } from "three";

export type ThemeColorKey = "primary" | "text" | "text-muted" | "accent";

function getCSSVariable(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function cssColorToRgb(cssValue: string): { r: number; g: number; b: number } {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = cssValue;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return { r: r / 255, g: g / 255, b: b / 255 };
}

export function getThemeColor(key: ThemeColorKey): Color {
  const cssValue = getCSSVariable(`--color-${key}`);
  const { r, g, b } = cssColorToRgb(cssValue);
  return new Color(r, g, b);
}

export function getThemeColorHex(key: ThemeColorKey): string {
  return `#${getThemeColor(key).getHexString()}`;
}

export function getThemeColorHSL(key: ThemeColorKey): {
  h: number;
  s: number;
  l: number;
} {
  const color = getThemeColor(key);
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  return hsl;
}

export function getThemeColorRGB(key: ThemeColorKey): {
  r: number;
  g: number;
  b: number;
} {
  const color = getThemeColor(key);
  return { r: color.r, g: color.g, b: color.b };
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  if (s === 0) {
    return [l, l, l];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [hue2rgb(h + 1 / 3), hue2rgb(h), hue2rgb(h - 1 / 3)];
}
