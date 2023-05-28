import React, { useState } from "react";
import { ChromePicker } from "react-color";

function ColorPickerExample(props) {
  const [color, setColor] = useState("#ffffff");

  const handleChange = (selectedColor) => {
    setColor(selectedColor.hex);
    props.changeColor(color);
  };

  return (
    <div>
      <ChromePicker color={color} onChange={handleChange} />
    </div>
  );
}

export default ColorPickerExample;