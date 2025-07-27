import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";

type Props = {
  code: string;
  language?: string;
};

export default function CodeRenderer({ code, language = "ts" }: Props) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur copie:", err);
    }
  };

  return (
    <div className="code-block">
      <div className="code-toolbar">
        <button onClick={handleCopy} className="copy-btn">
          {copied ? "✅ Copié" : "📋 Copier"}
        </button>
      </div>
      <pre className="code-content">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
