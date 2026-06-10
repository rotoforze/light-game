import {useState} from "react";
import '../../public/game.css'
import '../../public/game.css'
import {difficulties} from "../utils/difficulties.js";
import Cronometro from "../Components/Cronometro.jsx";

function GameBoard() {

    const [tablero, setTablero] = useState(generateLevel(0));
    const [diff, setDiff] = useState(0);
    const [win, setWin] = useState(false);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);

    const handleClick = (casilla) => {
        const nuevoTablero = handlePlay([...tablero], casilla, diff)

        if (nuevoTablero.every(activo => activo)) setWin(true);

        setTablero(nuevoTablero);
    }

    function handleDifficulty(difficulty) {
        setDiff(difficulty);
    }

    function handleNewBoard() {
        setWin(false);
        setSecs(0);
        setMins(0);
        setTablero(generateLevel(diff));
    }

    return (
        <>
            <div className={"d-flex gap-2 justify-content-center align-items-center"}>
                <div className={"d-flex flex-column align-items-center"}>
                    <label className={"form-label"}>Dificultad</label>
                    <select className={"form-select"} onChange={(e) => handleDifficulty(e.target.value)}>
                        {
                            difficulties.map((i) => <option key={i.id} value={i.id}>{i.name.es}</option>)
                        }
                    </select>
                </div>
                <button className={"btn btn-primary"} onClick={(e) => handleNewBoard()}>Generar</button>
            </div>
            <div className={"d-flex flex-column align-items-center mt-4"}>
                {tablero && <Cronometro win={win} secs={secs} setSecs={setSecs} mins={mins} setMins={setMins}/>}
            </div>
            {
                win && <h3 className={'text-center'}>¡Has ganado!</h3>
            }
            {
                (tablero && <div className="tablero">
                    {tablero && tablero.map((activo, casilla) => {
                        return <div key={casilla}
                                    className={"casilla btn " + (win ? 'btn-success' : activo ? 'btn-warning' : 'btn-dark')}
                                    onClick={() => {
                                        if (!win) handleClick(casilla)
                                    }}></div>
                    })}
                </div>) || <h4 className={"text-center"}>El nivel no ha podido generarse.</h4>
            }
        </>
    )
}

function generateLevel(dificultad) {
    const diffInfo = difficulties[dificultad];
    let tablero = [];

    for (let i = 0; i < diffInfo.rows * 3; i++) {
        tablero.push(true);
    }
    const generatedNums = [];
    const genNum = () => {
        const n = Math.floor(Math.random()*diffInfo.rows*3);
        if (!generatedNums.includes(n)) {
            generatedNums.push(n);
            return n;
        } else genNum();
    }
    for (let i = 0; i < diffInfo.movesToGenerate; i++) {
        tablero = handlePlay([...tablero], genNum(), dificultad);
        console.log(tablero);
    }
    return tablero;
}

function handlePlay(tablero, casilla, dificultad) {
    const nuevoTablero = [...tablero];
    const cols = 3;
    const fila = difficulties[dificultad].rows;
    const col = casilla % cols;

    nuevoTablero[casilla] = !tablero[casilla];

    // Arriba
    if (fila - 1 >= 0) nuevoTablero[casilla - cols] = !tablero[casilla - cols];
    // Abajo
    if (casilla % 3 <= fila && casilla + 3 < nuevoTablero.length) nuevoTablero[casilla + 3] = !tablero[casilla + 3];
    // Izquierda
    if (col - 1 >= 0) nuevoTablero[casilla - 1] = !tablero[casilla - 1];
    // Derecha
    if (col + 1 < cols) nuevoTablero[casilla + 1] = !tablero[casilla + 1];

    return nuevoTablero;
}

export default GameBoard;