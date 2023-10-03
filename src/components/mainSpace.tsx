import Canvas from "./canvas";
import {useEffect, useRef, useState} from "react";
import {Card} from "@ui/card.tsx";
import useCanvasStore from "@hooks/useCanvasStore.tsx";
import useTurtleStore from "@hooks/useTurtleStore.tsx";


interface Space {
    width: number;
    height: number;
}

export const MainSpace = () => {
    const {gridSize} = useCanvasStore();

    // Create a ref object
    const elementRef = useRef(null);

    const {setTurtlePosition, size: turtleSize} = useTurtleStore();

    // State to hold the width of the element
    const [size, setSize] = useState<Space>({width: 0, height: 0});


    useEffect(() => {
        const fitToGridSize = (size: number) => {
            // 32 is the padding of the canvas
            // 2 is for last dot in grid to be visible
            return (Math.floor((size - 32) / gridSize) * gridSize) + 2
        }

        const handleTurtlePositionChange = () => {
            setTurtlePosition({
                x: Math.round(size.width / 2 / gridSize) * gridSize - (turtleSize.width / 2),
                y: Math.round(size.height / 2 / gridSize) * gridSize - (turtleSize.height / 2)
            })
        }
        if (!elementRef?.current) return;
        // Update the state with the width of the element when the component mounts

        setSize({
            width: fitToGridSize(elementRef.current["offsetWidth"]),
            height: fitToGridSize(elementRef.current["offsetHeight"])
        });

        handleTurtlePositionChange();
        // Optional: Update the width if the window is resized
        const handleResize = () => {
            const {current} = elementRef;
            if (!current) return;
            setSize({
                height: fitToGridSize(current["offsetHeight"]),
                width: fitToGridSize(current["offsetWidth"])
            });
            handleTurtlePositionChange();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [gridSize]);


    return (
        <Card
            ref={elementRef}
            className="flex flex-grow justify-center items-center overflow-hidden">
            <Canvas height={size.height}
                    width={size.width}/>
        </Card>
    )
}


