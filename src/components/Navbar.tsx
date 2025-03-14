import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { ArrowDown2, ArrowUp2, CloseSquare, Menu, Notification, ProfileCircle } from "iconsax-react";
// import Language from "../utils/i18n";
import { useEffect, useRef, useState } from "react";
import logo from "../../public/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/slices/auth";
interface Link {
    name: string;
    url: string;
}
const Navbar = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const location = useLocation();
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const dropdownRef = useRef<HTMLDivElement>(null);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const state = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            //     setIsDropdownOpen(false);
            // }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // const changeLanguage = (language: string) => {
    //     Language.changeLanguage(language);
    //     setIsDropdownOpen(false);
    // };

    // const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleProfile = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const links: Link[] = [
        { name: t("navbar.home"), url: "/home" },
        { name: t("navbar.courses"), url: "/my-courses" },
        { name: t("navbar.favorites"), url: "/favorites" },
        { name: t("navbar.certificates"), url: "/certifications" }
    ];
    const handleLogout = () => {
        dispatch(logout());
    };
    // const languages = [
    //     {
    //         code: "en", name: "English", img: <img
    //             src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
    //             alt="English"
    //             style={{ width: 20, height: 15 }}
    //         />
    //     },
    //     {
    //         code: "ar", name: "العربية", img: <img
    //             src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
    //             alt="Arabic"
    //             style={{ width: 20, height: 15 }}
    //         />
    //     },
    // ];
    return (
        <nav className="navbar h-20 bg-white dark:bg-dark-light shadow">
            <div className="container flex justify-between h-full items-center ">
                <div className="logo h-full">
                    <Link to="/">
                        {/* <img src="./logo.png" className="w-full h-full" alt="Logo" /> */}
                        <img src={logo} className="w-full h-full" alt="Logo" />
                    </Link>
                </div>
                {state.token &&
                    <div className="links hidden md:flex gap-4">
                        {links.map((link, index) => (
                            <Link to={link.url} key={index} className={`${activeLink === link.url ? "bg-primary text-white p-3 rounded-lg" : "p-3"} text-lg text-dark dark:text-light font-semibold`}>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                }
                <div className="buttons flex gap-4 justify-center items-center">
                    {state.token &&
                        <Link to="/notifications" className="relative text-info">
                            <Notification size="32" variant='Bulk' color="currentColor" />
                        </Link>
                    }
                    <ThemeButton />
                    {state.token &&
                        <div className="relative" ref={profileDropdownRef}>
                            <button
                                onClick={toggleProfile}
                                className="flex justify-center items-center gap-2 bg-primary dark:bg-primary-light hover:bg-primary-dark text-white dark:text-light font-bold py-2 px-4 rounded-lg"
                            >
                                <ProfileCircle
                                    size="32"
                                    color="currentColor"
                                />
                                {isProfileDropdownOpen ?
                                    <ArrowUp2
                                        size="20"
                                        color="currentColor"
                                    />
                                    :
                                    <ArrowDown2
                                        size="20"
                                        color="currentColor"
                                    />
                                }
                            </button>
                            {isProfileDropdownOpen && (
                                <div className="absolute border border-primary py-1 -end-0 mt-2 w-60 bg-white dark:bg-dark shadow-lg rounded-lg overflow-hidden z-10">
                                    <Link to="/profile" className="w-full flex items-center gap-2 px-4 py-2 text-dark dark:text-light hover:bg-gray dark:hover:bg-muted transition-colors duration-200">
                                        {t("navbar.profile")}
                                    </Link>
                                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-danger dark:text-light hover:bg-gray dark:hover:bg-muted transition-colors duration-200">{t("navbar.logout")}</button>
                                </div>
                            )}
                        </div>
                    }
                    {state.token ? null :
                        <Link to={'/login'} className="hidden md:block bg-primary dark:bg-primary-light hover:bg-primary-dark text-white dark:text-light font-bold py-3 px-4 rounded-lg">
                            {t("navbar.login")}
                        </Link>
                    }
                    <button onClick={toggleMobileMenu} className="md:hidden">
                        {isMobileMenuOpen ? <CloseSquare size="32" color="currentColor" /> : <Menu size="32" color="currentColor" />}
                    </button>
                </div>
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMobileMenu}></div>
                )}

                {/* Mobile Sidebar */}
                <div className={` md:hidden fixed top-0 end-0 h-full bg-white dark:bg-dark-light shadow-lg w-64 z-50 transform ${isMobileMenuOpen ? "translate-x-0" : currentLanguage == "ar" ? "-translate-x-full" : "translate-x-full"} transition-transform duration-300`}>
                    <button onClick={toggleMobileMenu} className="absolute top-4 end-4">
                        <CloseSquare size="32" color="currentColor" />
                    </button>

                    <div className="flex flex-col items-start gap-4 p-6">
                        {state.token && <>
                            {links.map((link, index) => (
                                <Link key={index} to={link.url} className="text-lg font-semibold text-dark dark:text-light w-full p-2 hover:bg-gray dark:hover:bg-muted rounded-lg">
                                    {link.name}
                                </Link>
                            ))}
                        </>}
                        {state.token ? null :
                            <Link to="/login" className="w-full mt-8 text-center bg-primary text-white py-2 rounded-lg">
                                {t("navbar.login")}
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar


// <div className="relative" ref={dropdownRef}>
// <button
//     onClick={toggleDropdown}
//     className="flex items-center gap-2 text-primary dark:text-primary-light hover:text-primary-dark transition-colors duration-200"
// >
//     <LanguageSquare
//         size="32"
//         color="currentColor"
//         variant="Bulk"
//     />
// </button>
// {/* Dropdown Menu */}
// {isDropdownOpen && (
//     <div className="absolute border border-primary end-0 mt-2 w-40 bg-white dark:bg-dark shadow-lg rounded-lg overflow-hidden z-10">
//         {languages.map((language, index) => (
//             <button
//                 key={index}
//                 onClick={() => changeLanguage(language.code)}
//                 className="w-full flex items-center gap-2 px-4 py-2 text-dark dark:text-light hover:bg-gray dark:hover:bg-muted transition-colors duration-200"
//             >
//                 {language.img}
//                 {language.name}
//             </button>
//         ))}
//     </div>
// )}
// </div>