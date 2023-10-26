const tasks = {
    Monday: [{'taskName': "kse", "taskDescription": "kse"}],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
};

function composeTime(hour, minute) {
    const hourString = hour.toString().padStart(2, '0');
    const minuteString = minute.toString().padStart(2, '0');
    return `${hourString}:${minuteString}`;
}


const maxTasksPerDay = 5;

const addTask = (day, taskName, taskDescription, timeSett) => {
    if (tasks[day].length < maxTasksPerDay) {
        tasks[day].push({
            taskName: taskName,
            taskDescription: taskDescription,
            timeFrom: composeTime(timeSett[0], timeSett[1]),
            timeTo: composeTime(timeSett[2], timeSett[3]),
        });
    } else {
        console.log(`Maximum number of tasks reached for ${day}.`);
    }
};

export default tasks;
export {addTask};