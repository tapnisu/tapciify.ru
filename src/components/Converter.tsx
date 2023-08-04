import React, { useState } from "react";
import TextInput from "./TextInput";

export default function Converter() {
  const [asciiString, setAsciiString] = useState(" .,:;+*?%S#@");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [file, setFile] = useState<File>();
  const [colored, setColored] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    if (!file) return;

    event.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <label>
        ASCII string:
        <TextInput
          value={asciiString}
          onChange={(e) => setAsciiString(e.target.value)}
          required
        />
      </label>

      <label>
        <label>
          Colored
          <input type="checkbox" onChange={(e) => setColored(!colored)} />
        </label>
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
          <img src={file} />
        </label>
      </label>

      <input type="submit" value="Convert" />
    </form>
  );
}
