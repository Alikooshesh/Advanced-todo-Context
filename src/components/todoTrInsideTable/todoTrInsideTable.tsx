import {MdDelete, MdModeEdit, MdVisibility} from "react-icons/md";
import React from "react";
import {ItodoTr} from "../../interfaces";
import moment from "jalali-moment";

const TodoTrInsideTable:React.FC<ItodoTr> = (props) => {
    return(
        <tr key={props.index}>
            <td>{props.text}</td>
            <td className={"text-center border-0"}>
                <span>
                    {props.priority == 0 && <span className={"status-td p-1 pr-2 px-2 bg-dark text-light"}>Low</span>}
                    {props.priority == 1 && <span className={"status-td p-1 pr-2 px-2 bg-warning text-light"}>Medium</span>}
                    {props.priority == 2 && <span className={"status-td p-1 pr-2 px-2 bg-danger text-light"}>High</span>}
                </span>
            </td>


            <td className={"text-center border-0"}>
                <span>
                    {props.status == 0 && <span className={"status-td p-1 pr-2 px-2 bg-warning text-light"}>To Do</span>}
                    {props.status == 1 && <span className={"status-td p-1 pr-2 px-2 bg-primary text-light"}>Doing</span>}
                    {props.status == 2 && <span className={"status-td p-1 pr-2 px-2 bg-success text-light"}>Done</span>}
                </span>
            </td>


            <td className={"text-center border-0"}>
                <span>
                    {props.deadLine <= new Date(Date.now()) ?
                        <span className={"deadLine-td p-1 pr-2 px-2 border-danger text-danger"}>{moment(`${props.deadLine.getFullYear()}/${props.deadLine.getMonth()+1}/${props.deadLine.getDate()}`, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</span> :
                        <span className={"deadLine-td p-1 pr-2 px-2 border-success text-ssuccess"}>{moment(`${props.deadLine.getFullYear()}/${props.deadLine.getMonth()+1}/${props.deadLine.getDate()}`, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</span>}
                </span>
            </td>

            <td className={"text-center border-0"}><div className={"d-flex justify-content-center"}>
                <div className={"w-50 d-flex justify-content-around"}>
                    <span className={"clickable text-secondary"} onClick={()=> props.viewTodo(props.id)}><MdVisibility></MdVisibility></span>
                    <span className={"clickable text-secondary"} onClick={()=> props.editTodo(props.id)}><MdModeEdit></MdModeEdit></span>
                    <span className={"clickable text-secondary"} onClick={() => props.removeTodo(props.id)}><MdDelete></MdDelete></span>
                </div>
            </div>
            </td>
        </tr>
    )
}

export default TodoTrInsideTable