import React from "react";

const DayTimer = () => {
    let dayToString = new Date().toLocaleString('en-us', {  weekday: 'long' })
    return (
        <div className="day_container">
            <h1 className="day">{dayToString}</h1>
        </div>
    )

}

export default DayTimer;