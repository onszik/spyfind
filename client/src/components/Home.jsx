import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
    const navigate = useNavigate();

    const startGame = () => {
        navigate('/game');
    };

    const [time, setTime] = useState(300);

    useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => setTime(time-1), 1000);
            return () => clearTimeout(timer);
        }
    }, [time])

    var timeM = Math.floor(time / 60);
    var timeS = time % 60;
    if (timeS <= 9) {
        timeS = '0' + timeS;
    }
    var formattedTime = timeM + ':' + timeS;

    return (
        <div>
            <h1>Welcome to SpyFind!</h1>
            <button onClick={startGame}>Start Game</button>
            <h2>Timer: {formattedTime}</h2>
        </div>
    );
}

export default Home;