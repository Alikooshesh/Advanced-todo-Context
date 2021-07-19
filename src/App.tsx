import React, {useContext, useEffect, useState} from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Header from "./components/header/header";
import TodoTable from "./components/todoTable/TodoTable";
import fakeTodos from "./data/fakeTodos";
import {IdataFilter, Itodo} from "./interfaces";
import Sidebar from "./components/sideBar/sidebar";
import {TodoListContext} from "./contexts/todoContext";

function App() {
    const todoDataContext = useContext(TodoListContext)

    const [tempData , setTempData] = useState<Itodo[]>(todoDataContext.todoList.data)
    const [addModalShow, setAddModalShow] = useState<boolean>(false)
    const [editModalShow, setEditModalShow] = useState<boolean>(false)
    const [searchText , setSearchText] = useState<string>("")
    const [sideBarShow , setSideBarShow] = useState<boolean>(false)
    const [dataFilter , setDataFilter] = useState<IdataFilter>({priority:3, status:3, deadLine:3})




    useEffect( ()=> {
        setTempData(todoDataContext.todoList.data)
        let _tempData = [...todoDataContext.todoList.data]

        if (dataFilter.priority !=3){
            _tempData = [..._tempData.filter(item => item.priority == dataFilter.priority)]
        }

        if (dataFilter.status != 3){
            _tempData = [..._tempData.filter(item => item.status == dataFilter.status)]
        }

        if (dataFilter.deadLine != 3){
            dataFilter.deadLine == 0 ? _tempData = [..._tempData.filter(item => new Date() > item.deadLine)] : _tempData = [..._tempData]
            dataFilter.deadLine == 1 ? _tempData = [..._tempData.filter(item => new Date() <= item.deadLine)] : _tempData = [..._tempData]
        }

        setTempData([..._tempData])

    },[dataFilter])

    useEffect(()=> {
        setDataFilter({priority:3, status:3, deadLine:3})
        setTempData(todoDataContext.todoList.data)
    },[todoDataContext.todoList.data])



  return (
    <div className={"w-100 h-100"}>
        {console.log(todoDataContext.todoList.data)}
        <Sidebar sideBarShow={sideBarShow} setSideBarShow={setSideBarShow} dataFilter={dataFilter} setDataFilter={setDataFilter}></Sidebar>
      <div className={"header"}>
        <Header setModalShow={setAddModalShow} modalShow={addModalShow} searchText={searchText} setSearchText={setSearchText} setSideBarShow={setSideBarShow}></Header>
      </div>
        <TodoTable todoData={tempData} searchText={searchText} editModalShow={editModalShow} setEditModalShow={setEditModalShow}></TodoTable>
        <table>
        </table>
    </div>
  );
}

export default App;
