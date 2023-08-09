import type { InputHTMLAttributes } from "react";

export default function SubmitInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input type="submit" className="bg-slate-800 text-slate-50" {...props} />
  );
}
