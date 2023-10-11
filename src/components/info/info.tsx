import Info, { StatementGroup, statementInfo } from '@components/info/info.types'
import { ScrollArea } from '@ui/scroll-area'
import { paramColorMap, ParamType, statementMap, StatementWord } from '@components/code/code.types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion'
import { Separator } from '@ui/separator'

const Info = () => {
    return (
        <>
            <ScrollArea className={'h-[70vh] p-3'}>
                <h1 className="text-xl font-extrabold">Documentation</h1>
                <div className="text-opacity-40 text-sm">
                    Reveal part to get more knowledge <br />
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">
                            {navigator.userAgent.indexOf('Mac OS X') != -1 ? '⌘' : 'Ctrl + '}
                        </span>
                        A
                    </kbd>{' '}
                    click to add command
                </div>
                <Separator className="my-2" />
                <Accordion type={'multiple'} className="space-y-2">
                    {Object.keys(StatementGroup).map((group, index) => (
                        <AccordionItem value={group} key={index}>
                            <AccordionTrigger className="hover:no-underline ">
                                <div className="flex flex-col justify-start items-start">
                                    <h2 className="text-lg font-bold">{group}</h2>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2">
                                    {Array.from(statementInfo)
                                        .sort()
                                        .filter((value) => value[1].group === group)
                                        .map((info, index) => (
                                            <InfoRender key={index} info={info} />
                                        ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>
        </>
    )
}

const InfoRender = ({ info }: { info: [StatementWord, Info] }) => {
    const params = statementMap.get(info[0])
    return (
        <>
            <div className="flex items-center space-x-2 border rounded-2xl p-2">
                <div className="pr-2 pl-3 ">{info[1].icon}</div>
                <div className="">
                    <div className="text-lg font-semibold flex space-x-3 ">
                        <div>{info[0]}</div>
                        <div className={'flex  space-x-2'}>
                            {params?.map((param) => (
                                <div className={paramColorMap.get(param)}>{ParamType[param]}</div>
                            ))}
                        </div>
                    </div>

                    <div className="text-sm text-purple-400">{info[1].description}</div>
                </div>
            </div>
        </>
    )
}
export default Info
