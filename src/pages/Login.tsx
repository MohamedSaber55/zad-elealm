import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Login = () => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-primary">
            <div className="form w-11/12 sm:w-3/4 md:w-1/2 bg-white dark:bg-drk shadow-lg px-8 py-2 rounded-xl">
                <div className="top mb-10 flex flex-col items-center justify-center">
                    <div className="logo">
                        <img src="./logo.png" alt="Logo" className="h-20" />
                    </div>
                    <h1 className="text-2xl font-bold text-center text-black">{t("auth.login")}</h1>
                </div>
                <form className="mb-10">
                    <div className="w-full sm:w-3/4 mx-auto flex flex-col gap-5 justify-center">
                        <div className="item space-y-3">
                            <label className="block ps-2 text-xl font-semibold">{t("auth.email")}</label>
                            <input type="email" className="border w-full p-3 rounded-lg border-primary placeholder:text-muted" placeholder={t("auth.input-email")} />
                        </div>
                        <div className="item space-y-3">
                            <label className="block ps-2 text-xl font-semibold">{t("auth.password")}</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="border w-full p-3 rounded-lg border-primary placeholder:text-muted"
                                    placeholder={t("auth.input-password")}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute cursor-pointer end-3 top-1/2 transform -translate-y-1/2 text-primary "
                                >
                                    {showPassword ? <EyeSlash size={24} color="currentColor" /> : <Eye size={24} color="currentColor" />}
                                </button>
                            </div>
                            <div className="flex justify-between items-center gap-5">

                                {/* Forgot Password Link */}
                                <div className="text-right">
                                    <Link to="/forgot-password" className="text-primary text-lg font-semibold">
                                        {t("auth.forgot-password")}
                                    </Link>
                                </div>
                                {/* Remember Me Checkbox */}
                                <div className="item flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        className="peer hidden"
                                        // className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary">
                                        <svg
                                            className="w-4 h-4 text-white hidden peer-checked:block"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <label htmlFor="rememberMe" className="font-semibold text-black">
                                        {t("auth.remember-me")}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="item flex flex-col items-center justify-center gap-3">
                            <button className="bg-primary text-white font-bold py-3 px-16 rounded">{t("auth.login")}</button>
                            <p className="text-lg font-semibold">{t("auth.don't-have-account")} <Link to="/register" className="text-primary ps-1">{t("auth.sign-up")}</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login