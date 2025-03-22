import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { forgetPasswordAsync } from "../store/slices/auth";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Driving } from "iconsax-react";
import { motion } from "framer-motion";

const ForgetPassword = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const validationSchema = object().shape({
        email: string()
            .email(t("email"))
            .required(t("validations.email-required")),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(forgetPasswordAsync({ params: values })).then((res) => {
                if ((res.payload as { statusCode: number })?.statusCode === 200) {
                    navigate(`/verify-otp/${values.email}`);
                }
            });
        },
    });

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
                className="w-11/12 sm:w-3/4 md:w-1/2 bg-white dark:bg-dark dark:text-white shadow-lg px-8 py-6 rounded-xl"
            >
                <div className="text-center mb-6">
                    {/* Animate the logo with a bounce effect */}
                    <motion.img
                        src="./logo.png"
                        alt="Logo"
                        className="h-16 mx-auto mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    />
                    <h1 className="text-2xl font-bold">{t("auth.forgot-password")}</h1>
                    <p className="text-gray-600">{t("auth.enter-email-reset")}</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="item space-y-3">
                            <label className="block text-lg font-semibold">
                                {t("auth.email")}
                            </label>
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
                        {state.statusCode !== 200 && (
                            <motion.div
                                className="item"
                                initial={{ x: 0 }}
                                animate={state.message ? shakeAnimation : {}}
                            >
                                <p className="text-danger text-center">
                                    {state.message}
                                </p>
                            </motion.div>
                        )}
                        {/* Button with hover animation */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-primary text-white font-bold py-3 rounded-lg min-w-52 flex justify-center items-center"
                        >
                            {state.loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1,
                                        ease: "linear",
                                    }}
                                >
                                    <Driving size={32} color="currentColor" />
                                </motion.div>
                            ) : (
                                t("auth.send-reset-link")
                            )}
                        </motion.button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/login" className="text-primary font-semibold">
                        {t("auth.back-to-login")}
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgetPassword;