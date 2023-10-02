import Canvas from "./canvas";
import {useEffect, useRef, useState} from "react";
import {Card} from "@ui/card.tsx";
import useCanvasStore from "@hooks/useCanvasStore.tsx";


interface Space {
    width: number;
    height: number;
}

export const MainSpace = () => {
    const {gridSize} = useCanvasStore();

    // Create a ref object
    const elementRef = useRef(null);

    // State to hold the width of the element
    const [size, setSize] = useState<Space>({width: 0, height: 0});
    useEffect(() => {
        const fitToGridSize = (size: number) => {
            console.log(size, gridSize, Math.floor(size / gridSize) * gridSize);
            return Math.floor(size / gridSize) * gridSize
        }
        if (!elementRef?.current) return;
        // Update the state with the width of the element when the component mounts


        setSize({
            width: fitToGridSize(elementRef.current["offsetWidth"]),
            height: fitToGridSize(elementRef.current["offsetHeight"])
        });

        // Optional: Update the width if the window is resized
        const handleResize = () => {
            const {current} = elementRef;
            if (!current) return;
            setSize({
                height: fitToGridSize(current["offsetHeight"]),
                width: fitToGridSize(current["offsetWidth"])
            });
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


