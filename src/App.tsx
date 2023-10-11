import { ThemeProvider, useTheme } from '@components/theme-provider'
import Sidebar from '@components/sidebar/sidebar'
import { MainSpace } from '@components/mainSpace/mainSpace'
import CommandSelector from '@components/command/commandSelector'
import { useEffect, useState } from 'react'

function App() {
    const { theme } = useTheme()
    const [run, setRun] = useState(false)
    useEffect(() => {
        setInterval(() => {
            setRun(true)
        })
    }, [])

    return (
        <>
            {run && (
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
            )}
            {!run && <></>}
        </>
    )
}

export default App
