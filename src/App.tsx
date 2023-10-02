import Sidebar from "@components/sidebar.tsx";
import {ThemeProvider} from "@components/theme-provider.tsx";
import useSettingsStore from "@hooks/useSettingsStore.tsx";
import {MainSpace} from "@components/mainSpace.tsx";

function App() {
    const {dark} = useSettingsStore();

    return (
        <div className=" w-screen h-screen p-6">
            <ThemeProvider defaultTheme={dark}
                           storageKey={"vite-ui-theme"}>
                <div className="flex h-full gap-6">
                    <Sidebar/>
                    <MainSpace/>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default App
