import { usePageTitle } from "./hooks/usePageTitle.tsx";

export function App() {
  usePageTitle("Welcome");
  return (
    <>
      hello world !<span>I am secondary span</span>
    </>
  );
}
