/* @refresh reload */
import { render } from "solid-js/web";

import "@picocss/pico";
import App from "./App";

const root = document.getElementById("root");

render(() => <App />, root!);
