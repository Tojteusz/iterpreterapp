import { StateCreator } from "zustand";

export interface TurtleState {
  turtlePosition: {
    x: number;
    y: number;
  };
  turtleSize: {
    width: number;
    height: number;
  };
  direction: number;
  tension: number;
  setDirection: (direction: number) => void;
  setTension: (tension: number) => void;
  setTurtleSize: (width: number, height: number) => void;
  addMove: () => void;
  resetTurtlePosition: () => void;
  setTurtlePosition: (position: { x: number; y: number }) => void;
}

const useTurtleStore: StateCreator<TurtleState> = (set) => ({
  turtlePosition: { x: 0, y: 0 },
  turtleSize: { width: 20, height: 30 },
  tension: 0.6,
  direction: 90,
  setDirection: (direction) => set({ direction }),
  setTurtleSize: (width, height) => set({ turtleSize: { width, height } }),
  setTension: (tension) => set({ tension }),
  addMove: () => set(() => ({ turtlePosition: { x: 0, y: 0 } })),
  resetTurtlePosition: () => set({ turtlePosition: { x: 0, y: 0 } }),
  setTurtlePosition: (position) => set({ turtlePosition: position }),
});

export default useTurtleStore;
