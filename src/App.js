import React, {useEffect, useState} from 'react'
import StartingModal from "./components/StartingModal/StartingModal";
import Table from "./components/Table/Table";

function App() {
    const [modalStart, toggleModalStart] = useState(null)
    useEffect(() => {
        toggleModalStart(<StartingModal close={() => {
            toggleModalStart(null)
        }}/>)
    }, [])

    return (
        <div>
            {modalStart}
            {modalStart ? null : <Table/>}
        </div>
    );
}

export default App;
