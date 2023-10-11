import { StateCreator } from "zustand";

export interface CanvasState {
  grid: boolean;
  gridSize: number;
  setGrid: (grid: boolean) => void;
  setGridSize: (gridSize: number) => void;
  canvasSize: { width: number; height: number };
  setCanvasSize: (width: number, height: number) => void;
}

const useCanvasStore: StateCreator<CanvasState> = (set) => ({
  grid: true,
  gridSize: 32,
  canvasSize: { width: 0, height: 0 },
  setGridSize: (gridSize) => set({ gridSize }),
  setGrid: (grid) => set({ grid }),
  setCanvasSize: (width, height) => set({ canvasSize: { width, height } }),
});

export default useCanvasStore;
