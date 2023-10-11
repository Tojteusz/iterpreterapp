import useBoundStore from '@stores/useBoundStore'
import { useEffect } from 'react'
import { codeToSteps } from '@lib/codeToStep'

const useSettings = () => {
    const {
        setTurtleSize,
        turtleSize,
        tension,
        setTension,
        direction,
        setDirection,
        grid,
        gridSize,
        setGrid,
        setGridSize,
        speed,
        setSpeed,
        code,
        setSteps,
        turtlePosition,
        theme,
        setTheme,
        getTheme,
    } = useBoundStore([
        'setTurtleSize',
        'turtleSize',
        'tension',
        'setTension',
        'direction',
        'setDirection',
        'grid',
        'gridSize',
        'setGrid',
        'setGridSize',
        'speed',
        'setSpeed',
        'code',
        'setSteps',
        'turtlePosition',
        'theme',
        'setTheme',
        'getTheme',
    ])

    const handleGridSizeChange = (value: number[]) => {
        setGridSize(value[0])
    }

    const handleTurtleWidthChange = (value: number[]) => {
        setTurtleSize(value[0], turtleSize.height)
    }

    const handleTurtleHeightChange = (value: number[]) => {
        setTurtleSize(turtleSize.width, value[0])
    }

    const handleTensionChange = (value: number[]) => {
        setTension(value[0])
    }

    const handleSpeedChange = (value: number[]) => {
        setSpeed(value[0])
    }

    const handleDirectionChange = (value: number[]) => {
        setDirection(value[0])
    }

    const handleThemeChange = (value: 'system' | 'dark' | 'light') => {
        setTheme(value)
    }

    useEffect(() => {
        setSteps(codeToSteps(code, turtlePosition, direction, speed, getTheme()))
    }, [speed, direction, gridSize, getTheme()])

    return {
        handleGridSizeChange,
        handleTurtleWidthChange,
        handleTurtleHeightChange,
        handleTensionChange,
        handleSpeedChange,
        handleDirectionChange,
        handleThemeChange,
        grid,
        gridSize,
        turtleSize,
        setTheme,
        theme,
        tension,
        speed,
        direction,
        setGrid,
    }
}

export default useSettings
