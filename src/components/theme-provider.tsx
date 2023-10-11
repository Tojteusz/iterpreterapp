import { useEffect } from 'react'
import useBoundStore from '@stores/useBoundStore'

type ThemeProviderProps = {
    children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const { theme } = useBoundStore(['theme', 'setTheme'])

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    return <>{children}</>
}

export const useTheme = () => {
    const theme = useBoundStore(['theme'])

    if (theme === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return theme
}
