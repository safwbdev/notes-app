
import { TaskPropTypes } from "./types";
export const data: TaskPropTypes[] = [
    {
        id: 1,
        title: 'Doctor',
        content: 'Doctor Appointment',
        listContent: [],
        archived: true
    },
    {
        id: 2,
        title: 'Dentist',
        content: 'Meeting at School',
        listContent: [],
        archived: false
    },
    {
        id: 3,
        title: 'Football game',
        content: 'Meeting at the football field',
        listContent: [],
        archived: false
    },
    {
        id: 4,
        title: 'Office Meeting',
        content: 'Meeting at the office',
        listContent: [],
        archived: false
    },
    {
        id: 5,
        title: 'Shopping List',
        content: null,
        listContent: [
            {
                lId: 101,
                text: 'Bananas',
                completed: false
            },
            {
                lId: 102,
                text: 'Apples',
                completed: true
            },
            {
                lId: 103,
                text: 'Grapes',
                completed: false
            },
            {
                lId: 104,
                text: 'Milk',
                completed: true
            },
            {
                lId: 105,
                text: 'Eggs',
                completed: false
            },
        ],
        archived: false
    },
]