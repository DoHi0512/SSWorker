import { WorkSheet } from "xlsx-js-style";
import * as XLSX from "xlsx-js-style";
export const getAlignment = (
  horizontalAlign: "left" | "center" | "right" = "center",
  verticalAlign: "top" | "center" | "bottom" = "center"
) => {
  return {
    alignment: { horizontal: horizontalAlign, vertical: verticalAlign }
  };
};

export const getFont = (
  bold: boolean = false,
  color: string = "000000",
  size: number = 11,
  underline: boolean = false
) => {
  return {
    font: {
      bold: bold,
      color: { rgb: color },
      sz: size,
      underline: underline
    }
  };
};

export const getBorder = (
  top: boolean = false,
  right: boolean = false,
  bottom: boolean = false,
  left: boolean = false,
  style: "thin" | "medium" | "dashed" | "dotted" = "thin",
  color: string = "000000"
) => {
  const borderStyle = { style: style, color: { rgb: color } };

  return {
    border: {
      top: top ? borderStyle : undefined,
      right: right ? borderStyle : undefined,
      bottom: bottom ? borderStyle : undefined,
      left: left ? borderStyle : undefined
    }
  };
};

export const getBgColor = (color: string = "d9d9d9") => {
  return {
    fill: {
      patternType: "solid",
      bgColor: { rgb: color },
      fgColor: { rgb: color }
    }
  };
};

export const borderRange = (
  ws: WorkSheet,
  startCell: string,
  endCell: string,
  borderStyle = "thin",
  borderColor = "000000"
) => {
  const borderConfig = { style: borderStyle, color: { rgb: borderColor } };
  const start = XLSX.utils.decode_cell(startCell);
  const end = XLSX.utils.decode_cell(endCell);

  for (let row = start.r; row <= end.r; row++) {
    for (let col = start.c; col <= end.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });

      if (!ws[cellAddress]) ws[cellAddress] = { v: "" };

      ws[cellAddress].s = ws[cellAddress].s || {};
      ws[cellAddress].s.border = {
        ...ws[cellAddress].s.border,
        top: row === start.r ? borderConfig : ws[cellAddress].s.border?.top,
        bottom: row === end.r ? borderConfig : ws[cellAddress].s.border?.bottom,
        left: col === start.c ? borderConfig : ws[cellAddress].s.border?.left,
        right: col === end.c ? borderConfig : ws[cellAddress].s.border?.right
      };
    }
  }
};

export const mergeRange = (
  ws: WorkSheet,
  startCell: string,
  endCell: string
) => {
  const start = XLSX.utils.decode_cell(startCell);
  const end = XLSX.utils.decode_cell(endCell);

  if (!ws["!merges"]) ws["!merges"] = [];

  ws["!merges"].push({
    s: start,
    e: end
  });
};
