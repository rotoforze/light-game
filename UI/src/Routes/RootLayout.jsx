import {Outlet} from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";

function RootLayout({children}) {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default RootLayout;