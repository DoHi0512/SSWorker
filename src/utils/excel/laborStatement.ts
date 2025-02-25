import * as XLSX from "xlsx-js-style";
import {
  borderRange,
  getAlignment,
  getBgColor,
  getBorder,
  getFont,
  mergeRange
} from "./styleGenerator";
import { fetchLaborStatement } from "@/lib/laborStatement";
import dayjs from "dayjs";
const createLaborStatement = async (selectedDate: string) => {
  const {
    data,
    totalPayment,
    totalPaymentMonth,
    totalTimeMonth,
    totalTime,
    placeData
  } = await fetchLaborStatement(selectedDate);
  const totalIndex = data.length + 6;
  const placeIndex = data.length + 8;
  const sheet: any = [
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      {
        v: "담당",
        s: { ...getAlignment() }
      },
      {
        v: "과장",
        s: { ...getAlignment() }
      },
      {
        v: "대표",
        s: { ...getAlignment() }
      }
    ],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    [
      "",
      {
        v: dayjs(selectedDate).format("YYYY년 MM월 DD일"),
        s: { ...getAlignment() }
      },
      "",
      "",
      "",
      "",
      { v: "토요일", s: { ...getAlignment() } },
      "",
      {
        v: "총품수",
        s: { ...getFont(true), ...getBorder(true, true, true, true, "medium") }
      },
      { v: 82, s: { ...getAlignment() } },
      "",
      "",
      "",
      "",
      ""
    ],
    ["", "", "", "", "", "", "", "", "", ","],
    [
      "",
      {
        v: dayjs(selectedDate).format("YYYY년 MM월 DD일"),
        s: { ...getAlignment(), ...getFont(true), ...getBgColor() }
      },
      "",
      "",
      {
        v: "품수",
        s: {
          ...getAlignment(),
          ...getFont(true),
          ...getBgColor(),
          ...getBorder(false, false, false, true, "thin")
        }
      },
      {
        v: "노무비",
        s: {
          ...getAlignment(),
          ...getFont(true),
          ...getBgColor(),
          ...getBorder(false, false, false, true, "thin")
        }
      },
      "",
      {
        v: "누적품수",
        s: {
          ...getAlignment(),
          ...getFont(true),
          ...getBgColor(),
          ...getBorder(false, false, false, true, "medium")
        }
      },
      "",
      {
        v: "누적노무비",
        s: {
          ...getAlignment(),
          ...getFont(true),
          ...getBgColor(),
          ...getBorder(false, false, false, true, "thin")
        }
      },
      "",
      "",
      {
        v: "비고",
        s: {
          ...getAlignment(),
          ...getFont(true),
          ...getBgColor(),
          ...getBorder(false, false, false, true, "thin")
        }
      },
      "",
      ""
    ]
  ];
  data.forEach(
    ({
      team,
      category,
      total_payment_month,
      total_time,
      total_payment,
      total_time_month
    }) =>
      sheet.push([
        "",
        "",
        { v: team, s: { ...getAlignment() } },
        { v: category, s: { ...getAlignment() } },
        {
          v: total_time,
          s: {
            ...getAlignment(),
            ...getBorder(false, true, false, true, "thin")
          }
        },
        {
          v: total_payment,
          s: {
            numFmt: '"₩ "#,##0',
            ...getBorder(false, true, false, false, "medium")
          },
          t: "n"
        },
        "",
        {
          v: total_time_month,
          s: {
            ...getAlignment(),
            ...getBorder(false, false, false, true, "medium")
          }
        },
        "",
        {
          v: total_payment_month,
          s: {
            numFmt: '"₩ "#,##0',
            ...getBorder(false, true, false, true, "thin")
          },
          t: "n"
        },
        "",
        ""
      ])
  );
  sheet.push([
    "",
    { v: "합계", s: { ...getAlignment(), ...getFont(true, "#ff0000") } },
    "",
    "",
    {
      v: totalTime,
      s: {
        ...getAlignment(),
        ...getFont(false, "#ff0000"),
        ...getBorder(false, false, false, true, "thin")
      }
    },
    {
      v: totalPayment,
      s: {
        ...getFont(false, "#ff0000"),
        numFmt: '"₩ "#,##0',
        ...getBorder(false, false, false, true, "thin")
      },
      t: "n"
    },
    "",
    {
      v: totalTimeMonth,
      s: {
        ...getAlignment(),
        ...getFont(false, "#ff0000"),
        ...getBorder(false, false, false, true, "medium")
      }
    },
    "",
    {
      v: totalPaymentMonth,
      s: {
        ...getFont(false, "#ff0000"),
        numFmt: '"₩ "#,##0',
        ...getBorder(false, false, false, true, "thin")
      },
      t: "n"
    },
    "",
    ""
  ]);
  sheet.push(["", "", ""]);
  sheet.push([
    "",
    { v: "현장", s: { ...getAlignment(), ...getFont(true), ...getBgColor() } },
    "",
    "",
    {
      v: "품수",
      s: {
        ...getAlignment(),
        ...getFont(true),
        ...getBgColor(),
        ...getBorder(false, false, false, true, "thin")
      }
    },
    {
      v: "일용직 명단",
      s: {
        ...getAlignment(),
        ...getFont(true),
        ...getBgColor(),
        ...getBorder(false, false, false, true, "thin")
      }
    },
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]);
  placeData?.map(
    ({
      place,
      total_time,
      workers
    }: {
      place: string;
      total_time: number;
      workers: string[];
    }) => {
      sheet.push([
        "",
        { v: place, s: { ...getAlignment() } },
        "",
        "",
        {
          v: total_time,
          s: {
            ...getAlignment(),
            ...getFont(false, "#ff0000"),
            ...getBgColor("FFC7CE")
          }
        },
        ...workers.splice(0, 10).map((name) => name)
      ]);
      sheet.push([
        "",
        "",
        "",
        "",
        "",
        ...workers.splice(10, 20).map((name) => name)
      ]);
      sheet.push([
        "",
        "",
        "",
        "",
        "",
        ...workers.splice(20, 30).map((name) => name)
      ]);
      sheet.push([
        "",
        "",
        "",
        "",
        "",
        ...workers.splice(30, 40).map((name) => name)
      ]);
    }
  );
  const book = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(sheet);

  for (let i = 0; i < data.length; i++) {
    const idx = 6 + i;
    mergeRange(ws, `F${idx}`, `G${idx}`);
    mergeRange(ws, `H${idx}`, `I${idx}`);
    mergeRange(ws, `J${idx}`, `L${idx}`);
  }

  for (let i = 0; i < placeData?.length; i++) {
    const idx = placeIndex + 1 + i * 4;
    mergeRange(ws, `B${idx}`, `D${idx + 3}`);
    mergeRange(ws, `E${idx}`, `E${idx + 3}`);
    borderRange(ws, `B${idx}`, `O${idx + 3}`);
    borderRange(ws, `E${idx}`, `E${idx + 3}`, "thin");
  }

  ws["!cols"] = [
    { wpx: 10 },
    { wpx: 18 },
    { wpx: 50 },
    { wpx: 84 },
    { wpx: 60 },
    { wpx: 50 },
    { wpx: 50 },
    { wpx: 42 },
    { wpx: 42 },
    { wpx: 42 },
    { wpx: 42 },
    { wpx: 42 },
    { wpx: 60 },
    { wpx: 60 },
    { wpx: 60 }
  ];
  mergeRange(ws, "B3", "F3");
  mergeRange(ws, "G3", "H3");
  mergeRange(ws, "J3", "K3");
  mergeRange(ws, "B5", "D5");
  mergeRange(ws, "F5", "G5");
  mergeRange(ws, "H5", "I5");
  mergeRange(ws, "J5", "L5");
  mergeRange(ws, "M5", "O5");
  mergeRange(ws, `B${totalIndex}`, `D${totalIndex}`);
  mergeRange(ws, `F${totalIndex}`, `G${totalIndex}`);
  mergeRange(ws, `H${totalIndex}`, `I${totalIndex}`);
  mergeRange(ws, `J${totalIndex}`, `L${totalIndex}`);
  mergeRange(ws, `B${placeIndex}`, `D${placeIndex}`);
  mergeRange(ws, `F${placeIndex}`, `O${placeIndex}`);
  borderRange(ws, "M1", "O3", "medium");
  borderRange(ws, "B3", "F3", "medium");
  borderRange(ws, "G3", "H3", "medium");
  borderRange(ws, "J3", "K3", "medium");
  borderRange(ws, "B5", "O5", "medium");
  borderRange(ws, "B6", `O${totalIndex}`, "medium");
  borderRange(ws, `B${totalIndex}`, `O${totalIndex}`, "medium");
  borderRange(ws, `B${placeIndex}`, `O${placeIndex}`, "medium");

  if (ws["!ref"]) {
    const totalRows = XLSX.utils.decode_range(ws["!ref"]).e.r;
    ws["!rows"] = Array(totalRows).fill({ hpx: 18 });
  }

  console.log(ws);

  XLSX.utils.book_append_sheet(book, ws, "출력일보");

  XLSX.writeFile(book, "test.xlsx");
};
export default createLaborStatement;
