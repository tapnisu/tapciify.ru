import type { InputHTMLAttributes } from "react";

export default function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input type="text" {...props} className="bg-slate-900 text-slate-50" />
  );
}
