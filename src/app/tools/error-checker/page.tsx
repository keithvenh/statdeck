'use client';

interface RangeCharts {
  [position: string]: {
    [range: string]: {
      [roll: string] : string
    }
  }
}

import { useState } from 'react';
import rawRangeCharts from '@/data/rangeCharts.json';
const rangeCharts = rawRangeCharts as RangeCharts;

export default function ErrorCheckerPage() {
  const [position, setPosition] = useState<keyof typeof rangeCharts>();
  const [roll, setRoll] = useState<{"d20": number, "3d6": number, "d6": string[]} | null>(null);

  const positions: string[] = ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"]
  const dice: string[] = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]

  function getRangeResult(
  charts: typeof rangeCharts,
  position: string,
  range: string,
  roll: number
): string | null {
  return charts[position]?.[range]?.[String(roll)] ?? null;
}

  const handleClick = (pos: string) => {
    ["1B", "2B", "3B", "SS"].includes(pos) ? pos = "IF" : ["LF", "CF", "RF"].includes(pos) ? pos = "OF" : pos = pos
    setPosition(pos);
    const d20 = Math.ceil(Math.random() * 20);
    const d6: string[] = [];
    let d6x3: number = 0;
    for(let i = 0; i < 3; i++) {
      const roll = Math.ceil(Math.random() * 6)
      d6.push(dice[roll - 1])
      d6x3 += roll
    }
    setRoll({
      "d20": d20,
      "3d6": d6x3,
      "d6": d6
    });
  };


  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Strat-O-Matic Error Checker</h1>

      {positions.map(pos => <button onClick={() => handleClick(pos)} className="bg-blue-500 text-white px-4 py-2 rounded m-2 cursor-pointer" key={pos}>{pos}</button>)}

      {roll && (
        <p className="text-lg">
          d20: {roll["d20"]}
          3d6: {roll["3d6"]} (<span className="text-[1.5em]">{roll["d6"]}</span>)
        </p>
      )}

      {position && roll && (
        <table className="table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-center font-semibold text-sm text-gray-700" colSpan={6}>{position} Range Chart</th>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-center font-semibold text-sm text-gray-700">d20</th>
              <th className="border px-4 py-2 text-center font-semibold text-sm text-gray-700">1</th>
              <th className="border px-4 py-2 text-center font-semibold text-sm text-gray-700">2</th>
              <th className="border px-4 py-2 text-center font-semibold text-sm text-gray-700">3</th>
              <th className="border px-4 py-2 text-center font-semibold text-sm text-gray-700">4</th>
              <th className="border px-4 py-2 text-center font-semibold text-sm text-gray-700">5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center">{roll["d20"]}</td>
              <td className="border px-4 py-2 text-center">{rangeCharts[position]["range-1"][roll["d20"]]}</td>
              <td className="border px-4 py-2 text-center">{rangeCharts[position]["range-2"][roll["d20"]]}</td>
              <td className="border px-4 py-2 text-center">{rangeCharts[position]["range-3"][roll["d20"]]}</td>
              <td className="border px-4 py-2 text-center">{rangeCharts[position]["range-4"][roll["d20"]]}</td>
              <td className="border px-4 py-2 text-center">{rangeCharts[position]["range-5"][roll["d20"]]}</td>
            </tr>
          </tbody>
        </table>
      )}

    </div>
  );
}