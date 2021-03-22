import {ADD_M, CHANGE_M, CHANGE_N, CHANGE_Z, COUNT_MIDDLE, COUNT_SUM, CREATE_TABLE, SHOW_SIMILAR} from "./actionTypes";

const initialState = {
    M: 3,
    N: 3,
    tableData: [],
    sum: [],
    middle: [],
    Z: 3,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_N:
            return {
                ...state, N: action.N
            }
        case CHANGE_M:
            return {
                ...state, M: action.M
            }
        case CHANGE_Z:
            return {
                ...state, Z: action.Z
            }
        case CREATE_TABLE:
            return {
                ...state, tableData: action.data
            }
        case ADD_M:
            return {
                ...state, tableData: [...state.tableData, action.row]
            }
        case COUNT_SUM: {
            return {
                ...state, sum: action.sum
            }
        }
        case COUNT_MIDDLE: {
            return {
                ...state, middle: action.middle
            }
        }
        default:
            return state;
    }
}
