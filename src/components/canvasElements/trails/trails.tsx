import { Layer, Line } from 'react-konva'
import useBoundStore from '@stores/useBoundStore'
import { animated } from '@react-spring/konva'
import useTrailsAnimation from '@components/canvasElements/trails/trails.animation'

const Trails = () => {
    const { lineAnimation } = useTrailsAnimation()
    const { trails } = useBoundStore(['trails'])

    return (
        <>
            <Layer key={'layerLastTrail'}>
                <animated.Line
                    key={'line0'}
                    {...lineAnimation}
                    x={0}
                    y={0}
                    closed={false}
                    lineCap={'round'}
                />
            </Layer>
            {!!trails && (
                <Layer key={'layerTrails'}>
                    {trails
                        .slice(0, -1)
                        .map(
                            (trail, index) =>
                                trail.render && (
                                    <Line
                                        key={'line' + index}
                                        points={trail.points}
                                        stroke={trail.color}
                                        strokeWidth={trail.strokeWidth}
                                        lineCap={'round'}
                                    />
                                )
                        )}
                </Layer>
            )}
        </>
    )
}

export default Trails
