import './addTaskModal.css'
import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

import {IaddTaskModal, Itodo} from "../../interfaces";
import moment from "jalali-moment";
import {TodoListContext} from "../../contexts/todoContext";


const AddTaskModal:React.FC<IaddTaskModal> = (props) => {
    const handleClose = () => props.setModalShow(false);

    const todoDataContext = useContext(TodoListContext)

    const [todoText , setTodoText] = useState<string>("")
    const [dtPicker, setDtPicker] = useState<any>()
    const [enDate,setEnDate] = useState<Date>(new Date())
    const [todoInfo,setTodoInfo] = useState<string>("")

    const [newTodo,setNewTodo] = useState<Itodo>({id:0 , text:"" , status:0 , priority:0 ,deadLine:enDate , infoText:""})

    function priorityChange(e:React.ChangeEvent<HTMLSelectElement>) {
        newTodo.priority = Number(e.target.value)
        setNewTodo({id:newTodo.id , text:newTodo.text , status:newTodo.status , priority:Number(e.target.value) ,deadLine:enDate , infoText:newTodo.infoText})
    }

    function statusChange(e:React.ChangeEvent<HTMLSelectElement>) {
        newTodo.status = Number(e.target.value)
        setNewTodo({id:newTodo.id , text:newTodo.text , status:Number(e.target.value) , priority:newTodo.priority ,deadLine:enDate , infoText:newTodo.infoText})
    }

    function todoTextChange(e:React.ChangeEvent<HTMLInputElement>) {
        setTodoText(e.target.value)
    }

    function todoInfoTextChange(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setTodoInfo(e.target.value)
    }

    useEffect(()=>{
        let stringDate : string = "0"
        if (dtPicker){
            stringDate = moment.from(`${dtPicker.year}/${dtPicker.month}/${dtPicker.day}`, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')
            setEnDate(new Date(new Date(stringDate).getTime()))
        }
    },[dtPicker])

    function handleAdd() {
        todoText != "" && todoDataContext.dispatchTodoList({type:'add' , payload : {id : Date.now() , text:todoText , status : newTodo.status , priority:newTodo.priority ,deadLine:enDate , infoText : todoInfo}})
        setTodoText("")
        setTodoInfo("")
        handleClose()
    }

    return (
        <Modal show={props.modalShow} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className={"modal-body-div d-flex flex-column justify-content-center align-items-center p-3"}>
                    <input type="text" placeholder={"Task Name"} className={"w-100 mb-5 p-1 rounded"} value={todoText} onChange={todoTextChange}/>
                    <div className={"w-100 d-flex justify-content-between mt-3 mb-5"}>

                        <Form.Control as="select" custom onChange={priorityChange}>
                            <option disabled={true} selected={true} hidden={true}>priority</option>
                            <option value={2}>High</option>
                            <option value={1}>Medium</option>
                            <option value={0}>Low</option>
                        </Form.Control>

                        <Form.Control as="select" custom onChange={statusChange}>
                            <option disabled={true} selected={true} hidden={true}>status</option>
                            <option value={0}>ToDO</option>
                            <option value={1}>Doing</option>
                            <option value={2}>Done</option>
                        </Form.Control>

                        <DtPicker
                            onChange={setDtPicker}
                            showWeekend
                            clearBtn
                            local="fa"
                            placeholder="Date"
                            inputClass='date-input'
                        />

                    </div>
                    <textarea placeholder={"Task Details"} className={"w-100 rounded p-2"} value={todoInfo} onChange={todoInfoTextChange}></textarea>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className={"w-100 d-flex align-items-center"}>
                    <div className={"w-75"}>
                        <Button variant="outline-dark" onClick={handleClose}>
                            Close
                        </Button>
                    </div>

                    <div className={"w-25 d-flex justify-content-end"}>
                        <Button variant="primary" onClick={handleAdd} className={"w-75"}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default AddTaskModal