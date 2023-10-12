import { Stage } from 'react-konva'
import useBoundStore from '@stores/useBoundStore'
import Dots from '@components/canvasElements/dots/dots'
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
            {grid && <Dots />}

            {/* <Trails />*/}
            <Turtle />
        </Stage>
    )
}

export default Canvas
