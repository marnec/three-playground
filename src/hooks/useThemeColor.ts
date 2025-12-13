import { useMemo } from "react";
import { Color } from "three";
import {
  type ThemeColorKey,
  getThemeColor,
  getThemeColorHSL,
} from "../utils/theme";

export function useThemeColor(key: ThemeColorKey): Color {
  return useMemo(() => getThemeColor(key), [key]);
}

export function useThemeColorHSL(key: ThemeColorKey): {
  h: number;
  s: number;
  l: number;
} {
  return useMemo(() => getThemeColorHSL(key), [key]);
}
