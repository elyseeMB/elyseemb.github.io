import { render } from "preact";
import { App } from "./app.tsx";
import "./modules/header.ts";
import "./modules/gsap.ts";

render(<App />, document.getElementById("app")!);
