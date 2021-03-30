import React, {useEffect, useState} from 'react'
import './Table.scss'
import {connect} from "react-redux";
import {
    addOne,
    addRow,
    countMiddle,
    countPercents,
    countSum,
    createTable, deleteRow, hidePercents,
    hideSimilar,
    showSimilar
} from "../../store/action";
import deleteIcon from './img/delete.png'
import settings from './img/settings.png'
import Settings from "../Settings/Settings";

function Table(props) {

    useEffect(() => {
        props.getTableData(props.M, props.N)
    }, [])

    const [setting, changeSettings] = useState(null)

    const toggleSettings = (setting) => {
        setting ? changeSettings(null) : changeSettings(<Settings close={changeSettings.bind(this, null)}/>)
    }


    const genereteColumns = (data, M_index) => {

        return (
            <>
                {
                    data.map((el, index) => {
                        const classes = ['table__cell-container']
                        if (el.isHighlighted){
                            classes.push('highlighted')
                        }
                        return (
                            <td key={index}>
                                <div className={classes.join(' ')}>
                                    <div onMouseOver={props.showSimilar.bind(this, el.value)} row={M_index + 1}
                                         column={index + 1} value={el.value} percent={el.percent} id={el.id}
                                         onMouseLeave={props.hideSimilar}
                                         onClick={props.addOne.bind(this, el.id)}
                                         className='table__cell'
                                    >{el.percent === 0 ? el.value : el.percent}</div>
                                    <div className='table__cell-background' style={{height: `${el.percent}`}}></div>
                                </div>
                            </td>
                        )
                    })
                }
                <td onMouseOver={props.countPercents.bind(this, M_index)}
                    onMouseLeave={props.hidePercents}
                >
                    <div aria-label='сумма' className='table__sum'>{props.sum[M_index]}</div>
                </td>
            </>
        )
    }

    const genereteRows = (data) => {
        return (
            <>
                {data.map((el, index) => {
                    return (
                        <>
                            <div onClick={props.deleteRow.bind(this, index)} className='table__delete-icon'>✖</div>
                            <tr>
                                {genereteColumns(el, index)}
                            </tr>
                        </>
                    )
                })}
                {addMiddle()}
            </>
        )
    }

    const addMiddle = () => {
        const columns = [];

        for (let i = 1; i <= props.N; i++) {
            columns.push(i);
        }
        return columns.map((el, index) => {
            return (
                <td key={index}>
                    <div className='table__middle'>{props.middle[index]}</div>
                </td>
            )
        })
    }

    return (
        <div className='table'>
            <table>
                <tbody>
                {genereteRows(props.tableData)}
                </tbody>

            </table>
            <button className='table__add-row' onClick={() => {
                props.addRow(props.M)
            }}>Додати рядок
            </button>
            <div className='table__legend'>
                <div className='table__sum'></div>
                <div className='table__explanation'>&nbsp;- сума значень по рядку</div>
            </div>
            <div className='table__legend'>
                <div className='table__middle'></div>
                <div className='table__explanation'>&nbsp;- середнє арифметичне по стовпцю</div>
            </div>
            <img onClick={toggleSettings.bind(this, setting)} className='table__settings' src={settings}
                 alt='SETTINGS'/>
            {setting}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        N: state.N,
        M: state.M,
        tableData: state.tableData,
        sum: state.sum,
        middle: state.middle
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTableData: (M, N) => dispatch(createTable(M, N)),
        addRow: (M) => dispatch(addRow(M)),
        deleteRow: (index) => dispatch(deleteRow(index)),
        addOne: (id) => dispatch(addOne(id)),
        showSimilar: (value) => dispatch(showSimilar(value)),
        hideSimilar: () => dispatch(hideSimilar()),
        countPercents: (M_index) => dispatch(countPercents(M_index)),
        hidePercents: () => dispatch(hidePercents()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
