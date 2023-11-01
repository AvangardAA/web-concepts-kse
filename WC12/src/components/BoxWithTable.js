import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BoxWithTable({ tasks, selectedDay }) {
    const boxStyle = "border rounded p-3 m-3";
    const rowStyle = "border p-3 m-3";

    const handleBoxClickToDel = (selectedDay, index) =>
    {
        tasks[selectedDay].splice(index, 1);
    }

    if (selectedDay && tasks[selectedDay]) {
        return (
            <div className={boxStyle}>
                {tasks[selectedDay].map((task, index) => (
                    <div className={rowStyle} key={index}>
                        <div>Task name: {task.taskName}</div>
                        <div>Task description: {task.taskDescription}</div>
                        <div>Do from: {task.timeFrom}</div>
                        <div>Do till: {task.timeTo}</div>
                        <button onClick={() => handleBoxClickToDel(selectedDay, index)}>Delete</button>
                    </div>
                ))}
            </div>
        );
    } else {
        return <div className={boxStyle}>No tasks for the selected day.</div>;
    }
}

export default BoxWithTable;
