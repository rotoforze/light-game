import {useEffect} from "react";

function Cronometro({win, secs, setSecs, mins, setMins}) {
    const handleSecsChange = () => {
        if (secs >= 60) {
            setMins(mins + 1);
            setSecs(secs - 60);
        } else setSecs(secs + 1);
    }
    useEffect(() => {
        if (win) return;

        const id = setTimeout(() => {
            handleSecsChange();
        }, 1000);

        return () => clearTimeout(id);
    }, [secs]);

    return (
        <p className={"badge w-auto " + (win ? "bg-success" : "bg-warning")}>{mins > 9 ? mins : "0" + mins} : {secs > 9 ? secs : "0" + secs}</p>)
}

export default Cronometro;