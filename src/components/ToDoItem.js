import React from "react";
import { BsBookmark, BsBookmarkStarFill } from "react-icons/bs";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox
} from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import audio from "./clickSound.wav";
import CheckBox from "./CheckBox";
import IconButton from "./IconButton";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";

function ToDoItem(props) {
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

  function space() {
    props.text.length;
  }

  return (
    <div>
      <CheckBox>
        <BsBookmark size="20px" className="unchecked" />
        <BsBookmarkStarFill size="20px" className="checked" />
      </CheckBox>
      <CheckBox
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
          props.dispatch({ type: "deleteItem", payload: { id: props.id } })
        }
      >
        <AiFillDelete size="1.2rem" />
      </IconButton>

      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default ToDoItem;
