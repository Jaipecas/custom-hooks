export const toDoReducer = (state = [], action = {}) => {
  switch (action.type) {
    case "Add":
      return [...state, action.payload];
    case "Remove":
      //siempre intentar no modificar el arreglo que existe si no devolver otro, el filter devuelve un nuevo array con los filtros especificados
      return state.filter((s) => s.id !== action.payload);
    case "Toggle":
      return state.map((toDo) => {
        if (toDo.id === action.payload) {
          return {
            ...toDo,
            done: !toDo.done,
          };
        }
        return toDo;
      });
    default:
      return state;
  }
};
