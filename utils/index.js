export const convertColorToHex = (colorCode) => {
  if (!colorCode || colorCode === "") return "#FFFFFF";

  const num = parseInt(colorCode, 10);
  if (isNaN(num)) return "#FFFFFF";

  let r = (num >> 11) & 0x1f;
  let g = (num >> 5) & 0x3f;
  let b = num & 0x1f;

  r = Math.round((r * 255) / 31);
  g = Math.round((g * 255) / 63);
  b = Math.round((b * 255) / 31);

  return `rgb(${r}, ${g}, ${b})`;
};

export const getTextColorForBackground = (rgbColor) => {
  if (
    !rgbColor ||
    rgbColor === "#FFFFFF" ||
    rgbColor === "rgb(255, 255, 255)"
  ) {
    return "#000000";
  }

  const rgbMatch = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!rgbMatch) {
    return "#000000";
  }

  const r = parseInt(rgbMatch[1], 10);
  const g = parseInt(rgbMatch[2], 10);
  const b = parseInt(rgbMatch[3], 10);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5 ? "#FFFFFF" : "#000000";
};
