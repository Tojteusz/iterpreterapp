import useBoundStore from '@stores/useBoundStore'
import { useEffect } from 'react'
import arrayToColor from '@lib/arrayToColor'

const useAnimation = () => {
    const {
        step,
        direction,
        canvasSize,
        resetSteps,
        currStep,
        prevStep,
        steps,
        turtlePosition,
        trails,
        setTrails,
        setCurrStep,
        speed,
        code,
        getTheme,
        stopAnimation,
        replayAnimation,
        isAnimating,
    } = useBoundStore([
        'isAnimating',
        'step',
        'direction',
        'canvasSize',
        'resetSteps',
        'steps',
        'turtlePosition',
        'currStep',
        'prevStep',
        'setCurrStep',
        'setTrails',
        'trails',
        'speed',
        'getTheme',
        'loopAnimation',
        'code',
        'stopAnimation',
        'isAnimating',
        'replayAnimation',
    ])
    const animate = false

    const resetTrails = () => {
        setTrails([
            {
                points: [turtlePosition.x, turtlePosition.y, turtlePosition.x, turtlePosition.y],
                strokeWidth: 1,
                render: false,
                color: getTheme() === 'light' ? `rgb(0, 0, 0)` : `rgb(256, 256, 256)`,
                duration: 0,
            },
        ])
    }

    useEffect(() => {
        if (step === 0) {
            setCurrStep(steps[0])
        } else if (step > steps.length - 1) {
            resetTrails()
            if (isAnimating) replayAnimation()
        } else {
            setCurrStep(steps[step])
        }
    }, [step])

    useEffect(() => {
        if (step !== 0 && step <= steps.length - 1) {
            setTrails([
                ...trails,
                {
                    points: [prevStep.x, prevStep.y, currStep.x, currStep.y],
                    strokeWidth: currStep.width,
                    render: currStep.draw,
                    duration: step === 0 ? 0 : currStep.duration,
                    color: arrayToColor(currStep.color),
                },
            ])
        }
    }, [prevStep])

    useEffect(() => {
        resetSteps()
        resetTrails()
        if (isAnimating) replayAnimation()
        else stopAnimation()
    }, [direction, canvasSize, turtlePosition, steps, speed, getTheme()])

    useEffect(() => {
        if (code.length <= 1) {
            resetSteps()
            resetTrails()
            if (isAnimating) replayAnimation()
            else stopAnimation()
        }
    }, [code])

    return { animate }
}

export default useAnimation
