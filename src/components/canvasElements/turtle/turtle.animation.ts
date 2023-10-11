import useBoundStore from '@stores/useBoundStore'
import { easings, useSpring } from '@react-spring/konva'
import { useEffect } from 'react'
import arrayToColor from '@lib/arrayToColor'

const useTurtleAnimation = () => {
    const { currStep, increaseStep, prevStep, speed, turtleSize, isAnimating, isCodeCorrect } =
        useBoundStore([
            'currStep',
            'increaseStep',
            'prevStep',
            'speed',
            'step',
            'turtleSize',
            'isAnimating',
            'isCodeCorrect',
        ])

    const handleAnimationEnd = () => {
        if (!isAnimating || !isCodeCorrect) return
        increaseStep()
    }
    const turtleAnimation = useSpring({
        x: currStep?.x,
        y: currStep?.y,
        rotation: currStep?.rotation - 90,
        duration: currStep?.duration,

        config: {
            duration: currStep?.duration,
            easing: easings.easeInOutCubic,
        },
        onRest: handleAnimationEnd,
    })

    const turtleBGAnimation = useSpring({
        x: currStep?.x,
        y: currStep?.y,
        rotation: currStep?.rotation - 90,
        duration: currStep?.duration,
        fill: arrayToColor(currStep?.color),

        points: [
            0,
            turtleSize.height / 2,
            currStep?.width / 2,
            -(turtleSize.height / 2),
            -(currStep?.width / 2),
            -(turtleSize.height / 2),
        ],
        config: {
            duration: currStep?.duration,
            easing: easings.easeInOutCubic,
        },
    })

    useEffect(() => {
        if (
            currStep?.x === prevStep?.x &&
            currStep?.y === prevStep?.y &&
            currStep?.rotation === prevStep?.rotation
        ) {
            handleAnimationEnd()
        }
    }, [currStep, prevStep, speed])

    return { turtleAnimation, handleAnimationEnd, speed, turtleBGAnimation }
}

export default useTurtleAnimation
