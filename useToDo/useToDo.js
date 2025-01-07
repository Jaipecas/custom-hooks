import { useEffect, useReducer } from "react";
import { toDoReducer } from "./toDoReducer";

//es interesante sacar toda la logica de los componenetes a un customHook,
//asi los componentes quedan limpios de codigo

const init = () => {
  return JSON.parse(localStorage.getItem("toDos")) || [];
};

export const useToDo = () => {
  const [toDos, dispatch] = useReducer(toDoReducer, [], init);

  const onNewToDo = (toDo) => {
    const addTodo = {
      type: "Add",
      payload: toDo,
    };

    dispatch(addTodo);
  };

  const onRemoveToDo = (id) => {
    dispatch({
      type: "Remove",
      payload: id,
    });
  };

  //cambia el todo
  const onToggleToDo = (id) => {
    dispatch({
      type: "Toggle",
      payload: id,
    });
  };

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);



  return {
    toDos,
    onNewToDo,
    onRemoveToDo,
    onToggleToDo,
    totalToDo: toDos.length,
    pendingToDo: toDos.filter(todo => !todo.done).length
  };
};
