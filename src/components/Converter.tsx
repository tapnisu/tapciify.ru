import { useState } from "react";
import TextInput from "./TextInput";

export interface AsciiCharacter {
  character: string;
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface RawAsciiImage {
  characters: AsciiCharacter[];
  width: number;
  heigth: number;
}

export interface ConvertResult {
  data: RawAsciiImage[];
}

export default function Converter() {
  const [asciiString, setAsciiString] = useState(" .,:;+*?%S#@");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [file, setFile] = useState<File>();
  const [colored, setColored] = useState(false);
  const [asciiArt, setAsciiArt] = useState<RawAsciiImage | undefined>();

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("blob", file, "img");

    fetch(
      `https://tapciify-api.shuttleapp.rs/convert/raw?width=${width}&height=${height}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((req) => req.json())
      .then((res: ConvertResult) => console.log(setAsciiArt(res.data[0])));
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
            type="file"
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
