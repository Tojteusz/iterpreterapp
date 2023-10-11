import { animated } from '@react-spring/konva'
import { Layer, Text } from 'react-konva'
import useTurtleAnimation from '@components/canvasElements/turtle/turtle.animation'
import useTurtle from '@components/canvasElements/turtle/turtle.hooks'

const Turtle = () => {
    const { turtleAnimation, turtleBGAnimation } = useTurtleAnimation()
    const { turtleSize, tension, step, getTheme } = useTurtle()

    return (
        <>
            <Layer>
                <animated.Line
                    {...turtleBGAnimation}
                    tension={tension * 2}
                    closed
                    strokeWidth={0}
                />

                <animated.Line
                    {...turtleAnimation}
                    points={[
                        0,
                        turtleSize.height / 2,
                        turtleSize.width / 2,
                        -(turtleSize.height / 2),
                        -(turtleSize.width / 2),
                        -(turtleSize.height / 2),
                    ]}
                    fillLinearGradientStartPoint={{ x: 0, y: -(turtleSize.height / 2) }}
                    fillLinearGradientEndPoint={{ x: 0, y: turtleSize.height / 4 }}
                    fillLinearGradientColorStops={[
                        0,
                        `rgba(110, 32, 255,0)`,
                        1,
                        `rgba(110, 32,` + ` 255,1)`,
                    ]}
                    tension={tension}
                    closed
                    stroke={getTheme() === 'dark' ? 'white' : 'black'}
                    strokeWidth={0.5}
                />
            </Layer>
            <Layer>
                <Text text={step.toString()} fill={'white'} stroke={'white'} strokeWidth={1} />
            </Layer>
        </>
    )
}

export default Turtle
