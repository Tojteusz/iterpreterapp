import { ThemeProvider, useTheme } from '@components/theme-provider'
import Sidebar from '@components/sidebar/sidebar'
import { MainSpace } from '@components/mainSpace/mainSpace'
import CommandSelector from '@components/command/commandSelector'

const App = () => {
    const { theme } = useTheme()

    return (
        <ThemeProvider>
            <div
                className={`${theme === 'light' ? 'bg-neutral-200' : 'bg-neutral-900'}
                            w-screen
                            h-screen
                            overflow-hidden
                            flex
                            gap-4
                            p-4
                            justify-stretch
                            items-stretch`}
            >
                <Sidebar />
                <MainSpace />
                <CommandSelector />
            </div>
        </ThemeProvider>
    )
}

export default App
