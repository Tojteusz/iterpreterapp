import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs'
import { Card } from '@ui/card'
import Code from '@components/code/code'
import Settings from '@components/settings/settings'
import { Button } from '@ui/button'
import { CodeIcon, InfoCircledIcon, PauseIcon, PlayIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover'
import Info from '@components/info/info'
import Blocks from '@components/blocks/blocks'
import useSidebar from '@components/sidebar/sidebar.hooks'

const Sidebar = () => {
    const { playAnimation, isCodeCorrect, cleanCode, isAnimating, pauseAnimation, code } =
        useSidebar()

    return (
        <Tabs defaultValue="code" className="w-[370px] h-full space-y-3 flex flex-col ">
            <TabsList className={'grid grid-cols-3 '}>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="blocks">Blocks</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <Card className="h-full p-2 relative">
                <TabContent value="code">
                    <Code />
                </TabContent>
                <TabContent value="blocks">
                    <Blocks />
                </TabContent>
                <TabContent value="settings">
                    <Settings />
                </TabContent>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="rounded-3xl w-10 overflow-visible p-0 absolute right-2 z-30 top-2"
                        >
                            <InfoCircledIcon className="mr-0 h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[350px]">
                        <Info />
                    </PopoverContent>
                </Popover>
                <div className="px-5 space-x-3 flex pt-4 ">
                    <Button variant="outline" className="flex-grow" onClick={() => cleanCode(code)}>
                        <CodeIcon className="mr-2 h-4 w-4" />
                        Clean code
                    </Button>
                    {!isAnimating && (
                        <Button
                            disabled={!isCodeCorrect}
                            onClick={playAnimation}
                            variant="outline"
                            className="flex-grow"
                        >
                            <PlayIcon className="mr-2 h-4 w-4" />
                            Play animation
                        </Button>
                    )}
                    {isAnimating && (
                        <Button
                            disabled={!isCodeCorrect}
                            onClick={pauseAnimation}
                            variant="outline"
                            className="flex-grow"
                        >
                            <PauseIcon className="mr-2 h-4 w-4" />
                            Pause animation
                        </Button>
                    )}
                </div>
            </Card>
        </Tabs>
    )
}

interface TabContentProps {
    children?: React.ReactNode
    value: string
}

const TabContent = ({ children, value }: TabContentProps) => {
    return (
        <TabsContent className={'z-0'} value={value}>
            {children}
        </TabsContent>
    )
}
export default Sidebar
