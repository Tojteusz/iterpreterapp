import { easings, useSpring } from '@react-spring/konva'
import useBoundStore from '@stores/useBoundStore'
import { useEffect } from 'react'

const useTrailsAnimation = () => {
    const { trails, getTheme } = useBoundStore(['trails', 'getTheme'])
    const currTrail = trails
        ? trails[trails.length - 1]
        : {
              points: [0, 0, 0, 0],
              strokeWidth: 1,
              render: false,
              duration: 0,
              color: getTheme() === 'light' ? `rgb(0, 0, 0)` : `rgb(256, 256, 256)`,
          }

    const lineAnimation = useSpring({
        from: {
            points: [
                currTrail?.points[0],
                currTrail?.points[1],
                currTrail?.points[0],
                currTrail?.points[1],
            ],
            strokeWidth:
                currTrail?.points[0] === currTrail?.points[2] &&
                currTrail?.points[1] === currTrail?.points[3]
                    ? 0
                    : currTrail?.strokeWidth,
            opacity: currTrail?.render ? 1 : 0,
            stroke: currTrail?.color,
        },
        to: {
            points: [
                currTrail?.points[0],
                currTrail?.points[1],
                currTrail?.points[2],
                currTrail?.points[3],
            ],
            strokeWidth:
                currTrail?.points[0] === currTrail?.points[2] &&
                currTrail?.points[1] === currTrail?.points[3]
                    ? 0
                    : currTrail?.strokeWidth,
            opacity: currTrail?.render ? 1 : 0,
            stroke: currTrail?.color,
        },
        config: {
            duration: currTrail?.duration,
            easing: easings.easeInOutCubic,
        },
        reset: true,
    })

    useEffect(() => {}, [trails])

    return { lineAnimation }
}

export default useTrailsAnimation
