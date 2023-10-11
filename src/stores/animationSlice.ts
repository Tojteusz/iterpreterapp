import { StateCreator } from 'zustand'
import { Step } from '@/types/animation.types'

export interface AnimationState {
    isAnimating: boolean
    step: number
    steps: Step[]
    pendown: boolean
    pencolor: string
    currStep: Step
    prevStep: Step
    playAnimation: () => void
    stopAnimation: () => void
    setSteps: (steps: Step[]) => void
    setCurrStep: (step: Step) => void
    setPrevStep: (step: Step) => void
    increaseStep: () => void
    resetSteps: () => void
    loopAnimation: () => void
    pauseAnimation: () => void
    replayAnimation: () => void
}

const animationSlice: StateCreator<AnimationState> = (set) => ({
    isAnimating: false,
    step: 0,
    pendown: true,
    pencolor: 'black',
    steps: [],
    currStep: {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0,
        draw: false,
        width: 1,
        color: [0, 0, 0],
    },
    prevStep: {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0,
        draw: false,
        width: 1,
        color: [0, 0, 0],
    },
    playAnimation: () => set((state) => ({ isAnimating: true, step: state.step + 1 })),
    replayAnimation: () => set({ isAnimating: true, step: 0 }),
    stopAnimation: () => set({ isAnimating: false, step: 0 }),
    pauseAnimation: () => set({ isAnimating: false }),
    setSteps: (steps: Step[]) => set({ steps }),
    increaseStep: () => set((state) => ({ step: state.step + 1 })),
    resetSteps: () => set({ step: 0, isAnimating: false }),
    loopAnimation: () => set({ step: 0, isAnimating: false }),
    setCurrStep: (step: Step) =>
        set((state) => ({
            prevStep: state.currStep,
            currStep: step,
        })),
    setPrevStep: (step: Step) => set({ prevStep: step }),
})

export default animationSlice
