import React from "react";
import {Circle} from "react-konva";

interface Dot {
    x: number;
    y: number;
}

interface DotsProps {
    width: number;
    height: number;
    dotSpacing: number;
}

const Dots = ({width, height, dotSpacing = 20}: DotsProps) => {

    const dots: Dot[] = [];

    // Iterate over the width and height to place dots
    for (let y = 1; y < height; y += dotSpacing) {
        for (let x = 1; x < width; x += dotSpacing) {
            dots.push({x, y});
        }
    }

    return <>
        {dots.map((dot, index) => (
            <Circle
                key={index}
                x={dot.x}
                y={dot.y}
                radius={0.5} // Radius of the dot
                fill="#111" // Color of the dot
            />
        ))}
    </>
}
export default Dots