import { createSignal } from "solid-js";
import { RawAsciiArt, TapciifyApi } from "../lib/api";

const tapciifyApi = new TapciifyApi();

export default function Converter() {
  const [file, setFile] = createSignal<File>();
  const [width, setWidth] = createSignal(64);
  const [height, setHeight] = createSignal(0);
  const [colored, setColored] = createSignal(false);
  const [asciiString, setAsciiString] = createSignal(" .,:;+*?%S#@");
  const [fontRatio, setFontRatio] = createSignal(0.36);
  // const [reverse, setReverse] = createSignal(false);
  const [asciiArt, setAsciiArt] = createSignal<RawAsciiArt | undefined>();
  const [busy, setBusy] = createSignal(false);

  async function handleSubmit(
    event: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) {
    setBusy(true);

    event.preventDefault();

    const fileL = file();

    if (!fileL) return;

    const formData = new FormData();
    formData.append("blob", fileL, "img");

    const res = await tapciifyApi
      .convertRaw(fileL, width(), height(), asciiString(), fontRatio())
      .catch((err) => console.error(err));

    if (!res) {
      setBusy(false);
      alert("Unknown error happened!");

      return;
    }

    setAsciiArt(res.data[0]);

    setBusy(false);
  }

  return (
    <article class="grid">
      <form onSubmit={(e) => handleSubmit(e)} class="flex flex-col">
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

        <label>
          Width
          <input
            type="number"
            value={width()}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <input
            type="range"
            value={width()}
            onChange={(e) => setWidth(Number(e.target.value))}
            min="0"
            max="255"
          />
        </label>

        <label>
          Height
          <input
            type="number"
            value={height()}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <input
            type="range"
            value={height()}
            onChange={(e) => setHeight(Number(e.target.value))}
            min="0"
            max="255"
          />
        </label>

        <details>
          <summary>Extra</summary>
          <label>
            Font aspect ratio
            <input
              type="number"
              value={fontRatio()}
              onChange={(e) => setFontRatio(Number(e.target.value))}
              min="0.2"
              max="3"
              step="0.01"
            />
            <input
              type="range"
              value={fontRatio()}
              onChange={(e) => setFontRatio(Number(e.target.value))}
              min="0.2"
              max="3"
              step="0.01"
            />
          </label>

          <label>
            ASCII string
            <input
              type="text"
              value={asciiString()}
              onChange={(e) => setAsciiString(e.target.value)}
              required
            />
          </label>

          {/* <label>
            <input
              type="checkbox"
              onChange={() => setReverse((reverse) => !reverse)}
            />
            Reverse ASCII string
          </label> */}

          <label>
            <input
              type="checkbox"
              onChange={() => setColored((colored) => !colored)}
            />
            Colored
          </label>
        </details>

        <button type="submit" aria-busy={busy()}>
          Convert
        </button>
      </form>

      <pre>
        <code>
          {asciiArt()?.characters.map((character, key) => (
            <span
              style={
                colored()
                  ? {
                      color: `rgba(${character.r}, ${character.g}, ${
                        character.b
                      }, ${character.a / 255})`,
                    }
                  : undefined
              }
            >
              {character.character}
              {(key + 1) % asciiArt()!.width == 0 ? <br /> : undefined}
            </span>
          ))}
        </code>
      </pre>
    </article>
  );
}
