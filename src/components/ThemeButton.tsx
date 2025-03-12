import { useEffect, useState } from 'react'
import { Moon, Sun1 } from 'iconsax-react';

const ThemeButton = () => {

    const [theme, setTheme] = useState(localStorage.getItem("zadTheme") ? localStorage.getItem("zadTheme") : "light")
    const element = document.documentElement;
    useEffect(() => {
        if (theme === "dark") {
            // element.setAttribute("class", "dark")
            element.classList.add("dark")
            localStorage.setItem("zadTheme", "dark")
        } else {
            element.classList.remove("dark")
            localStorage.setItem("zadTheme", "light")
        }
    }, [element.classList, theme]);


    const changeTheme = () => {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }
    return (
        <div className="flex">
            <div className="relative p-1 rounded-lg flex justify-center items-center w-12 h-12">
                <Sun1
                    size="32"
                    variant='Bulk'
                    color="currentColor"
                    className={`absolute text-warning transition-all duration-300 cursor-pointer ${theme === "dark" ? "opacity-0" : "opacity-100"
                        }`}
                    onClick={changeTheme}
                />
                <Moon
                    size="32"
                    variant='Bulk'
                    color="currentColor"
                    className={`absolute text-light transition-all duration-300 cursor-pointer ${theme === "dark" ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={changeTheme}
                />
            </div>
        </div>)
}

export default ThemeButton