import React, { useState } from "react";
import TextInput from "./TextInput";

export default function Converter() {
  const [asciiString, setAsciiString] = useState(" .,:;+*?%S#@");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [colored, setColored] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const req = await fetch(
      `https://tapciify-api.shuttleapp.rs/convert/raw?width=${width}&height=${height}`
    );
    const res = await req.json();

    console.log(res);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ASCII string:
        <TextInput
          type="text"
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

      <input type="submit" value="Submit" />
    </form>
  );
}
