/**
 * Tooltip component that displays a tooltip when the mouse hovers over it.
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be displayed in the tooltip.
 * @param {React.Element} props.ItsElement - The element that triggers the tooltip.
 * @returns {React.Element} The Tooltip component.
 */
import react, { useState } from "react";
import { isValid } from "zod";

export const tooltip = ({ text, ItsElement }) => {
  const [Isvisible, setIsvisible] = useState(false);
  return (
    <div>
      onMouseEnter = {() => setIsvisible(true)}; onMouseaLeve ={" "}
      {() => setIsvisible(false)};
    </div>
  );
};
