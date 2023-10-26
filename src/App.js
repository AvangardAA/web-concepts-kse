import React, { useState } from 'react';
import TableComponent from './components/TableComponent';
import BoxWithTable from './components/BoxWithTable';
import BoxWithInputsAndButton from './components/BoxWithInputs';
import tasks from "./components/tasks";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [selectedBoxContent, setSelectedBoxContent] = useState(null);

    const handleBoxClick = (label) => {
        //console.log("Selected Box Content:", label);
        setSelectedBoxContent(label);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-column align-items-center">
                        <h2>Week planner:</h2>
                        <TableComponent onBoxClick={handleBoxClick} />
                    </div>
                </div>
                <div className="col d-flex flex-column">
                    <h2>Detailed View:</h2>
                    <BoxWithTable tasks={tasks} selectedDay={selectedBoxContent?.label} />
                    <BoxWithInputsAndButton />
                </div>
            </div>
        </div>
    );
}

export default App;
