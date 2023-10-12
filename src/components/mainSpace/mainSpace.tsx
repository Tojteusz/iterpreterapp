import { Card } from '@ui/card'
import Canvas from '@components/canvas/canvas'
import useMainSpace from '@components/mainSpace/mainSpace.hooks'

export const MainSpace = () => {
    const { elementRef } = useMainSpace()

    return (
        <Card
            ref={elementRef}
            className="flex flex-grow justify-center items-center overflow-hidden"
        >
            <Canvas />
        </Card>
    )
}
