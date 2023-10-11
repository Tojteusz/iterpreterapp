import { ScrollArea } from '@ui/scroll-area'
import SortableList, { SortableItem } from 'react-easy-sort'
import Block from '@components/blocks/block/block'
import useBlocks from '@components/blocks/blocks.hooks'
import { Button } from '@ui/button'
import { PlusIcon } from 'lucide-react'

const Blocks = () => {
    const { code, onSortEnd, setOpen } = useBlocks()

    return (
        <>
            <ScrollArea className="h-calc-100-186 flex flex-grow relative overflow-visible p-5">
                <SortableList
                    lockAxis={'y'}
                    draggedItemClassName="dragged"
                    className="grid-cols-1 gap-3 grid w-full"
                    onSortEnd={onSortEnd}
                >
                    {code.map((item) => (
                        <SortableItem key={item.id}>
                            <div>
                                <Block item={item} />
                            </div>
                        </SortableItem>
                    ))}

                    <Button
                        variant="outline"
                        onClick={() => {
                            setOpen(true)
                        }}
                        className="space-x-3"
                    >
                        <PlusIcon className="mr-2 h-4 w-4" /> <span>Add block</span>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">
                                {navigator.userAgent.indexOf('Mac OS X') != -1 ? '⌘' : 'Ctrl + '}
                            </span>
                            A
                        </kbd>
                    </Button>
                </SortableList>
            </ScrollArea>
        </>
    )
}

export default Blocks
