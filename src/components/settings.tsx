import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@ui/select.tsx";
import useTurtleStore from "@hooks/useTurtleStore.tsx";
import useCanvasStore from "@hooks/useCanvasStore.tsx";
import {DarkMode} from "@hooks/useSettingsStore.tsx";
import {useTheme} from "@components/theme-provider.tsx";
import {Separator} from "@ui/separator.tsx";
import {Slider} from "@ui/slider.tsx";
import {Label} from "@ui/label.tsx";
import {Switch} from "@ui/switch.tsx";
import {Card} from "@ui/card.tsx";

const Settings = () => {
    const {setSize, size, tension, setTension} = useTurtleStore()
    const {grid, gridSize, setGrid, setGridSize} = useCanvasStore()
    const {setTheme, theme} = useTheme()


    const handleGridSizeChange = (value: number[]) => {
        setGridSize(value[0]);
    }

    const handleTurtleWidthChange = (value: number[]) => {
        setSize(value[0], size.height);
    }

    const handleTurtleHeightChange = (value: number[]) => {
        setSize(size.width, value[0]);
    }

    const handleTensionChange = (value: number[]) => {
        setTension(value[0]);
    }

    return (
        <Card className="p-6 h-full">
            <div className="h-full w-full space-y-8">
                <div className="space-y-1 flex flex-col items-start mb-2 w-full">
                    <h4 className="text-sm font-medium leading-none">Theme settings</h4>
                    <p className="text-sm text-muted-foreground">
                        Select your preferred theme.
                    </p>
                    <Select onValueChange={setTheme}
                            defaultValue={theme}>
                        <SelectTrigger className="w-full">
                            <SelectValue
                                placeholder="Theme"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={DarkMode.LIGHT}>Light</SelectItem>
                            <SelectItem value={DarkMode.DARK}>Dark</SelectItem>
                            <SelectItem value={DarkMode.SYSTEM}>System</SelectItem>
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
                    <Separator className="my-4"/>
                    <div className="space-y-1 flex flex-col items-start w-full">
                        <Label className="mb-2 ">Tension: {tension}</Label>
                        <Slider id={"tension"}
                                max={2}
                                min={0}
                                step={0.1}
                                defaultValue={[tension]}
                                onValueChange={handleTensionChange}/>
                    </div>
                    <div className="space-y-1 flex flex-col items-start w-full">
                        <Label className="mb-2 ">Width: {size.width}</Label>
                        <Slider id={"width"}
                                max={100}
                                min={10}
                                step={1}
                                defaultValue={[size.width]}
                                onValueChange={handleTurtleWidthChange}/>
                    </div>
                    <div className="space-y-1 flex flex-col items-start w-full ">
                        <Label className="mb-2 ">Height: {size.height}</Label>
                        <Slider id={"height"}
                                max={100}
                                min={10}
                                step={1}
                                defaultValue={[size.height]}
                                onValueChange={handleTurtleHeightChange}/>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="space-y-1 flex flex-col items-start mt-6">
                        <h4 className="text-sm font-medium leading-none">Canvas settings</h4>
                        <p className="text-sm text-muted-foreground">
                            Change grid size, and enable/disable grid.
                        </p>
                    </div>

                    <Separator className="my-4"/>
                    <div className="flex items-center space-x-2">
                        <Switch id="grid"
                                checked={grid}
                                onCheckedChange={setGrid}/>
                        <Label htmlFor="grid">Grid</Label>
                    </div>
                    <div className="space-y-1 flex flex-col items-start w-full">
                        <Label className="mb-2 ">Grid size: {gridSize}</Label>
                        <Slider id={"grid"}
                                max={128}
                                min={16}
                                step={16}
                                defaultValue={[gridSize]}
                                onValueChange={handleGridSizeChange}/>
                    </div>

                </div>
            </div>
        </Card>
    )
}
export default Settings