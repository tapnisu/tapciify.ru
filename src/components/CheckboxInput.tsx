import type { InputHTMLAttributes } from "react";

export default function CheckboxInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return <input type="checkbox" {...props} />;
}
