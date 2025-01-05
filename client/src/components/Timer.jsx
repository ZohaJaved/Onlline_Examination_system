import React from "react";
import { useEffect,useState } from "react";

function Timer(props){
    //formatted time useState to display remaining time in min and sec
    const [formattedTime, setFormattedTime] = useState("");
    function TimeFormatter(seconds){
        const minutes=Math.floor(seconds/60)
        const secondsRemaining=seconds%60;
        return `${minutes}:${secondsRemaining.toString().padStart(2, "0")}`;
    }
    useEffect(()=>{
        setFormattedTime(TimeFormatter(props.remainingTime))
    },[props.remainingTime]);

return (
    <div className="timer">
       <h5>Remaining Time : <label className="blink"> {formattedTime}</label></h5>
    </div>
  );
};

export default Timer;


