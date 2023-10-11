import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@ui/command'
import { ScrollArea } from '@ui/scroll-area'
import Info, { StatementGroup, statementInfo } from '@components/info/info.types'
import { Separator } from '@ui/separator'
import { paramColorMap, ParamType, statementMap, StatementWord } from '@components/code/code.types'
import useCommandSelector from '@components/command/commandSelector.hooks'

const CommandSelector = () => {
    const { handleAddCommand, open, setOpen } = useCommandSelector()
    const OptionRender = ({ info }: { info: [StatementWord, Info] }) => {
        const params = statementMap.get(info[0])
        return (
            <>
                <CommandItem>
                    <div
                        className="flex items-center space-x-2 font-normal text-base w-full cursor-pointer"
                        onClick={() => handleAddCommand(info[0])}
                    >
                        {info[1].icon}
                        <div className="pl-3">{info[0]}</div>
                        <div className={'flex  space-x-2'}>
                            {params?.map((param, index) => (
                                <div className={paramColorMap.get(param)} key={index}>
                                    {ParamType[param]}
                                </div>
                            ))}
                        </div>
                    </div>
                </CommandItem>
            </>
        )
    }

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <ScrollArea>
                    {Object.keys(StatementGroup).map((group, index) => (
                        <CommandGroup
                            heading={group}
                            className="font-black text-xl"
                            key={index + 'group'}
                        >
                            <Separator />
                            {Array.from(statementInfo)
                                .sort()
                                .filter((value) => value[1].group === group)
                                .map((info, index) => (
                                    <OptionRender info={info} key={index} />
                                ))}
                        </CommandGroup>
                    ))}
                </ScrollArea>
            </CommandList>
        </CommandDialog>
    )
}

export default CommandSelector
