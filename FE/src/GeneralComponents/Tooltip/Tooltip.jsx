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
