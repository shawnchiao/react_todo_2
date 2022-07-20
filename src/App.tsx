import React, { useReducer } from "react";

import TodoItem from "./components/TodoItem";
import IconButton from "./components/IconButton";
import { GrPowerReset } from "react-icons/gr";
import "./App.css";

interface StateType {
  todos: [];
  isHovered: boolean;
  inputText: string;
}
type ACTIONTYPE =
  | { type: "addItem"; payload: string }
  | { type: "deleteItem"; payload: number }
  | { type: "reset" }
  | { type: "hoverReset"; payload: boolean }
  | { type: "setInputText"; payload: string | null };

function App() {
  function init(initArray: any[]) {
    return {
      todos: initArray[0],
      isHovered: initArray[1],
      inputText: initArray[2]
    };
  }

  function reducer(state: StateType, action: ACTIONTYPE): any {
    switch (action.type) {
      case "addItem":
        return { todos: [...state.todos, action.payload] };
      case "deleteItem":
        return {
          todos: state.todos.filter((item, index) => {
            return index !== action.payload;
          })
        };
      case "reset":
        return init([[], false, ""]);
      case "hoverReset":
        return { todos: [...state.todos], isHover: action.payload };
      case "setInputText":
        return { todos: [...state.todos], inputText: action.payload };
      default:
        return { ...state };
    }
  }
  const [state, dispatch] = useReducer(reducer, [[], false, ""], init);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    dispatch({ type: "setInputText", payload: newValue });
  }

  function addItem(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: "addItem", payload: state.inputText });
    dispatch({ type: "setInputText", payload: "" });
  }

  return (
    <div className="container">
      <div className="heading">
        <div className="resetBtn">
          <IconButton
            onClick={() => dispatch({ type: "reset" })}
            onMouseEnter={() => dispatch({ type: "hoverReset", payload: true })}
            onMouseLeave={() =>
              dispatch({ type: "hoverReset", payload: false })
            }
            style={{ backgroundColor: state.isHovered && "#F24C4C" }}
          >
            <GrPowerReset />
          </IconButton>
        </div>
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
          {state.todos.map((eachItem: string, index: number) => (
            <TodoItem
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
