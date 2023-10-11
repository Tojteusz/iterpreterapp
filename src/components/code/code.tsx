import useCode from '@components/code/code.hooks'
import { ScrollArea } from '@ui/scroll-area'

const Code = () => {
    const {
        codeRef,
        textareaRef,
        textareaValue,
        syncScroll,
        handleChangeText,
        handleCursorPosition,
        scrollHeight,
        handleClick,
    } = useCode()
    const className = ` p-6 font-mono w-full text-base outline-none resize-none whitespace-break-spaces`
    const style = { height: scrollHeight + 'px' } as React.CSSProperties

    return (
        <>
            <ScrollArea onClick={handleClick} className="h-calc-100-186 flex flex-grow relative">
                <div className="overflow-hidden relative pb-4">
                    <textarea
                        style={style}
                        onChange={handleChangeText}
                        onScroll={syncScroll}
                        spellCheck={false}
                        ref={textareaRef}
                        rows={200}
                        value={textareaValue}
                        onClick={handleCursorPosition}
                        onKeyUp={handleCursorPosition}
                        className={`overflow-hidden z-20 relative caret-purple-700 bg-transparent text-transparent border-0  ${className} `}
                    />
                    <div
                        aria-hidden={true}
                        ref={codeRef}
                        className={`absolute top-0 left-0 z-0 overflow-y-auto break-words ${className}`}
                    />
                </div>
            </ScrollArea>
        </>
    )
}
export default Code
