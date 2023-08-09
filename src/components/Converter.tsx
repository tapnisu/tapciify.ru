import { RawAsciiArt, TapciifyApi } from "@lib/api";
import { useState } from "react";
import { AsciiRenderer } from "./AsciiRenderer";
import CheckboxInput from "./CheckboxInput";
import FileInput from "./FileInput";
import NumberInput from "./NumberInput";
import RangeInput from "./RangeInput";
import SubmitInput from "./SubmitInput";
import TextInput from "./TextInput";

const tapciifyApi = new TapciifyApi();

export default function Converter() {
  const [file, setFile] = useState<File>();
  const [width, setWidth] = useState(64);
  const [height, setHeight] = useState(0);
  const [colored, setColored] = useState(false);
  const [asciiString, setAsciiString] = useState(" .,:;+*?%S#@");
  const [fontRatio, setFontRatio] = useState(0.36);
  const [asciiArt, setAsciiArt] = useState<RawAsciiArt | undefined>();

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("blob", file, "img");

    const asciiArt = await tapciifyApi.convertRaw(
      file,
      width,
      height,
      asciiString,
      fontRatio
    );

    setAsciiArt(asciiArt.data[0]);
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
          Width:{" "}
          <NumberInput
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <input
            type="range"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            min="0"
            max="255"
          />
        </label>

        <label>
          Height:{" "}
          <NumberInput
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <RangeInput
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            min="0"
            max="255"
          />
        </label>

        <label>
          Font aspect ratio:{" "}
          <NumberInput
            value={fontRatio}
            onChange={(e) => setFontRatio(Number(e.target.value))}
          />
          <RangeInput
            value={fontRatio}
            onChange={(e) => setFontRatio(Number(e.target.value))}
            min="0.2"
            max="3"
            step="0.01"
          />
        </label>

        <label>
          <CheckboxInput onChange={() => setColored(!colored)} />
          Colored
        </label>

        <label>
          Image
          <FileInput
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : undefined)
            }
            required
          />
        </label>

        <SubmitInput value="Convert" />
      </form>

      {asciiArt ? (
        <AsciiRenderer asciiArt={asciiArt} colored={colored} />
      ) : undefined}
    </div>
  );
}
