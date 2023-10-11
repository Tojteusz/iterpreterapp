import { useEffect } from 'react'
import useBoundStore from '@stores/useBoundStore'

const useTurtle = () => {
    const {
        direction,
        setTurtlePosition,
        gridSize,
        canvasSize,
        theme,
        step,
        turtleSize,
        tension,
        speed,
        getTheme,
        increaseStep,
    } = useBoundStore([
        'code',
        'turtlePosition',
        'direction',
        'setTurtlePosition',
        'gridSize',
        'canvasSize',
        'theme',
        'speed',
        'step',
        'turtleSize',
        'speed',
        'tension',
        'increaseStep',
        'getTheme',
    ])

    const handleTurtlePositionChange = () => {
        setTurtlePosition({
            x: Math.round(canvasSize.width / 2 / gridSize) * gridSize,
            y: Math.round(canvasSize.height / 2 / gridSize) * gridSize,
        })
    }

    useEffect(() => {
        handleTurtlePositionChange()
    }, [gridSize, canvasSize, direction])

    return {
        direction,
        theme,
        step,
        turtleSize,
        tension,
        increaseStep,
        speed,
        getTheme,
    }
}

export default useTurtle
