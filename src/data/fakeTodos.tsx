import {Itodo} from "../interfaces";

const fakeTodos : Itodo[] = [
    {
        id : 1,
        text : "Go to the gym",
        priority : 2,
        status : 2,
        deadLine : new Date(),
        infoText : "test info"
    },
    {
        id : 2,
        text : "Go shopping",
        priority : 1,
        status : 2,
        deadLine : new Date(),
        infoText : "test info"
    },
    {
        id : 3,
        text : "Do the dishes",
        priority : 2,
        status : 0,
        deadLine : new Date(1626291000000),
        infoText : "test info"
    },
    {
        id : 4,
        text : "Watch Game of Thrones",
        priority : 0,
        status : 1,
        deadLine : new Date(1825581987368),
        infoText : "test info"
    }
]

export default fakeTodos