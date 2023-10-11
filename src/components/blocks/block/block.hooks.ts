import useBoundStore from '@stores/useBoundStore'
import { useEffect, useState } from 'react'
import { Command, paramColorMap, statementMap, StatementWord } from '@components/code/code.types'
import { ColorResult } from '@uiw/color-convert'
import { codeToSteps } from '@lib/codeToStep'

const useBlock = (item: Command) => {
    const { getTheme, code, setCode, turtlePosition, direction, speed } = useBoundStore([
        'getTheme',
        'code',
        'setCode',
        'turtlePosition',
        'direction',
        'speed',
    ])

    const [params, setParams] = useState<number[]>(item.params || [])
    const [color, setColor] = useState({ r: 0, g: 0, b: 0 })
    const [paramsColor, setParamsColor] = useState<string[]>([])
    const statement = item.statement ? statementMap.get(item?.statement) : undefined

    useEffect(() => {
        let newCode = [...code]

        newCode = newCode.map((v) => {
            if (v.id === item.id) return { ...v, params } as Command
            return v
        }) as Command[]
        setCode(newCode)
    }, [params])

    useEffect(() => {
        codeToSteps(code, turtlePosition, direction, speed, getTheme())
    }, [code])

    useEffect(() => {
        const colors: string[] = []
        if (statement) {
            for (const param of statement) {
                const color = paramColorMap.get(param)
                if (color) {
                    colors.push(color)
                }
            }
            if (item.params) {
                setParams(item.params)
            }
        }
        if (item.statement === StatementWord.pencolor && item?.params) {
            setColor({ r: item?.params[0], g: item.params[1], b: item.params[2] })
        }
        setParamsColor(colors)
    }, [])
    const handleChangeComplete = (color: ColorResult) => {
        setParams([color.rgb.r, color.rgb.g, color.rgb.b])
        setColor(color.rgb)
    }

    const handleRemoveCommand = () => {
        let newCode = [...code]

        newCode = newCode.filter((v) => v.id !== item.id)
        setCode(newCode)
    }

    return {
        getTheme,
        color,
        handleChangeComplete,
        paramsColor,
        params,
        setParams,
        handleRemoveCommand,
    }
}

export default useBlock
