import useBoundStore from '@stores/useBoundStore'
import { useEffect } from 'react'
import { Command, statementMap, StatementWord } from '@components/code/code.types'
import { v4 as uuidv4 } from 'uuid'
import useCleanCode from '@hooks/useCleanCode'

const useCommandSelector = () => {
    const { open, setOpen, code, setTextareaValue, textareaValue, isCodeOpen } = useBoundStore([
        'open',
        'setOpen',
        'code',
        'textareaValue',
        'setTextareaValue',
        'isCodeOpen',
    ])
    const { cleanCode } = useCleanCode()

    const handleAddCommand = (e: StatementWord) => {
        setOpen(false)
        const paramsLength = statementMap.get(e)?.length || 0

        const params: number[] = []
        for (let i = 0; i < paramsLength; i++) {
            params.push(100)
        }
        const paramsText: string[] = params?.join(' ').split(/(\s+)/) || ['']

        const newCommand = {
            statement: e,
            id: uuidv4(),
            error: false,
            params: params,
            text: [e, ' ', ...paramsText],
            line: 0,
        } as Command
        if (isCodeOpen) {
            setTextareaValue(textareaValue + '\n' + newCommand.text.join(''))
            return
        } else {
            cleanCode([...code, newCommand])
        }
    }

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(!open)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    return { handleAddCommand, open, setOpen }
}

export default useCommandSelector
