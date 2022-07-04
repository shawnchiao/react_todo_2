import React, { useState, useReducer } from "react";

import ToDoItem from "./components/ToDoItem";
import IconButton from "./components/IconButton";
import { GrPowerReset } from "react-icons/gr";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, [[], false, ""], init);

  function init(initArray) {
    return {
      todos: initArray[0],
      isHover: initArray[1],
      inputText: initArray[2]
    };
  }

  function reducer(state, action) {
    switch (action.type) {
      case "addItem":
        return { todos: [...state.todos, action.payload.inputText] };
      case "deleteItem":
        return {
          todos: state.todos.filter((item, index) => {
            return index !== action.payload.id;
          })
        };
      case "reset":
        return init([[], false, ""]);
      case "hoverReset":
        return { todos: [...state.todos], isHover: action.payload.isHover };
      case "setInputText":
        return { todos: [...state.todos], inputText: action.payload.inputText };
      default:
        return { ...state };
    }
  }

  function handleChange(event) {
    const newValue = event.target.value;
    dispatch({ type: "setInputText", payload: { inputText: newValue } });
  }

  function addItem(e) {
    e.preventDefault();
    dispatch({ type: "addItem", payload: { inputText: state.inputText } });
    dispatch({ type: "setInputText", payload: { inputText: "" } });
  }

  console.log(state);
  return (
    <div className="container">
      <div className="heading">
        <IconButton
          onClick={() => dispatch({ type: "reset" })}
          onMouseEnter={() =>
            dispatch({ type: "hoverReset", payload: { isHover: true } })
          }
          onMouseLeave={() =>
            dispatch({ type: "hoverReset", payload: { isHover: false } })
          }
          style={{ backgroundColor: state.isHover && "#F24C4C" }}
        >
          <GrPowerReset />
        </IconButton>
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <form onSubmit={addItem}>
          <input onChange={handleChange} type="text" value={state.inputText} />
          <button type="submit">
            <span>Add</span>
          </button>
        </form>
      </div>
      <div>
        <ul>
          {state.todos.map((eachItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={eachItem}
              dispatch={dispatch}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
