import {Layer, Stage} from 'react-konva';
import Dots from "./canvasElements/dots";
import Turtle from "./canvasElements/turtle";
import useCanvasStore from "../hooks/useCanvasStore";

interface CanvasProps {
    width: number;
    height: number;
}

const Canvas = ({width, height}: CanvasProps) => {
    const {grid, gridSize} = useCanvasStore();

    return (
        <Stage width={width}
               height={height}
        >
            <Layer>
                {grid && <Dots width={width}
                               height={height}
                               dotSpacing={gridSize}/>}
            </Layer>
            <Layer>
                <Turtle/>
            </Layer>
            {/*  <Layer>
                <Text text="Try clicking the rectangle"/>
                <ColoredRect/>
            </Layer>*/}
        </Stage>
    )
}

export default Canvas
/*


class ColoredRect extends React.Component {
    state = {flag: false};
    handleClick = () => this.setState((state) => ({flag: !state.flag}));

    render() {
        const {flag} = this.state;
        return (
            <Spring
                native
                from={{x: 0, shadowBlur: 0, fill: 'rgb(10,50,19)'}}
                to={{
                    x: flag ? 150 : 50,
                    shadowBlur: flag ? 25 : 5,
                    fill: flag ? 'seagreen' : 'hotpink',
                    width: flag ? 300 : 50,
                    height: flag ? 300 : 50,
                }}
            >
                {(props) => (
                    <animated.Rect {...props} y={50} onClick={this.handleClick}/>
                )}
            </Spring>
        );
    }
}
*/
