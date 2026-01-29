import { type Dispatch, useCallback, useState, useEffect } from "preact/compat";
import { type StateUpdater } from "preact/hooks";

export function useToggle(
  initial = false
): [boolean, () => void, Dispatch<StateUpdater<boolean>>] {
  const [state, setState] = useState(initial);
  return [
    state,
    useCallback(() => {
      setState((v) => !v);
    }, []),
    setState,
  ] as const;
}

export function useAsyncEffect(cb: Function, deps: any[]) {
  return useEffect(() => {
    const res = cb();
    return () => res.then((destroy: any) => destroy?.());
  }, [deps]);
}
