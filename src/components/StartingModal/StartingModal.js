import React from 'react'
import './StartingModal.scss'
import {connect} from "react-redux";
import {changeM, changeN} from "../../store/action";

function StartingModal(props) {
    return (
        <section className='starting'>
            <div className='starting__inputs'>
                <div className='starting__inputs-wrapper'>
                    <input type='number' onChange={(ev) => props.changeM(ev.target.value)} className='starting__input'
                           placeholder='3' name='M_size' id='M_size'/>
                    <label htmlFor='M_size' className='starting__label'>Введите кол-во строк М</label>
                </div>
                <div className='starting__inputs-wrapper'>
                    <input type='number' onChange={(ev) => props.changeN(ev.target.value)} className='starting__input'
                           placeholder='3' name='N_size' id='N_size'/>
                    <label htmlFor='N_size' className='starting__label'>Введите кол-во столбцов N</label>
                </div>
            </div>
            <button onClick={props.close} className='starting__btn'>Построить таблицу:</button>
        </section>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        changeN: (N) => dispatch(changeN(N)),
        changeM: (M) => dispatch(changeM(M))
    }
}

export default connect(null, mapDispatchToProps)(StartingModal)


