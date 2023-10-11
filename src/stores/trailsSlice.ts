import { StateCreator } from 'zustand'
import { Trail } from '@components/canvasElements/trails/trails.types'

export interface TrailsState {
    trails: Trail[]
    setTrails: (trail: Trail[]) => void
}

const trailsSlice: StateCreator<TrailsState> = (set) => ({
    trails: [],
    setTrails: (trail) => set({ trails: trail }),
})

export default trailsSlice
