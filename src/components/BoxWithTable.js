import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BoxWithTable({ tasks, selectedDay }) {
    const boxStyle = "border rounded p-3 m-3";
    const rowStyle = "border p-3 m-3";

    if (selectedDay && tasks[selectedDay]) {
        return (
            <div className={boxStyle}>
                {tasks[selectedDay].map((task, index) => (
                    <div className={rowStyle} key={index}>
                        <div>Task name: {task.taskName}</div>
                        <div>Task description: {task.taskDescription}</div>
                        <div>Do from: {task.timeFrom}</div>
                        <div>Do till: {task.timeTo}</div>
                    </div>
                ))}
            </div>
        );
    } else {
        return <div className={boxStyle}>No tasks for the selected day.</div>;
    }
}

export default BoxWithTable;
