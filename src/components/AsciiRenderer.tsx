import type { RawAsciiArt } from "./Converter";

export interface AsciiRendererProps {
  asciiArt: RawAsciiArt;
  colored: boolean;
}

export function AsciiRenderer({ asciiArt, colored }: AsciiRendererProps) {
  return (
    <div className="bg-black">
      <code>
        {asciiArt.characters.map((character, key) => (
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
        ))}
      </code>
    </div>
  );
}
