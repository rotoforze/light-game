import WelcomePage from "./Routes/WelcomePage.jsx";
import GameBoard from "./Routes/GameBoard.jsx";
import RootLayout from "./Routes/RootLayout.jsx";
import ErrorPage from "./Routes/ErrorPage.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {UserProvider} from "./Context/UserContext.jsx";

function App() {
    const router = createBrowserRouter([{
        path: '/', element: <RootLayout/>, errorElement: <ErrorPage/>,

        children: [

            {path: '/', element: <WelcomePage />},
            {path: '/game', element: <GameBoard />}

        ]
    }]);

    return (<UserProvider>
        <RouterProvider router={router}/>
    </UserProvider>)
}

export default App
