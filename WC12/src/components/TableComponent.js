import React from 'react';
import '../styles/tablecomponent.css';

function TableComponent({ onBoxClick }) {
    const boxData = [
        { label: 'Monday'},
        { label: 'Tuesday'},
        { label: 'Wednesday' },
        { label: 'Thursday' },
        { label: 'Friday' },
        { label: 'Saturday' },
        { label: 'Sunday' },
    ];

    const handleBoxClick = (index) => {
        const selectedBox = boxData[index];
        onBoxClick(selectedBox);
    };

    return (
        <div className="table-column">
            {boxData.map((box, index) => (
                <div
                    key={index}
                    className="table-box"
                    onClick={() => handleBoxClick(index)}
                >
                    {box.label}
                </div>
            ))}
        </div>
    );
}

export default TableComponent;
