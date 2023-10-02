import {create} from 'zustand'

export enum DarkMode {
    DARK = "dark",
    LIGHT = "light",
    SYSTEM = "system"
}

interface SettingsState {

    dark: DarkMode;
    setDark: (dark: DarkMode) => void;

}

const useSettingsStore = create<SettingsState>((set) => ({
    dark: DarkMode.SYSTEM,

    setDark: (dark) => set({dark})

}))

export default useSettingsStore