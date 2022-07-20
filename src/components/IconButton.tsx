import React, { MouseEventHandler } from "react";

import "./IconButton.css";

interface IconButtonProps {
  onClick?:MouseEventHandler,
  onMouseEnter?:MouseEventHandler,
  onMouseLeave?:MouseEventHandler,
  style?:React.CSSProperties,
  children?: React.ReactNode

}


const IconButton = (props:IconButtonProps):JSX.Element => {
  return (
    <button
      className="btn"
      onClick={props.onClick}
      type="button"
      style={props.style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </button>
  );
};

export default IconButton;
