import { Circle, Layer } from "react-konva";
import useDots from "@components/canvasElements/dots/dots.hooks";

const Dots = () => {
  const { dots, theme } = useDots();

  return (
    <>
      <Layer>
        {dots.map((dot, index) => (
          <Circle
            key={index}
            x={dot.x}
            y={dot.y}
            radius={0.5} // Radius of the dot
            fill={theme === "dark" ? "#666" : "#999"} // Color of the dot
          />
        ))}
      </Layer>
    </>
  );
};
export default Dots;
