import { Label } from '@ui/label'
import { Slider } from '@ui/slider'
import { Separator } from '@ui/separator'
import { ScrollArea } from '@ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select'
import { Switch } from '@ui/switch'
import useSettings from '@components/settings/settings.hooks'

const Settings = () => {
    const {
        handleTensionChange,
        turtleSize,
        handleTurtleWidthChange,
        handleTurtleHeightChange,
        handleDirectionChange,
        handleSpeedChange,
        handleGridSizeChange,
        handleThemeChange,
        grid,
        gridSize,
        theme,
        tension,
        speed,
        direction,
        setGrid,
    } = useSettings()

    return (
        <ScrollArea className=" h-calc-100-186 flex flex-grow relative">
            <div className=" space-y-8 overflow-visible p-6">
                <div className="space-y-1 flex flex-col items-start mb-2 w-full">
                    <h4 className="text-sm font-medium leading-none">Theme settings</h4>
                    <p className="text-sm text-muted-foreground">Select your preferred theme.</p>
                    <Select onValueChange={handleThemeChange} defaultValue={theme}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'light'}>Light</SelectItem>
                            <SelectItem value={'dark'}>Dark</SelectItem>
                            <SelectItem value={'system'}>System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <div className="space-y-1 flex flex-col items-start mt-6">
                        <h4 className="text-sm font-medium leading-none">Turtle settings</h4>
                        <p className="text-sm text-muted-foreground">
                            Change the size, tension of the turtle.
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-1 flex flex-col items-start w-full">
                        <Label className="mb-2 ">Tension: {tension}</Label>
                        <Slider
                            id={'tension'}
                            min={0}
                            max={2}
                            step={0.1}
                            defaultValue={[tension]}
                            onValueChange={handleTensionChange}
                        />
                    </div>
                    <div className="space-y-1 flex flex-col items-start w-full">
                        <Label className="mb-2 ">Width: {turtleSize.width}</Label>
                        <Slider
                            id={'width'}
                            min={10}
                            max={100}
                            step={1}
                            defaultValue={[turtleSize.width]}
                            onValueChange={handleTurtleWidthChange}
                        />
                    </div>
                    <div className="space-y-1 flex flex-col items-start w-full ">
                        <Label className="mb-2 ">Height: {turtleSize.height}</Label>
                        <Slider
                            id={'height'}
                            min={10}
                            max={100}
                            step={1}
                            defaultValue={[turtleSize.height]}
                            onValueChange={handleTurtleHeightChange}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="space-y-1 flex flex-col items-start mt-6">
                        <h4 className="text-sm font-medium leading-none">Canvas settings</h4>
                        <p className="text-sm text-muted-foreground">
                            Change grid size, and enable/disable grid.
                        </p>
                    </div>

                    <Separator className="my-4" />
                    <div className="flex items-center space-x-2">
                        <Switch id="grid" checked={grid} onCheckedChange={setGrid} />
                        <Label htmlFor="grid">Grid</Label>
                    </div>
                    <div className="space-y-1 flex flex-col items-start w-full">
                        <Label className="mb-2 ">Grid size: {gridSize}</Label>
                        <Slider
                            id={'grid'}
                            min={16}
                            max={128}
                            step={16}
                            defaultValue={[gridSize]}
                            onValueChange={handleGridSizeChange}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="space-y-1 flex flex-col items-start mt-6">
                        <h4 className="text-sm font-medium leading-none">Animation settings</h4>
                        <p className="text-sm text-muted-foreground">Change animation speed</p>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-1 flex flex-col items-start w-full">
                        <Label className="mb-2 ">Speed (ms): {speed}</Label>
                        <Slider
                            id={'speed'}
                            min={100}
                            max={1000}
                            step={50}
                            defaultValue={[speed]}
                            onValueChange={handleSpeedChange}
                        />
                    </div>
                    <div className="space-y-1 flex flex-col items-start w-full">
                        <Label className="mb-2 ">Direction (deg): {direction}</Label>
                        <Slider
                            id={'direction'}
                            min={0}
                            max={360}
                            step={1}
                            defaultValue={[direction]}
                            onValueChange={handleDirectionChange}
                        />
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}
export default Settings
