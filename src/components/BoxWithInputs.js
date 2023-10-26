import React, { useState } from 'react';
import tasks, { addTask } from './tasks.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function BoxWithInputsAndButton() {
    const containerStyle = "border rounded p-3 m-3";
    const labelStyle = "mb-3";
    const inputStyle = "form-control mb-3";
    const buttonStyle = "btn btn-primary btn-lg btn-block mt-3"
    const selectStyle = "form-control mb-3";
    const timeSelectStyle = "form-control";

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [fromHour, setFromHour] = useState('00');
    const [fromMinute, setFromMinute] = useState('00');
    const [toHour, setToHour] = useState('00');
    const [toMinute, setToMinute] = useState('00');
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleInputChange = (e, inputNumber) => {
        if (inputNumber === 1) {
            setInput1(e.target.value);
        } else {
            setInput2(e.target.value);
        }
    };

    const handleSelectChange = (e) => {
        setSelectedDay(e.target.value);
    };

    const handleFromHourChange = (e) => {
        setFromHour(e.target.value);
    };

    const handleFromMinuteChange = (e) => {
        setFromMinute(e.target.value);
    };

    const handleToHourChange = (e) => {
        setToHour(e.target.value);
    };

    const handleToMinuteChange = (e) => {
        setToMinute(e.target.value);
    };

    const handleButtonClick = () => {
        console.log(selectedDay);
        addTask(selectedDay, input1, input2, [fromHour, fromMinute, toHour, toMinute]);
        console.log(tasks);
    };

    return (
        <div className={containerStyle}>
            <label className={labelStyle}>Select a Day:</label>
            <select className={selectStyle} value={selectedDay} onChange={handleSelectChange}>
                {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                ))}
            </select>
            <label className={labelStyle}>Task Name:</label>
            <input
                type="text"
                className={inputStyle}
                value={input1}
                onChange={(e) => handleInputChange(e, 1)}
            />
            <label className={labelStyle}>Task Description:</label>
            <input
                type="text"
                className={inputStyle}
                value={input2}
                onChange={(e) => handleInputChange(e, 2)}
            />
            <label className={labelStyle}>Time (From - To):</label>
            <div className="d-flex align-items-center">
                <select
                    className={timeSelectStyle}
                    value={fromHour}
                    onChange={handleFromHourChange}
                >
                    {hours.map((hour) => (
                        <option key={hour} value={hour}>
                            {hour}
                        </option>
                    ))}
                </select>
                :
                <select
                    className={timeSelectStyle}
                    value={fromMinute}
                    onChange={handleFromMinuteChange}
                >
                    {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                            {minute}
                        </option>
                    ))}
                </select>
                &nbsp;-&nbsp;
                <select
                    className={timeSelectStyle}
                    value={toHour}
                    onChange={handleToHourChange}
                >
                    {hours.map((hour) => (
                        <option key={hour} value={hour}>
                            {hour}
                        </option>
                    ))}
                </select>
                :
                <select
                    className={timeSelectStyle}
                    value={toMinute}
                    onChange={handleToMinuteChange}
                >
                    {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                            {minute}
                        </option>
                    ))}
                </select>
            </div>
            <button className={buttonStyle} onClick={handleButtonClick}>
                Add Task
            </button>
        </div>
    );
}

export default BoxWithInputsAndButton;
