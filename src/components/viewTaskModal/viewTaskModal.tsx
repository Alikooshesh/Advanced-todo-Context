import './viewTaskModal.css'
import React, {useContext, useEffect, useState} from "react";
import {Button,Modal} from "react-bootstrap";

import {Itodo, IviewTaskModal} from "../../interfaces";
import moment from "jalali-moment";
import {TodoListContext} from "../../contexts/todoContext";

const ViewTaskModal:React.FC<IviewTaskModal> = (props) => {
    const handleClose = () => props.setViewModalShow(false);

    const todoDataContext = useContext(TodoListContext)

    const [item,setItem] = useState<Itodo>({id:0, priority:0, status:0, deadLine:new Date(), text:"", infoText:""})

    useEffect(()=> {
        props.todoId && setItem(todoDataContext.todoList.data.filter((item:Itodo) => item.id == props.todoId)[0])
    },[props.ViewModalShow])

    return (
        <Modal show={props.ViewModalShow} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>View Task</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className={"modal-body-div d-flex flex-column justify-content-center align-items-center p-3"}>
                    <p className={"w-100 mb-5 p-1 rounded"}>{item.text}</p>
                    <div className={"w-100 d-flex justify-content-between mt-3 mb-5  text-center"}>
                        <p className={"w-25"} id={"priority"}>
                            {item.priority == 0 && <span className={"p-1 pr-2 px-2"}>Low</span>}
                            {item.priority == 1 && <span className={"p-1 pr-2 px-2"}>Medium</span>}
                            {item.priority == 2 && <span className={"p-1 pr-2 px-2"}>High</span>}
                        </p>

                        <p className={"w-25"} id={"status"}>
                            {item.status == 0 && <span className={"p-1 pr-2 px-2"}>To Do</span>}
                            {item.status == 1 && <span className={"p-1 pr-2 px-2"}>Doing</span>}
                            {item.status == 2 && <span className={"p-1 pr-2 px-2"}>Done</span>}
                        </p>
                        <p className={"w-25"}>{moment(`${item.deadLine.getFullYear()}/${item.deadLine.getMonth()+1}/${item.deadLine.getDate()}`, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</p>
                    </div>
                    <div className={"todoInfo w-100 rounded p-2"}>{item.infoText}</div>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className={"w-100 d-flex align-items-center"}>
                    <div className={"w-75"}>
                        <Button variant="outline-dark" onClick={handleClose}>
                            Close
                        </Button>
                    </div>

                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewTaskModal