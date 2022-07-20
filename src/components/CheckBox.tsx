import React, { MouseEventHandler } from "react";


interface CheckBoxProps {
  className?:string,
  onClick?:MouseEventHandler,
  children?:React.ReactNode
}

import "./CheckBox.css";
const Checkbox = (props:CheckBoxProps) => {
  return (
    <label className={`custom-checkbox ${props.className}`}>
      <input type="checkbox" onClick={props.onClick} />
      {props.children}
    </label>
  );
};

export default Checkbox;
