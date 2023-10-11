import { Command, StatementWord } from '@components/code/code.types'
import { statementInfo } from '@components/info/info.types'
import useBlock from '@components/blocks/block/block.hooks'
import { Input } from '@ui/input'
import { TrashIcon } from 'lucide-react'
import { Button } from '@ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover'
import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { SortableKnob } from 'react-easy-sort'
import Colorful from '@uiw/react-color-colorful'
import { rgbaToHsva } from '@uiw/color-convert'
import Circle from '@uiw/react-color-circle'
import { clamp } from 'lodash-es'

const Block = ({ item }: { item: Command }) => {
    const {
        getTheme,
        color,
        handleChangeComplete,
        paramsColor,
        params,
        setParams,
        handleRemoveCommand,
    } = useBlock(item)

    return (
        <div
            className={`border rounded-xl h-[50px] pl-2 pr-1 py-1 space-x-1 flex items-center justify-between ${
                getTheme() === 'dark' ? 'bg-neutral-900' : 'bg-neutral-200'
            } `}
        >
            <div className="space-x-3 grid grid-cols-[1fr_1.8fr]  justify-stretch items-center flex-grow">
                <div className="flex justify-stretch space-x-3 items-center flex-grow">
                    <div className="w-4 h-4">
                        {item?.statement && statementInfo.get(item.statement)?.icon}
                    </div>
                    <div>{item.statement}</div>
                </div>
                {item.statement === StatementWord.pencolor && (
                    <div className="flex">
                        <Popover>
                            <PopoverTrigger asChild className="p-4 w-full">
                                <Button
                                    style={{
                                        backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
                                    }}
                                    className="rounded-xl  relative  z-30 "
                                >
                                    Pick color
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[290px] flex flex-col justify-center items-center p-4 h-[350px] space-y-4 z-50 ">
                                <Circle
                                    className="mr-0 ml-3"
                                    colors={[
                                        '#f44336',
                                        '#e91e63',
                                        '#9c27b0',
                                        '#673ab7',
                                        '#3f51b5',
                                        '#2196f3',
                                        '#03a9f4',
                                        '#00bcd4',
                                        '#009688',
                                        '#4caf50',
                                        '#8bc34a',
                                        '#cddc39',
                                        '#ffeb3b',
                                        '#ffc107',
                                        '#ff9800',
                                        '#ff5722',
                                        '#795548',
                                        '#607d8b',
                                    ]}
                                    color={rgbaToHsva({ ...color, a: 0 })}
                                    onChange={handleChangeComplete}
                                />
                                <Colorful
                                    color={rgbaToHsva({ ...color, a: 0 })}
                                    disableAlpha={true}
                                    onChange={handleChangeComplete}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
                {item.statement !== StatementWord.pencolor && (
                    <div className="flex">
                        {params &&
                            params.map((param, index) => (
                                <Input
                                    key={index}
                                    type={'number'}
                                    min={1}
                                    max={1000}
                                    defaultValue={param || 0}
                                    className={`${paramsColor[index]}  ${
                                        getTheme() === 'dark' ? 'bg-neutral-800 ' : 'bg-neutral-300'
                                    }`}
                                    onChange={(v) =>
                                        setParams([
                                            ...params.slice(0, index),
                                            clamp(parseInt(v.target.value), 1, 1000),
                                            ...params.slice(index + 1),
                                        ])
                                    }
                                />
                            ))}
                    </div>
                )}
            </div>
            <Button
                variant="outline"
                className="rounded-full w-6 h-6 p-3"
                onClick={handleRemoveCommand}
            >
                <TrashIcon className="flex-e w-3 h-3 flex-shrink-0" />
            </Button>
            <div>
                <SortableKnob>
                    <DragHandleDots2Icon />
                </SortableKnob>
            </div>
        </div>
    )
}

export default Block
