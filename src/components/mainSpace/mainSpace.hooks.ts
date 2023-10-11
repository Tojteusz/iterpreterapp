import useBoundStore from '@stores/useBoundStore'
import { useEffect, useRef } from 'react'

const useMainSpace = () => {
    const { gridSize, setCanvasSize, trails, steps, currStep } = useBoundStore([
        'gridSize',
        'setCanvasSize',
        'trails',
        'steps',
        'currStep',
    ])
    const elementRef = useRef(null)

    useEffect(() => {
        const fitToGridSize = (size: number) => {
            // 32 is the padding of the canvas
            // 2 is for last dot in grid to be visible
            return Math.floor((size - 32) / gridSize) * gridSize + 2
        }

        const handleResize = () => {
            const { current } = elementRef
            if (!current) return
            setCanvasSize(
                fitToGridSize(current['offsetWidth']),
                fitToGridSize(current['offsetHeight'])
            )
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return { elementRef, trails, steps, currStep }
}

export default useMainSpace
