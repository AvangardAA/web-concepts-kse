import React, { useState } from 'react';
import '../styles/tablecomponent.css';

function TableComponent({ onBoxClick, taskData }) {
    const boxData = [
        { label: 'Monday' },
        { label: 'Tuesday' },
        { label: 'Wednesday' },
        { label: 'Thursday' },
        { label: 'Friday' },
        { label: 'Saturday' },
        { label: 'Sunday' },
    ];

    const [selectedDayIndex, setSelectedDayIndex] = useState(null);

    const handleBoxClick = (index) => {
        const selectedBox = boxData[index];
        onBoxClick(selectedBox);

        setSelectedDayIndex(index);
    };

    return (
        <div className="table-column">
            {boxData.map((box, index) => (
                <div
                    key={index}
                    className={`table-box ${index === selectedDayIndex ? 'highlighted' : ''}`}
                    onClick={() => handleBoxClick(index)}
                >
                    {box.label} ({taskData[box.label].length} tasks, dur: {taskData[box.label].length*30} mins)
                </div>
            ))}
        </div>
    );
}

export default TableComponent;
