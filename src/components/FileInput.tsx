import type { InputHTMLAttributes } from "react";

export default function FileInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return <input type="file" className="bg-slate-800 p-2" {...props} />;
}
