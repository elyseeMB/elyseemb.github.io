import { useEffect, useState } from "preact/hooks";

export function References({ references }: { references: string[] }) {
  const [links, setLinks] = useState();

  useEffect(() => {
    const items = document.querySelectorAll(".content a");
    console.log(items);
  }, []);
  return <div>references</div>;
}
