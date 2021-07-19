import './removeTaskModal.css'
import React, {useContext} from "react";
import {Button, Modal} from "react-bootstrap";
import 'react-calendar-datetime-picker/dist/index.css'

import {IremoveTaskModal} from "../../interfaces";
import {TodoListContext} from "../../contexts/todoContext";

const RemoveTaskModal:React.FC<IremoveTaskModal> = (props) => {
    const handleClose = () => props.setRemoveModalShow(false);

    const todoDataContext = useContext(TodoListContext)

    function handleRemove() {
        todoDataContext.dispatchTodoList({type:'remove' , payload: props.todoId})
        props.setTodoID(0)
        handleClose()
    }

    return (
        <Modal show={props.removeModalShow} onHide={handleClose}>
            <Modal.Header>
            </Modal.Header>
            <Modal.Body >
                <h4 className={"text-center"}>Are You Sure you want to delete task ?</h4>
            </Modal.Body>
            <Modal.Footer>
                <div className={"w-100 d-flex align-items-center"}>
                    <div className={"w-75"}>
                        <Button variant="outline-light" className={"text-info"} onClick={handleClose}>
                            CANCEL
                        </Button>
                    </div>

                    <div className={"w-25 d-flex justify-content-end"}>
                        <Button variant="primary" onClick={handleRemove} className={"w-75"}>
                            yes
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default RemoveTaskModal