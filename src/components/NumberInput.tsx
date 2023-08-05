import type { InputHTMLAttributes } from "react";

export default function NumberInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input type="number" className="bg-slate-900 text-slate-50" {...props} />
  );
}
