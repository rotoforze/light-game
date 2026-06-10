import {useState} from "react";
import '../../public/game.css'
import '../../public/game.css'

function GameBoard() {

    const [tablero, setTablero] = useState([
        false, true, false,
        false, false, false,
        true, false, false
    ]);

    const [win, setWin] = useState(false);

    const handleClick = (casilla) => {
        const nuevoTablero = [...tablero];
        const cols = 3;
        const fila = Math.floor(casilla / cols);
        const col = casilla % cols;

        nuevoTablero[casilla] = !tablero[casilla];

        // Arriba
        if (fila - 1 >= 0) nuevoTablero[casilla - cols] = !tablero[casilla - cols];
        // Abajo
        if (fila + 1 < cols) nuevoTablero[casilla + cols] = !tablero[casilla + cols];
        // Izquierda
        if (col - 1 >= 0) nuevoTablero[casilla - 1] = !tablero[casilla - 1];
        // Derecha
        if (col + 1 < cols) nuevoTablero[casilla + 1] = !tablero[casilla + 1];

        if (nuevoTablero.every(activo => activo)) setWin(true);

        setTablero(nuevoTablero);
    }

    return (
        <>
            {win && <h3 className={'text-center'}>¡Has ganado!</h3>}
            <div className="tablero">
                {tablero.map((activo, casilla) => {
                    return <div key={casilla} className={"casilla btn "+ (win ? 'btn-success' : activo ? 'btn-warning' : 'btn-dark')} onClick={() => {if (!win) handleClick(casilla)}}></div>
                })}
            </div>
        </>
    )
}

export default GameBoard;