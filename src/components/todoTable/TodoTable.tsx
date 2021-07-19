import React, {useContext, useEffect, useState} from "react";
import {MdKeyboardArrowLeft , MdKeyboardArrowRight , MdKeyboardArrowUp , MdKeyboardArrowDown , MdVisibility , MdModeEdit , MdDelete} from "react-icons/md";
import './todoTable.css'
import {IlistSort, Itodo, ItodoTable} from "../../interfaces";
import {Form, Table} from "react-bootstrap";
import RemoveTaskModal from "../removeTaskModal/removeTaskModal";
import TodoTrInsideTable from "../todoTrInsideTable/todoTrInsideTable";
import ViewTaskModal from "../viewTaskModal/viewTaskModal";
import EditTaskModal from "../editTaskModal/editTaskModal";
import {TodoListContext} from "../../contexts/todoContext";

const TodoTable:React.FC<ItodoTable> = (props) => {
    const todoDataContext = useContext(TodoListContext)

    const [todoData , setTodoData] = useState([...props.todoData])
    const [listSort , setListSort] = useState<IlistSort>({priority : 0 , status : 0 , deadLine : 0})
    const [editTodoId , setEditTodoID] = useState<number>(0)

    const [removeModalShow , setRemoveModalShow] = useState<boolean>(false)
    const [removeTodoId , setRemoveTodoID] = useState<number>(0)

    const [viewModalShow , setViewModalShow] = useState<boolean>(false)
    const [viewTodoId , setViewTodoID] = useState<number>(0)

    const [paginationValue , setPaginationValue] = useState<number>(0)
    const [pageCounts , setPageCounts] = useState<number>(1)
    const [pageNumber , setPageNumber] = useState<number>(1)

    const searchItems:Itodo[] | null = todoDataContext.todoList.data.filter((item:Itodo) => item.text.toLowerCase().includes(props.searchText.toLowerCase()))

    useEffect(()=> {
        searchItems ? setTodoData([...searchItems]) : setTodoData([...todoData])
        setListSort({priority : 0 , status : 0 , deadLine : 0})
    },[props.searchText])

    function sortChangeButton(sort : string){
        sort == "priority" &&
            (listSort.priority < 2 ?
                setListSort({priority : listSort.priority +1 , status : 0 , deadLine : 0}) :
                    setListSort({priority : 0 , status : 0 , deadLine : 0}))

        sort == "status" &&
            (listSort.status < 2 ?
                setListSort({priority : 0 , status : listSort.status + 1 , deadLine : 0}) :
                    setListSort({priority : 0 , status : 0 , deadLine : 0}))

        sort == "deadLine" &&
            (listSort.deadLine < 2 ?
                setListSort({priority : 0 , status : 0 , deadLine : listSort.deadLine+1}) :
                    setListSort({priority : 0 , status : 0 , deadLine : 0}))

    }

    useEffect(()=>{
        !searchItems && setTodoData([...props.todoData])
        listSort.status == 1 && setTodoData([...todoData.sort((a,b) => a.status - b.status)])
        listSort.status == 2 && setTodoData([...todoData.sort((a,b) => b.status - a.status)])

        listSort.priority == 1 && setTodoData([...todoData.sort((a,b) => a.priority - b.priority)])
        listSort.priority == 2 && setTodoData([...todoData.sort((a,b) => b.priority - a.priority)])

        listSort.deadLine == 1 && setTodoData([...todoData.sort((a,b) => a.deadLine.getTime() - b.deadLine.getTime())])
        listSort.deadLine == 2 && setTodoData([...todoData.sort((a,b) => b.deadLine.getTime() - a.deadLine.getTime())])
    },[listSort])

    useEffect(()=> {
        setTodoData([...props.todoData])
    },[props.todoData])

    function editTodo(id:number) {
        setEditTodoID(id)
        props.setEditModalShow(true)
    }

    function removeTodo(id:number) {
        setRemoveTodoID(id)
        setRemoveModalShow(true)
    }

    function viewTodo(id:number) {
        setViewTodoID(id)
        setViewModalShow(true)
    }

    function paginationChange(e:React.ChangeEvent<HTMLSelectElement>) {
        setPaginationValue(parseFloat(e.target.value))

    }

    useEffect(()=> {
        paginationValue!= 0 ? setPageCounts(todoData.length / paginationValue) : setPageCounts(1)
        setTodoData([...todoData])
    },[paginationValue])

    const pageNumberUp = () => {pageNumber*paginationValue < todoData.length && setPageNumber(pageNumber + 1)}
    const pageNumberDown = () => {pageNumber > 1 && setPageNumber(pageNumber - 1)}

    return (
        <>
            <Table bordered hover>
                <thead>
                <tr>
                    <th>Task</th>
                    <th className={"clickable text-center border-0"} onClick={() => sortChangeButton("priority")}>Priority
                        {listSort.priority == 0 && <i><MdKeyboardArrowLeft></MdKeyboardArrowLeft></i>}
                        {listSort.priority == 1 && <i><MdKeyboardArrowDown></MdKeyboardArrowDown></i>}
                        {listSort.priority == 2 && <i><MdKeyboardArrowUp></MdKeyboardArrowUp></i>}
                    </th>
                    <th className={"clickable text-center border-0"} onClick={() => sortChangeButton("status")}>Status
                        {listSort.status == 0 && <i><MdKeyboardArrowLeft></MdKeyboardArrowLeft></i>}
                        {listSort.status == 1 && <i><MdKeyboardArrowDown></MdKeyboardArrowDown></i>}
                        {listSort.status == 2 && <i><MdKeyboardArrowUp></MdKeyboardArrowUp></i>}
                    </th>
                    <th className={"clickable text-center border-0"} onClick={() => sortChangeButton("deadLine")}>DeadLine
                        {listSort.deadLine == 0 && <i><MdKeyboardArrowLeft></MdKeyboardArrowLeft></i>}
                        {listSort.deadLine == 1 && <i><MdKeyboardArrowDown></MdKeyboardArrowDown></i>}
                        {listSort.deadLine == 2 && <i><MdKeyboardArrowUp></MdKeyboardArrowUp></i>}
                    </th>
                    <th className={"text-center border-0"}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {todoData.map((item,index) => {
                    if (paginationValue != 0){
                        if ((pageNumber*paginationValue)-paginationValue <= index && index < pageNumber*paginationValue){
                            return <TodoTrInsideTable key={index} index={index} id={item.id} text={item.text} priority={item.priority} status={item.status} deadLine={item.deadLine} editTodo={editTodo} removeTodo={removeTodo} viewTodo={viewTodo}></TodoTrInsideTable>
                        }
                    }else {
                        return <TodoTrInsideTable key={index} index={index} id={item.id} text={item.text} priority={item.priority} status={item.status} deadLine={item.deadLine} editTodo={editTodo} removeTodo={removeTodo} viewTodo={viewTodo}></TodoTrInsideTable>
                    }

                })}

                </tbody>
            </Table>
            <div className={"w-100 d-flex justify-content-end"}>
                <div className={"pagination-div w-25 d-flex justify-content-around align-items-center"}>
                    <label htmlFor={"pagination-select"}>Rows per page :</label>
                    <Form.Control as="select" id={"pagination-select"} className={"border-0 border-bottom-3"} custom onChange={paginationChange}>
                        <option value={0}>All</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </Form.Control>
                    {paginationValue != 0 && <span>{(pageNumber*paginationValue)-paginationValue+1}-{pageNumber*paginationValue} / page : {pageNumber}</span>}
                    {paginationValue != 0 && (pageNumber <= 1 ? <MdKeyboardArrowLeft className={"display-6 text-black-50"}></MdKeyboardArrowLeft> : <MdKeyboardArrowLeft className={"display-6"} onClick={pageNumberDown}></MdKeyboardArrowLeft>)}
                    {paginationValue != 0 && (pageNumber*paginationValue >= todoData.length ? <MdKeyboardArrowRight className={"display-6 text-black-50"}></MdKeyboardArrowRight> : <MdKeyboardArrowRight className={"display-6"} onClick={pageNumberUp}></MdKeyboardArrowRight>)}
                </div>
            </div>

            <RemoveTaskModal removeModalShow={removeModalShow} setRemoveModalShow={setRemoveModalShow} todoData={props.todoData} todoId={removeTodoId} setTodoID={setRemoveTodoID}></RemoveTaskModal>
            <ViewTaskModal ViewModalShow={viewModalShow} setViewModalShow={setViewModalShow} todoId={viewTodoId} todoData={props.todoData}></ViewTaskModal>
            <EditTaskModal editModalShow={props.editModalShow} setEditModalShow={props.setEditModalShow} todoData={props.todoData} todoId={editTodoId}></EditTaskModal>
        </>
    )
}

export default TodoTable