/* @refresh reload */
import { render } from "solid-js/web";

import "@picocss/pico/css/pico.cyan.min.css";
import App from "./App";

const root = document.getElementById("root");

render(() => <App />, root!);
