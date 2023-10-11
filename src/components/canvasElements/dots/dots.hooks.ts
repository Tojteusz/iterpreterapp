import useBoundStore from "@stores/useBoundStore";
import { useTheme } from "@components/theme-provider";
import { Dot } from "@components/canvasElements/dots/dots.types";

const useDots = () => {
  const {
    canvasSize: { width, height },
    gridSize,
  } = useBoundStore(["canvasSize", "gridSize"]);
  const { theme } = useTheme();

  const dots: Dot[] = [];

  // Iterate over the width and height to place dots
  for (let y = 1; y < height; y += gridSize) {
    for (let x = 1; x < width; x += gridSize) {
      dots.push({ x, y });
    }
  }

  return {
    theme,
    dots,
  };
};
export default useDots;
