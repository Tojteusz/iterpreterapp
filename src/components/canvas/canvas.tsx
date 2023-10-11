import { Stage } from 'react-konva'
import useBoundStore from '@stores/useBoundStore'
import Dots from '@components/canvasElements/dots/dots'
import Trails from '@components/canvasElements/trails/trails'
import Turtle from '@components/canvasElements/turtle/turtle'
import useAnimation from '@hooks/useAnimation'

const Canvas = () => {
    const {
        canvasSize: { width, height },
        grid,
    } = useBoundStore(['canvasSize', 'grid'])
    useAnimation()

    return (
        <Stage width={width} height={height}>
            <Trails />
            {grid && <Dots />}
            <Turtle />
        </Stage>
    )
}

export default Canvas
