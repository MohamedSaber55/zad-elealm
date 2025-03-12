import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
            </header>
            <main className="flex-1" style={{ height: "calc(100vh - 80px)" }}>
                <Outlet />
            </main>
            <footer>{/* Footer content */}</footer>
        </div>
    )
}

export default Layout