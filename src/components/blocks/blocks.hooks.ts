import useBoundStore from '@stores/useBoundStore'
import { useEffect } from 'react'
import { codeToSteps } from '@lib/codeToStep'
import { arrayMoveImmutable } from 'array-move'

const useBlocks = () => {
    const { code, setCode, setSteps, turtlePosition, direction, speed, getTheme, open, setOpen } =
        useBoundStore([
            'code',
            'setCode',
            'setSteps',
            'turtlePosition',
            'direction',
            'speed',
            'getTheme',
            'open',
            'setOpen',
        ])

    useEffect(() => {
        setSteps(codeToSteps(code, turtlePosition, direction, speed, getTheme()))
    }, [code])

    useEffect(() => {
        setCode(code.filter((item) => !item.error))
    }, [])

    const onSortEnd = (oldIndex: number, newIndex: number) => {
        setCode(arrayMoveImmutable(code, oldIndex, newIndex))
    }

    return { onSortEnd, code, setOpen, open }
}
export default useBlocks
