import type { ReactNode } from "preact/compat";

export function Wrapper({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return <section className={className}>{children}</section>;
}
