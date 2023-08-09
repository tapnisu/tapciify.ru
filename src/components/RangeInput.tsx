import type { InputHTMLAttributes } from "react";

export default function RangeInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input type="range" className="bg-slate-800 text-slate-50" {...props} />
  );
}
