import {ADD_M, CHANGE_M, CHANGE_N, CHANGE_Z, COUNT_MIDDLE, COUNT_SUM, CREATE_TABLE, SHOW_SIMILAR} from "./actionTypes";

export function changeN(N) {
    return {
        type: CHANGE_N,
        N
    }
}

export function changeM(M) {
    return {
        type: CHANGE_M,
        M
    }
}

let counter = 0

export function createTable(M, N) {
    return dispatch => {
        const tableData = []
        for (let i = 0; i < M; i++) {
            const row = []
            for (let j = 0; j < N; j++) {
                row.push({
                    id: counter,
                    value: Math.floor(Math.random() * 900) + 100,
                    isHighlighted: false,
                    percent: 0
                })
                counter++
            }
            tableData.push(row)
        }
        dispatch({
            type: CREATE_TABLE,
            data: tableData
        })
        dispatch(changeSumAndMiddle())
    }
}

export function addRow(M) {
    return (dispatch, getState) => {
        M += 1
        dispatch({
            type: CHANGE_M,
            M
        })
        const row = []
        for (let i = 0; i < getState().N; i++) {
            row.push({
                id: counter,
                value: Math.floor(Math.random() * 900) + 100,
                isHighlighted: false,
                percent: 0
            })
            counter++
        }
        dispatch({
            type: ADD_M,
            row
        })
        dispatch(changeSumAndMiddle())

    }
}

export function countSum() {
    return (dispatch, getState) => {
        const data = [...getState().tableData]
        const sum = data.map(el => {
            let countSum = 0
            el.forEach(el => {
                countSum += el.value
            })
            return countSum
        })
        dispatch({
            type: COUNT_SUM,
            sum
        })
    }
}

function changeSumAndMiddle() {
    return dispatch => {
        dispatch(countSum())
        dispatch(countMiddle())
    }
}

export function countMiddle() {
    return (dispatch, getState) => {
        const data = [...getState().tableData]
        const N = getState().N
        const middle = []
        for (let i = 0; i < N; i++) {
            const index = []
            data.forEach(row => {
                index.push(row[i].value)
            })
            let sum = 0
            index.forEach(el => {
                sum += el
            })
            middle.push(Math.floor(sum / index.length))
        }
        dispatch({
            type: COUNT_MIDDLE,
            middle
        })
    }
}

export function addOne(id) {
    return (dispatch, getState) => {
        const data = [...getState().tableData]
        data.forEach(row => {
            row.map(el => {
                if (el.id === id) {
                    el.value += 1
                }
                return el
            })
        })
        dispatch({
            type: CREATE_TABLE,
            data
        })
        dispatch(changeSumAndMiddle())
    }
}

export function showSimilar(value) {
    return (dispatch, getState) => {
        const Z = getState().Z
        const data = [...getState().tableData]
        let values = []
        data.forEach(row => {
            row.forEach(el => {
                values.push(Math.abs(value - el.value))
            })
        })
        values = clearSimilarFromExtra(values, Z)

        data.forEach(row => {
            row.forEach(el => {
                if (values.includes(Math.abs(value - el.value))) {
                    el.isHighlighted = true
                }
            })
        })
        dispatch({
            type: CREATE_TABLE,
            data
        })
    }
}

export function clearSimilarFromExtra(values, Z) {
    Z += 1
    while (values.length > Z) {
        let max = Math.max(...values);
        const index = values.indexOf(max);
        values.splice(index, 1);
    }
    return values
}

export function hideSimilar() {
    return (dispatch, getState) => {
        const data = [...getState().tableData]

        data.forEach(row => {
            row.forEach(el => {
                el.isHighlighted = false
            })
        })

        dispatch({
            type: CREATE_TABLE,
            data
        })
    }
}

export function countPercents(M_index) {
    return (dispatch, getState) => {
        const data = [...getState().tableData]
        data[M_index].forEach(el => {
            el.percent = Math.round((el.value / getState().sum[M_index]) * 100) + '%'
        })
        dispatch({
            type: CREATE_TABLE,
            data
        })

    }
}

export function hidePercents() {
    return (dispatch, getState) => {
        const data = [...getState().tableData]

        data.forEach(row => {
            row.forEach(el => {
                el.percent = 0
            })
        })

        dispatch({
            type: CREATE_TABLE,
            data
        })
    }
}

export function deleteRow(index) {
    return (dispatch, getState) => {
        dispatch(changeM(getState().M - 1))

        const data = [...getState().tableData]
        data.splice(index, 1)
        dispatch({
            type: CREATE_TABLE,
            data
        })
        dispatch(changeSumAndMiddle())
    }
}

export function changeZ(Z) {
    return dispatch => {
        dispatch({
            type: CHANGE_Z,
            Z
        })
    }
}
