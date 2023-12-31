import { createSignal } from "solid-js";
import { RawAsciiArt, TapciifyApi } from "../lib/api";

const tapciifyApi = new TapciifyApi();

export default function Converter() {
  const [file, setFile] = createSignal<File>();

  const [width, setWidth] = createSignal(64);
  const [height, setHeight] = createSignal(0);

  const [fontRatio, setFontRatio] = createSignal(0.36);
  const [asciiString, setAsciiString] = createSignal(" .,:;+*?%S#@");

  const [reverse, setReverse] = createSignal(false);
  const [colored, setColored] = createSignal(false);
  const [pixels, setPixels] = createSignal(false);

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
    event.preventDefault();

    const fileL = file();
    if (!fileL) return alert("File not found!");

    setBusy(true);

    const formData = new FormData();
    formData.append("blob", fileL, "img");

    const res = await tapciifyApi
      .convertRaw(
        fileL,
        width(),
        height(),
        pixels() ? "█" : asciiString(),
        pixels() ? 1 : fontRatio(),
        pixels() ? false : reverse()
      )
      .catch((err) => console.error(err));

    setBusy(false);
    if (!res) return alert("Unknown error happened!");
    setAsciiArt(res.data[0]);
  }

  return (
    <article>
      <pre
        style={
          pixels()
            ? {
                display: "grid",
                "grid-template-columns": `repeat(${asciiArt()?.width}, 1fr)`,
                "grid-auto-rows": "min-content",
              }
            : undefined
        }
      >
        {!pixels() ? (
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
        ) : (
          asciiArt()?.characters.map((character) => (
            <div
              style={{
                "background-color": `rgba(${character.r}, ${character.g}, ${
                  character.b
                }, ${character.a / 255})`,
                "aspect-ratio": 1,
              }}
            ></div>
          ))
        )}
      </pre>

      <form onSubmit={(e) => handleSubmit(e)} class="flex flex-col">
        <label>
          Image
          <input
            type="file"
            multiple
            accept="image/*"
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
              disabled={pixels()}
              min="0.2"
              max="3"
              step="0.01"
            />
            <input
              type="range"
              value={fontRatio()}
              onChange={(e) => setFontRatio(Number(e.target.value))}
              disabled={pixels()}
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
              disabled={pixels()}
              required
            />
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => setReverse((reverse) => !reverse)}
              disabled={pixels()}
            />
            Reverse ASCII string
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => setColored((colored) => !colored)}
              disabled={pixels()}
            />
            Colored
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => setPixels((pixels) => !pixels)}
            />
            Pixels
          </label>
        </details>

        <button type="submit" aria-busy={busy()}>
          Convert
        </button>
      </form>
    </article>
  );
}
