import './editTaskModal.css'
import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

import {IeditTaskModal, Itodo} from "../../interfaces";
import moment from "jalali-moment";
import {TodoListContext} from "../../contexts/todoContext";

const EditTaskModal:React.FC<IeditTaskModal> = (props) => {
    const handleClose = () => props.setEditModalShow(false);

    const todoDataContext = useContext(TodoListContext)

    const [todoText , setTodoText] = useState<string>("")
    const [dtPicker, setDtPicker] = useState<any>()
    const [enDate,setEnDate] = useState<Date>(new Date())
    const [todoInfo,setTodoInfo] = useState<string>("")

    const [todoTaked, setTodoTaked] = useState<Itodo>({
        id: 0,
        text: "",
        status: 0,
        priority: 0,
        deadLine: new Date(),
        infoText: ""
    })

    const [todoTakedDate,setTodoTakedDate] = useState({year:1400 , month:7, day:5})

    let newTodo:Itodo = {id:0 , text:"" , status:0 , priority:0 ,deadLine:enDate , infoText:""}

    function priorityChange(e:React.ChangeEvent<HTMLSelectElement>) {
        newTodo.priority = Number(e.target.value)
        setTodoTaked({id: todoTaked.id , text: todoTaked.text , status: todoTaked.status , priority:Number(e.target.value) , deadLine:todoTaked.deadLine , infoText : todoTaked.infoText})
    }

    function statusChange(e:React.ChangeEvent<HTMLSelectElement>) {
        newTodo.status = Number(e.target.value)
        setTodoTaked({id: todoTaked.id , text: todoTaked.text , status: Number(e.target.value) , priority:todoTaked.priority , deadLine:todoTaked.deadLine , infoText : todoTaked.infoText})
    }

    function todoTextChange(e:React.ChangeEvent<HTMLInputElement>) {
        setTodoText(e.target.value)
        setTodoTaked({id: todoTaked.id , text: e.target.value , status: todoTaked.status , priority:todoTaked.priority , deadLine:todoTaked.deadLine , infoText : todoTaked.infoText})
    }

    function todoInfoTextChange(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setTodoInfo(e.target.value)
        setTodoTaked({id: todoTaked.id , text: todoTaked.text , status: todoTaked.status , priority:todoTaked.priority , deadLine:todoTaked.deadLine , infoText : e.target.value})
    }

    useEffect(()=>{
        let stringDate : string = "0"
        if (dtPicker){
            stringDate = moment.from(`${dtPicker.year}/${dtPicker.month}/${dtPicker.day}`, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')
            setEnDate(new Date(new Date(stringDate).getTime()))
            setTodoTaked({id: todoTaked.id , text: todoTaked.text , status: todoTaked.status , priority:todoTaked.priority , deadLine:new Date(new Date(stringDate).getTime()) , infoText : todoTaked.infoText})
        }
    },[dtPicker])

    function handleEdit() {
        const tempTodoData:Itodo[] = [...props.todoData]
        const editIndex:number = tempTodoData.findIndex(item => item.id == props.todoId)
        tempTodoData.splice(editIndex,1,todoTaked)
        todoDataContext.dispatchTodoList({type:'edit' , payload:[...tempTodoData]})
        handleClose()
    }

    useEffect(()=>{
        if (props.todoId){
            props.todoId && setTodoTaked(todoDataContext.todoList.data.filter((item:Itodo) => item.id == props.todoId)[0])
            props.todoId && setTodoText(todoDataContext.todoList.data.filter((item:Itodo) => item.id == props.todoId)[0].text)
            props.todoId && setTodoInfo(todoDataContext.todoList.data.filter((item:Itodo) => item.id == props.todoId)[0].infoText)

            let tempTaked:any
            props.todoId ? tempTaked = todoDataContext.todoList.data.filter((item:Itodo) => item.id == props.todoId)[0] : tempTaked = ""

            let date : any
            date= moment(`${tempTaked.deadLine.getFullYear()}/${tempTaked.deadLine.getMonth()+1}/${tempTaked.deadLine.getDate()}`, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD').split("/")
            date = {year: date[0], month: date[1], day: date[2]}
            setTodoTakedDate(date)
        }

    },[props.todoId])



    return (
        <Modal show={props.editModalShow} onHide={handleClose}>
            {console.log(props.todoId)}
            <Modal.Header>
                <Modal.Title>New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className={"modal-body-div d-flex flex-column justify-content-center align-items-center p-3"}>
                    <input type="text" placeholder={"Task Name"} className={"w-100 mb-5 p-1 rounded"} value={todoText} onChange={todoTextChange}/>
                    <div className={"w-100 d-flex justify-content-between mt-3 mb-5"}>

                        <Form.Control as="select" custom onChange={priorityChange} value={todoTaked.priority}>
                            <option disabled={true}>priority</option>
                            <option value={2}>High</option>
                            <option value={1}>Medium</option>
                            <option value={0}>Low</option>
                        </Form.Control>

                        <Form.Control as="select" custom onChange={statusChange} value={todoTaked.status}>
                            <option disabled={true}>status</option>
                            <option value={0}>ToDO</option>
                            <option value={1}>Doing</option>
                            <option value={2}>Done</option>
                        </Form.Control>

                        <DtPicker
                            onChange={setDtPicker}
                            initValue={todoTakedDate}
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
                        <Button variant="primary" className={"w-75"} onClick={handleEdit}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default EditTaskModal