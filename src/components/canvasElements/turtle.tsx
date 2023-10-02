import {Line} from "react-konva";
import useTurtleStore from "../../hooks/useTurtleStore";

const Turtle = () => {
    const {size, position, tension} = useTurtleStore()

    return <Line
        x={position.x}
        y={position.y}
        points={[size.width / 2, 0, size.width, size.height, 0, size.height]}
        tension={tension}
        closed
        stroke="black"
        strokeWidth={0.25}
        fillLinearGradientStartPoint={{x: 0, y: 0}}
        fillLinearGradientEndPoint={{x: 0, y: 30}}
        fillLinearGradientColorStops={[0, 'rgb(142,59,252)', 1, 'rgb(59,0,134)']}
    />
}

export default Turtle