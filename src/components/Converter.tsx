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
  const [width, setWidth] = useState(64);
  const [height, setHeight] = useState(0);
  const [file, setFile] = useState<File>();
  const [colored, setColored] = useState(false);
  const [asciiArt, setAsciiArt] = useState<RawAsciiImage | undefined>();

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
    const res: ConvertResult = await req.json();

    setAsciiArt(res.data[0]);
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
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

      <div className="bg-black">
        <code>
          {asciiArt
            ? asciiArt.characters.map((character, key) => (
                <span
                  style={
                    colored
                      ? {
                          color: `rgba(${character.r}, ${character.g}, ${
                            character.b
                          }, ${character.a / 255})`,
                        }
                      : undefined
                  }
                  key={key}
                  className="whitespace-pre"
                >
                  {character.character}
                  {(key + 1) % asciiArt.width == 0 ? <br /> : undefined}
                </span>
              ))
            : undefined}
        </code>
      </div>
    </div>
  );
}
