import React from "react";
import { BsBookmark, BsBookmarkStarFill } from "react-icons/bs";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const audio =require("./clickSound.wav");
import CheckBox from "./CheckBox";
import IconButton from "./IconButton";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";

import "./todoItem.css";

interface todoPropsType{
  key:number,
  id:number,
  text:string,
  dispatch:Function
}


function ToDoItem(props:todoPropsType):JSX.Element {
  const [clicked, setClicked] = React.useState(false);

  function cross() {
    setClicked((prevValue) => {
      return !prevValue;
    });
  }

  function playSound() {
    const sound = new Audio(audio);
    sound.play();
  }

  return (
    <div className="todoItem">
      <CheckBox>
        <BsBookmark size="20px" className="unchecked" />
        <BsBookmarkStarFill size="20px" className="checked" />
      </CheckBox>
      <CheckBox
        className="spaceItemContent"
        onClick={() => {
          !clicked && playSound();
          cross();
        }}
      >
        <MdOutlineCheckBoxOutlineBlank className="unchecked " />
        <CheckBoxRoundedIcon fontSize="medium" className="checked tick" />

        <li style={{ textDecoration: clicked ? "line-through" : "none" }}>
          {props.text}
        </li>
      </CheckBox>

      <IconButton
        onClick={() =>
          props.dispatch({ type: "deleteItem", payload: props.id })
        }
      >
        <AiFillDelete size="1.2rem" />
      </IconButton>

      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default ToDoItem;
