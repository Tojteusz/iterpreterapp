import {create} from 'zustand'


interface CanvasState {

    grid: boolean;
    gridSize: number;
    setGrid: (grid: boolean) => void;
    setGridSize: (gridSize: number) => void;

}

const useCanvasStore = create<CanvasState>((set) => ({
    grid: true,
    gridSize: 32,

    setGridSize: (gridSize) => set({gridSize}),
    setGrid: (grid) => set({grid}),

}))

export default useCanvasStore