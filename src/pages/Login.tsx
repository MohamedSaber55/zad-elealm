import { useFormik } from "formik";
import { Driving, Eye, EyeSlash, TickSquare } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { object, string } from "yup";
import { AppDispatch, RootState } from "../store/store";
import { loginAsync } from "../store/slices/auth";

const Login = () => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.auth)

    const validationSchema = object().shape({
        email: string().email(t("email")).required(t("validations.email-required")),
        password: string().required(t("validations.password-required")),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(loginAsync({ body: values }));
        }
    })
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    if (state.token) {
        return <Navigate to="/" />;
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-primary">
            <div className="form w-11/12 sm:w-3/4 md:w-1/2 bg-white dark:bg-drk shadow-lg px-8 py-2 rounded-xl">
                <div className="top mb-10 flex flex-col items-center justify-center">
                    <div className="logo">
                        <img src="./logo.png" alt="Logo" className="h-20" />
                    </div>
                    <h1 className="text-2xl font-bold text-center text-black">{t("auth.login")}</h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="mb-10">
                    <div className="w-full sm:w-3/4 mx-auto flex flex-col gap-5 justify-center">
                        <div className="item space-y-3">
                            <label className="block ps-2 text-xl font-semibold">{t("auth.email")}</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`border w-full p-3 rounded-lg 
                                    ${formik.errors.email && formik.touched.email ? "border-danger placeholder-danger" : "border-primary placeholder:text-muted "}`}
                                placeholder={t("auth.input-email")}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <p className="text-danger text-sm">{formik.errors.email}</p>
                            )}
                        </div>
                        <div className="item space-y-3">
                            <label className="block ps-2 text-xl font-semibold">{t("auth.password")}</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`border w-full p-3 rounded-lg
                                        ${formik.errors.password && formik.touched.password ? "border-danger placeholder-danger" : "border-primary  placeholder:text-muted"}`}
                                    placeholder={t("auth.input-password")}
                                    name="password"
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute cursor-pointer end-3 top-1/2 transform -translate-y-1/2 text-primary "
                                >
                                    {showPassword ? <EyeSlash size={24} color="currentColor" /> : <Eye size={24} color="currentColor" />}
                                </button>
                            </div>
                            {formik.errors.password && formik.touched.password && (
                                <p className="text-danger text-sm">{formik.errors.password}</p>
                            )}
                            <div className="flex justify-between items-center gap-5">

                                <div className="text-right">
                                    <Link to="/forgot-password" className="text-primary text-lg font-semibold">
                                        {t("auth.forgot-password")}
                                    </Link>
                                </div>
                                <div className="item flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        className="peer hidden"
                                    />
                                    <div
                                        className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center 
        peer-checked:border-primary peer-checked:bg-primary"
                                        onClick={() => setRememberMe(!rememberMe)}
                                    >
                                        <TickSquare
                                            size="20"
                                            color="white"
                                            variant="Bold"
                                            className=" peer-checked:block"
                                        />
                                    </div>
                                    <label htmlFor="rememberMe" className="font-semibold text-black">
                                        {t("auth.remember-me")}
                                    </label>
                                </div>
                            </div>
                        </div>
                        {state.statusCode !== 200 &&
                            <div className="item">
                                <p className=" text-danger text-center">{state.message}</p>
                            </div>
                        }
                        <div className="item flex flex-col items-center justify-center gap-3">
                            <button className="bg-primary text-white font-bold py-3 px-16 min-w-64 rounded flex justify-center items-center">{state.loading ? <Driving size={32} className="animate-pulse" color="currentColor" /> : t("auth.login")}</button>
                            <p className="text-lg font-semibold">{t("auth.don't-have-account")} <Link to="/register" className="text-primary ps-1">{t("auth.sign-up")}</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login