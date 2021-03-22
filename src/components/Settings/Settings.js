import React from 'react'
import {connect} from "react-redux";
import './Settings.scss'
import {addRow, changeZ, settingsM} from "../../store/action";

function Settings(props) {
    return (
        <section className='settings'>
            <div className='settings__input-wrapper'>
                <input className='settings__input'
                       name='settings_z' id='settings_z'
                       onInput={(ev) => {
                           props.changeZ(ev.target.value)
                       }}
                       defaultValue={props.Z}
                />
                <label className='settings__label' htmlFor='settings_z'>К-сть схожих елементів</label>
            </div>
            <button className='settings__btn' onClick={props.close}>Зберегти</button>
        </section>
    )
}

function mapStateToProps(state) {
    return {
        Z: state.Z
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeZ: (Z) => dispatch(changeZ(Z))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
