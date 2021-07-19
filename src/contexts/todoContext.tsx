import React, {useReducer, createContext, ReactChildren, ReactElement} from "react";
import fakeTodos from "../data/fakeTodos";
import {Itodo} from "../interfaces";

function dispatch(state:any , action:{type:string , payload:any}) {
    switch (action.type){
        case 'remove':
            return {...state , data:state.data.filter((item:Itodo) => item.id != action.payload)}
        case 'add':
            return {...state , data:[...state.data , action.payload]}
        case 'edit':
            return {...state , data:[...action.payload]}

        default:
            return state
    }
}
export const TodoListContext = createContext<any>("")


const TodoContextProvider:any = (props:{children:ReactElement}) => {
    const [todoList , dispatchTodoList] = useReducer(dispatch,{data:fakeTodos})
    const todoListContextValue = {todoList , dispatchTodoList}

    return(
        <TodoListContext.Provider value={todoListContextValue}>
            {props.children}
        </TodoListContext.Provider>
    )
}

export default TodoContextProvider