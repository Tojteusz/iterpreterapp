import {create} from 'zustand'


interface TurtleState {

    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    tension: number;
    setTension: (tension: number) => void;
    setSize: (width: number, height: number) => void;
    addMove: () => void;
    resetTurtlePosition: () => void;
    setTurtlePosition: (position: { x: number; y: number }) => void;

}

const useTurtleStore = create<TurtleState>((set) => ({

    position: {x: 0, y: 0},
    size: {width: 20, height: 30},
    tension: 0.6,
    setSize: (width, height) => set({size: {width, height}}),
    setTension: (tension) => set({tension}),
    addMove: () => set((state) => ({position: {x: 0, y: 0}})),
    resetTurtlePosition: () => set({position: {x: 0, y: 0}}),
    setTurtlePosition: (position) => set({position}),
}))

export default useTurtleStore