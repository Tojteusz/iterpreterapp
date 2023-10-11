import { StoreApi, UseBoundStore } from "zustand";
import codeSlice, { CodeState } from "@stores/codeSlice";
import settingsSlice, { SettingsState } from "@stores/settingsSlice";
import turtleSlice, { TurtleState } from "@stores/turtleSlice";
import canvasSlice, { CanvasState } from "@stores/canvasSlice";
import { devtools, persist } from "zustand/middleware";
import trailsSlice, { TrailsState } from "@stores/trailsSlice";
import animationSlice, { AnimationState } from "@stores/animationSlice";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type BoundState = AnimationState &
  CodeState &
  SettingsState &
  TurtleState &
  CanvasState &
  TrailsState;

export const createStoreWithSelectors = <T extends BoundState>(
  store: UseBoundStore<StoreApi<T>>,
): (<K extends keyof T>(keys: K[]) => Pick<T, K>) => {
  return <K extends keyof T>(keys: K[]) => {
    return store((state) => {
      if (!keys) return {} as Pick<T, K>;
      if (!keys.length) return {} as Pick<T, K>;
      const x = keys.reduce((acc, cur) => {
        acc[cur] = state[cur];
        return acc;
      }, {} as T);

      return x as Pick<T, K>;
    }, shallow);
  };
};

const boundStore = createWithEqualityFn<BoundState>()(
  devtools(
    persist(
      (...a) => ({
        ...codeSlice(...a),
        ...settingsSlice(...a),
        ...turtleSlice(...a),
        ...canvasSlice(...a),
        ...trailsSlice(...a),
        ...animationSlice(...a),
      }),
      { name: "boundStore" },
    ),
  ),
);

const useBoundStore = createStoreWithSelectors(boundStore);
export default useBoundStore;
