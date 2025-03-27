import { useFormik } from "formik";
import { Driving, Eye, EyeSlash, TickSquare } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { object, string } from "yup";
import { AppDispatch, RootState } from "../store/store";
import { loginAsync } from "../store/slices/auth";
import { motion } from "framer-motion";

const Login = () => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.auth);

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
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (state.token) {
        return <Navigate to="/" />;
    }

    // Variants for animating the form container
    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Shake animation for error messages
    const shakeAnimation = {
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.4 },
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-primary dark:bg-primary-light">
            {/* Animate the form container */}
            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
                className="form w-11/12 sm:w-3/4 md:w-1/2 bg-white dark:bg-dark dark:text-white shadow-lg px-8 py-2 rounded-xl"
            >
                <div className="top mb-10 flex flex-col items-center justify-center">
                    {/* Animate the logo with a bounce effect */}
                    <motion.img
                        src="./logo.png"
                        alt="Logo"
                        className="h-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    />
                    <h1 className="text-2xl font-bold text-center text-black dark:text-white">
                        {t("auth.login")}
                    </h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="mb-10">
                    <div className="w-full sm:w-3/4 mx-auto flex flex-col gap-5 justify-center">
                        {/* Email Field */}
                        <div className="item space-y-3">
                            <label className="block ps-2 text-xl font-semibold">{t("auth.email")}</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`border w-full p-3 rounded-lg ${formik.errors.email && formik.touched.email
                                    ? "border-danger placeholder-danger"
                                    : "border-primary placeholder:text-muted"
                                    }`}
                                placeholder={t("auth.input-email")}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <motion.p
                                    className="text-danger text-sm"
                                    initial={{ x: 0 }}
                                    animate={formik.errors.email ? shakeAnimation : {}}
                                >
                                    {formik.errors.email}
                                </motion.p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="item space-y-3">
                            <label className="block ps-2 text-xl font-semibold">{t("auth.password")}</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`border w-full p-3 rounded-lg ${formik.errors.password && formik.touched.password
                                        ? "border-danger placeholder-danger"
                                        : "border-primary placeholder:text-muted"
                                        }`}
                                    placeholder={t("auth.input-password")}
                                    name="password"
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <motion.button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    whileTap={{ rotate: 90 }}
                                    className="absolute cursor-pointer end-3 top-1/2 transform -translate-y-1/2 text-primary"
                                >
                                    {showPassword ? (
                                        <EyeSlash size={24} color="currentColor" />
                                    ) : (
                                        <Eye size={24} color="currentColor" />
                                    )}
                                </motion.button>
                            </div>
                            {formik.errors.password && formik.touched.password && (
                                <motion.p
                                    className="text-danger text-sm"
                                    initial={{ x: 0 }}
                                    animate={formik.errors.password ? shakeAnimation : {}}
                                >
                                    {formik.errors.password}
                                </motion.p>
                            )}

                            {/* Remember Me and Forgot Password */}
                            <div className="flex justify-between items-center gap-5">
                                <div className="text-right">
                                    <Link
                                        to="/forgot-password"
                                        className="text-primary text-lg font-semibold"
                                    >
                                        {t("auth.forgot-password")}
                                    </Link>
                                </div>
                                <div className="item flex items-center gap-2 dark:text-white">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        className="peer hidden"
                                    />
                                    <div
                                        className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary"
                                        onClick={() => setRememberMe(!rememberMe)}
                                    >
                                        <TickSquare
                                            size="20"
                                            color="white"
                                            variant="Bold"
                                            className="peer-checked:block"
                                        />
                                    </div>
                                    <label htmlFor="rememberMe" className="font-semibold text-black dark:text-white">
                                        {t("auth.remember-me")}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {state.statusCode !== 200 && (
                            <motion.div
                                className="item flex flex-col items-center justify-center gap-2"
                                initial={{ x: 0 }}
                                animate={state.message ? shakeAnimation : {}}
                            >
                                <motion.p
                                    className="text-danger text-sm"
                                    initial={{ x: 0 }}
                                    animate={state.message ? shakeAnimation : {}}
                                >
                                    {state.message}
                                </motion.p>
                                {state.message === "لم يتم تأكيد البريد الإلكتروني" && (
                                    <Link
                                        to="/resend-confirmation"
                                        className="text-primary text-lg font-semibold"
                                    >
                                        {t("auth.resend-confirmation-email")}
                                    </Link>
                                )}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <div className="item flex flex-col items-center justify-center gap-3">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-primary text-white font-bold py-3 px-16 min-w-64 rounded flex justify-center items-center"
                            >
                                {state.loading ? (
                                    <motion.div
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1,
                                            ease: "linear",
                                        }}
                                    >
                                        <Driving size={32} color="currentColor" className="animate-pulse" />
                                    </motion.div>
                                ) : (
                                    t("auth.login")
                                )}
                            </motion.button>
                            <p className="text-lg text-center font-semibold">
                                {t("auth.don't-have-account")}{" "}
                                <Link to="/register" className="text-primary ps-1">
                                    {t("auth.sign-up")}
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;