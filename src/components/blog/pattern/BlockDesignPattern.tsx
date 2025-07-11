import CodeRenderer from "../../CodeRenderer.tsx";
import { designPatterns, designPatternsByCategory } from "./data.ts";

const code = `import { StateCreator } from "zustand";
import type {
  Account,
  Courses,
  AccessLevels,
  Difficulties,
  Statuses,
} from "@api/website/types";

export type ResourceMap = {
  accessLevel: AccessLevels;
  difficulties: Difficulties;
  statuses: Statuses;
};

export type ResourceKey = keyof ResourceMap;
export type InferResourceType<T extends ResourceKey> = ResourceMap[T];

export type State = {
  account: Account | null | undefined;
  organization: Record<string, any>;
  courses: Courses[];
  accesslevels: AccessLevels[];
  difficulties: Difficulties[];
  statuses: Statuses[];
};

export type Store = ReturnType<ReturnType<typeof import("zustand")["create"]>>;
export type StoreState = Store extends { getState: () => infer T } ? T : never;`;

export default function BlockDesignPattern() {
  return (
    <div>
      <div>
        <CodeRenderer code={code} filename="store.ts" language="ts" />
      </div>
    </div>
  );
}
