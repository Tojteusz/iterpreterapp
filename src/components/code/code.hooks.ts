import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Command, paramColorMap, statementMap } from '@components/code/code.types'
import useBoundStore from '@stores/useBoundStore'
import { codeToSteps } from '@lib/codeToStep'
import useDebounce from '@hooks/useDebounce'
import useCleanCode from '@hooks/useCleanCode'

const useCode = () => {
    const {
        code,
        setCode,
        turtlePosition,
        direction,
        setSteps,
        getTheme,
        isCodeCorrect,
        textareaValue,
        setTextareaValue,
        setIsCodeOpen,
        speed,
    } = useBoundStore([
        'code',
        'setCode',
        'resetSteps',
        'turtlePosition',
        'direction',
        'setSteps',
        'getTheme',
        'isCodeCorrect',
        'setIsCodeCorrect',
        'textareaValue',
        'setTextareaValue',
        'speed',
        'setIsCodeOpen',
    ])
    const { cleanCode, parseText } = useCleanCode()
    const [cursorPosition, setCursorPosition] = useState<number>(0)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const codeRef = useRef<HTMLDivElement>(null)
    const [scrollHeight, setScrollHeight] = useState(0)
    const codeDebounced = useDebounce<string>(textareaValue, 500)

    const syncScroll = () => {
        if (codeRef.current && textareaRef.current) {
            codeRef.current.scrollTop = textareaRef.current.scrollTop
        }
    }

    const renderCode = (code: Command[]): string => {
        const output: string[] = []
        for (const [index, command] of code.entries()) {
            if (command.error) {
                if (index + 1 === cursorPosition) {
                    output.push(`${command.text.join('')}<br/>`)
                } else {
                    output.push(renderErrorLine(command))
                }
            } else {
                output.push(renderLine(command))
            }
        }
        return output.join('')
    }

    const renderErrorLine = (command: Command): string => {
        return `<span class='text-red-600 underline'>${command.text.join('')}</span><br/>`
    }

    const renderLine = (command: Command): string => {
        if (!command.statement) return `<br/>`
        const statement = statementMap.get(command.statement)
        if (!statement) return `<br/>`
        let output = ``
        let index = 0
        for (const text of command.text) {
            if (text === command.statement) {
                output += `<span class='text-purple-500'>${text}</span>`
            } else if (command.params?.includes(parseInt(text))) {
                output += `<span class='${paramColorMap.get(statement[index])}'>${text}</span>`
                index++
            } else {
                output += text
            }
        }
        output += `<br/>`
        return output
    }

    const handleChangeText = (element: ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(element.target.value)
        setCode(parseText(element.target.value))
        syncScroll()
    }

    const handleCursorPosition = () => {
        if (textareaRef.current === null) return
        const cursorPosition = textareaRef.current.selectionStart
        const textUpToCursor = textareaValue.substring(0, cursorPosition)
        const lineCount = textUpToCursor.split('\n').length
        setCursorPosition(lineCount)
    }

    useEffect(() => {
        if (!codeRef.current) return
        codeRef.current.innerHTML = renderCode(code)
    }, [code])

    useEffect(() => {
        setSteps(codeToSteps(code, turtlePosition, direction, speed, getTheme()))
    }, [codeDebounced])

    useEffect(() => {
        setCode(parseText(textareaValue))
        const { current } = textareaRef
        if (!current) return
        setScrollHeight(current.scrollHeight)
    }, [textareaValue])

    useEffect(() => {
        cleanCode(code)
        setIsCodeOpen(true)
        return () => {
            cleanCode(code)
            setIsCodeOpen(false)
        }
    }, [])

    const handleClick = () => {
        textareaRef?.current?.focus()
    }

    return {
        cleanCode,
        code,
        setCode,
        isCodeCorrect,
        textareaRef,
        codeRef,
        syncScroll,
        handleChangeText,
        textareaValue,
        setTextareaValue,
        handleCursorPosition,
        handleClick,
        scrollHeight,
    }
}
export default useCode
