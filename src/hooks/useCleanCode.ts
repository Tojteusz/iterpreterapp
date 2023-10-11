import { Command, statementMap, StatementWord } from '@components/code/code.types'
import useBoundStore from '@stores/useBoundStore'
import { v4 as uuidv4 } from 'uuid'
import { useToast } from '@ui/use-toast'
import { useEffect } from 'react'

const useCleanCode = () => {
    const { setTextareaValue, isCodeOpen, setCode, code, setIsCodeCorrect, pauseAnimation } =
        useBoundStore([
            'setTextareaValue',
            'isCodeOpen',
            'setCode',
            'code',
            'setIsCodeCorrect',
            'pauseAnimation',
        ])

    const { toast } = useToast()

    const checkLine = (words: string[]): boolean => {
        if (words.length === 0 || (words.length === 1 && words[0] === '')) {
            return true
        }
        const wordsClear = words.filter((word) => !word.includes(' ') && word !== '')
        if (Object.values(StatementWord).includes(wordsClear[0] as StatementWord)) {
            checkParams(wordsClear[0] as StatementWord, wordsClear.slice(1))
            return checkParams(wordsClear[0] as StatementWord, wordsClear.slice(1))
        }
        return false
    }

    const isNumeric = (value: string) => {
        return !Number.isNaN(Number(value))
    }

    const checkParams = (statement: StatementWord, params: string[]): boolean => {
        const statementParams = statementMap.get(statement)
        if (statementParams) {
            if (statementParams.length !== params.length) return false
            let index = 0
            while (index < params.length) {
                if (!isNumeric(params[index])) return false
                index++
            }
            return true
        }
        return false
    }

    const constructCommand = (words: string[], line: number): Command => {
        if (words.length === 0) return { error: false, text: [], line, id: uuidv4() }
        const wordsClear = words.filter((word) => !word.includes(' ') && word !== '')
        return {
            statement: StatementWord[wordsClear[0] as StatementWord],
            params: wordsClear.slice(1).map((param) => Number(param)),
            error: false,
            text: words,
            line,
            id: uuidv4(),
        }
    }
    const parseText = (text: string): Command[] => {
        const lines = text.split(/\r?\n/)
        const commands: Command[] = []
        let lineIndex = 0
        while (lineIndex < lines.length) {
            const words = lines[lineIndex].split(/(\s+)/)
            if (checkLine(words)) {
                commands.push(constructCommand(words, lineIndex))
            } else {
                commands.push({ error: true, text: words, line: lineIndex, id: uuidv4() })
            }
            lineIndex++
        }
        return commands
    }

    const cleanCode = (code: Command[]) => {
        if (!code || code.length < 0) return
        const newCode = code
            .map((command) => {
                const params: string[] = command.params?.join(' ').split(/(\s+)/) || ['']
                return { ...command, text: [command.statement, ' ', ...params] } as Command
            })
            .filter((command) => {
                return !(command.error || command.statement === undefined)
            })
        cleanCodeTextarea(newCode)
    }

    const cleanCodeTextarea = (newCode: Command[]) => {
        let output = ''
        for (const command of newCode) {
            output += command.statement + ' ' + command.params?.join(' ') + '\n'
        }
        if (output.lastIndexOf('\n') > 0) {
            output = output.substring(0, output.lastIndexOf('\n'))
        }
        if (!isCodeOpen) {
            setCode(newCode)
        }
        setTextareaValue(output)
    }

    useEffect(() => {
        const hasNoError = code.find((command) => command.error) === undefined
        const hasMove =
            code.find((command) => {
                if (!command.statement) return false
                return ![
                    StatementWord.pencolor,
                    StatementWord.pendown,
                    StatementWord.penup,
                    StatementWord.penwidth,
                ].includes(command.statement)
            }) !== undefined
        if (!hasMove) {
            pauseAnimation()
            toast({
                title: "Error: Can't run code",
                description: 'Code must contain at least one move statement',
            })
        }
        setIsCodeCorrect(hasNoError && hasMove)
    }, [code])

    return { cleanCode, cleanCodeTextarea, parseText }
}

export default useCleanCode
