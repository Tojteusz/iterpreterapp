import { useEffect } from 'react'
import useBoundStore from '@stores/useBoundStore'
import { Step } from '@/types/animation.types'

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
        code,
        setSteps,
        increaseStep,
        setCurrStep,
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
        'setSteps',
        'setCurrStep',
    ])

    const handleTurtlePositionChange = () => {
        const position = {
            x: Math.round(canvasSize.width / 2 / gridSize) * gridSize,
            y: Math.round(canvasSize.height / 2 / gridSize) * gridSize,
        }
        if (code.length <= 1) {
            const step = {
                x: position.x,
                y: position.y,
                rotation: direction,
                duration: 0,
                draw: false,
                color: [256, 256, 256],
                width: 1,
            } as Step
            setSteps([step])
            setCurrStep(step)
        }
        setTurtlePosition(position)
    }

    useEffect(() => {
        handleTurtlePositionChange()
    }, [gridSize, canvasSize, direction, code])

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
