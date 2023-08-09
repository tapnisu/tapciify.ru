import type { InputHTMLAttributes } from "react";

export default function TextInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input type="text" className="bg-slate-800 text-slate-50" {...props} />
  );
}
