import React, {useState, useEffect} from "react";

const Timer = ({setGameOver}) => {
  const [timer, setTimer] = useState(300); // 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }else{
        setGameOver(true)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setGameOver]);
  let minutes = Math.floor(timer / 60);
  var seconds = timer - minutes * 60;
  return (
    <div>
      {timer > 0 ? (
        <div>
          {minutes}:{seconds}
        </div>
      ) : (
        <div>Times Up!</div>
      )}
    </div>
  );
};
export default Timer;
