import { StateCreator } from 'zustand'

export interface SettingsState {
    theme: 'system' | 'dark' | 'light'
    speed: number
    open: boolean
    isCodeOpen: boolean
    setIsCodeOpen: (isCodeOpen: boolean) => void
    setTheme: (theme: 'system' | 'dark' | 'light') => void
    setSpeed: (speed: number) => void
    getTheme: () => 'dark' | 'light'
    setOpen: (open: boolean) => void
    textareaValue: string
    setTextareaValue: (textareaValue: string) => void
    isCodeCorrect: boolean
    setIsCodeCorrect: (isCodeCorrect: boolean) => void
}

const settingsSlice: StateCreator<SettingsState> = (set, get) => ({
    theme: 'system',
    speed: 500,
    setSpeed: (speed) => set({ speed }),
    setTheme: (theme) => set({ theme }),
    getTheme: () => {
        const theme = get().theme
        if (theme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        return theme
    },
    open: false,
    setOpen: (open) => set({ open }),
    textareaValue: '',
    setTextareaValue: (textareaValue) => set({ textareaValue }),
    isCodeCorrect: false,
    setIsCodeCorrect: (isCodeCorrect) => set({ isCodeCorrect }),
    isCodeOpen: false,
    setIsCodeOpen: (isCodeOpen) => set({ isCodeOpen }),
})

export default settingsSlice
