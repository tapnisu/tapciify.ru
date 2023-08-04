import { useState } from "react";
import TextInput from "./TextInput";

export default function Converter() {
  const [asciiString, setAsciiString] = useState(" .,:;+*?%S#@");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [file, setFile] = useState<File>();
  const [colored, setColored] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("blob", file, "img");

    const req = await fetch(
      `https://tapciify-api.shuttleapp.rs/convert/raw?width=${width}&height=${height}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const res = await req.json();

    console.log(res);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label>
        ASCII string:
        <TextInput
          value={asciiString}
          onChange={(e) => setAsciiString(e.target.value)}
          required
        />
      </label>

      <label>
        <input type="checkbox" onChange={(e) => setColored(!colored)} />
        Colored
      </label>

      <label>
        <label>
          Image
          <input
            type="image"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : undefined)
            }
            required
          />
        </label>
      </label>

      <input type="submit" value="Convert" />
    </form>
  );
}
