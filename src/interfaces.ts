export interface Iheader{
    modalShow : boolean,
    setModalShow : Function,
    setSearchText: Function,
    searchText : string,
    setSideBarShow : Function
}

export interface IaddTaskModal{
    modalShow : boolean,
    setModalShow : Function,
}

export interface IeditTaskModal{
    editModalShow : boolean,
    setEditModalShow : Function,
    todoData : Itodo[],
    todoId : number
}

export interface IremoveTaskModal{
    removeModalShow : boolean,
    setRemoveModalShow : Function,
    todoData : Itodo[],
    todoId : number,
    setTodoID : Function
}

export interface IviewTaskModal{
    ViewModalShow : boolean,
    setViewModalShow : Function,
    todoId : number,
    todoData : Itodo[]
}

export interface Itodo{
    id : number,
    text : string,
    priority : number,
    status : number,
    deadLine : Date,
    infoText : string
}

export interface ItodoTable{
    todoData : Itodo[] ,
    searchText : string,
    editModalShow : boolean,
    setEditModalShow : Function,
}

export interface ItodoTr{
    index : number,
    text : string,
    priority : number,
    status : number,
    deadLine : Date,
    id : number,
    editTodo : Function,
    removeTodo : Function,
    viewTodo : Function
}

export interface IlistSort{
    priority : number,
    status : number,
    deadLine : number
}

export interface IdataFilter{
    priority : number,
    status : number,
    deadLine : number
}

export interface IsideBar{
    sideBarShow : boolean,
    setSideBarShow : Function,
    dataFilter : IdataFilter,
    setDataFilter : Function
}