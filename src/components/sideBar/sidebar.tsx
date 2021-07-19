import React, {Component, useEffect} from "react";
import {IdataFilter, IsideBar} from "../../interfaces";
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import {Form} from "react-bootstrap";

const Sidebar:React.FC<IsideBar> = (props)=> {
    function close() {
        props.setSideBarShow(false)
    }

    function priorityFilter(e:React.ChangeEvent<HTMLSelectElement>){
        props.setDataFilter({priority : parseFloat(e.target.value), status:props.dataFilter.status, deadLine : props.dataFilter.deadLine})
    }

    function statusFilter(e:React.ChangeEvent<HTMLSelectElement>) {
        props.setDataFilter({priority : props.dataFilter.priority, status: parseFloat(e.target.value), deadLine : props.dataFilter.deadLine})
    }

    function deadLineFilter(e:React.ChangeEvent<HTMLSelectElement>) {
        props.setDataFilter({priority : props.dataFilter.priority, status:props.dataFilter.status, deadLine : parseFloat(e.target.value)})
    }

    return (
        <div className={"d-flex"}>
            {console.log(props.dataFilter)}
            <OffCanvas
                width={300}
                transitionDuration={300}
                effect={"parallax"}
                isMenuOpened={props.sideBarShow}
                position={"right"}
            >
                <OffCanvasMenu className={'bg-light h-100 d-flex flex-column px-2'}>
                    <div className={"d-flex justify-content-between"}>
                        <h4>My To-Do Tasks</h4>
                        <h2 onClick={close}>X</h2>
                    </div>
                    <p className={"border-bottom"}>Filters</p>

                    <label>Priority</label>
                    <Form.Control as="select" custom className={"selectFilter mb-2"} onChange={priorityFilter}>
                        <option value={3}>All</option>
                        <option value={2}>High</option>
                        <option value={1}>Medium</option>
                        <option value={0}>Low</option>
                    </Form.Control>

                    <label>Status</label>
                    <Form.Control as="select" custom className={"selectFilter mb-2"} onChange={statusFilter}>
                        <option value={3}>All</option>
                        <option value={0}>ToDO</option>
                        <option value={1}>Doing</option>
                        <option value={2}>Done</option>
                    </Form.Control>

                    <label>DeadLine</label>
                    <Form.Control as="select" custom className={"selectFilter mb-2"} onChange={deadLineFilter}>
                        <option value={3}>All</option>
                        <option value={0}>Overdue</option>
                        <option value={1}>Future</option>
                    </Form.Control>

                </OffCanvasMenu>
            </OffCanvas>
        </div>
    );
}

export default Sidebar