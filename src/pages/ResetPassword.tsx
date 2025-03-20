import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { object, ref, string } from "yup";
import { useFormik } from "formik";
import { resetPasswordAsync } from "../store/slices/auth";
import { Driving, Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.auth)
    const params = useParams()
    const navigate = useNavigate()
    const validationSchema = object().shape({
        email: string().email(t("email")).required(t("validations.email-required")),
        newPassword: string().min(8, t("validations.password-min-length")).required(t("validations.password-required")),
        confirmPassword: string().oneOf([ref('newPassword')], t('validations.password-not-matched'))
    });
    const formik = useFormik({
        initialValues: {
            email: params.email || "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(resetPasswordAsync({ body: values })).then(() => {
                return navigate(`/login`)
            })
        }
    })
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    if (state.token) {
        return <Navigate to="/" />;
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-primary dark:bg-primary-light">
            <div className="form w-11/12 sm:w-3/4 md:w-1/2 bg-white dark:bg-dark dark:text-white shadow-lg px-8 py-2 rounded-xl">
                <div className="top mb-10 flex flex-col items-center justify-center">
                    <div className="logo">
                        <img src="./logo.png" alt="Logo" className="h-20" />
                    </div>
                    <h1 className="text-2xl font-bold text-center">{t("auth.reset-password")}</h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="mb-10">
                    <div className="w-full sm:w-11/12 lg:w-5/6 mx-auto flex flex-col gap-5 justify-center">
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
                            <label className="block ps-2 text-xl font-semibold">{t("auth.newPassword")}</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`border w-full p-3 rounded-lg
                                    ${formik.errors.newPassword && formik.touched.newPassword ? "border-danger placeholder-danger" : "border-primary  placeholder:text-muted"}`}
                                    placeholder={t("auth.input-newPassword")}
                                    name="newPassword"
                                    id="password"
                                    value={formik.values.newPassword}
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
                            {formik.errors.newPassword && formik.touched.newPassword && (
                                <p className="text-danger text-sm">{formik.errors.newPassword}</p>
                            )}
                        </div>
                        <div className="item space-y-3">
                            <label className="block ps-2 text-xl font-semibold">{t("auth.confirmPassword")}</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`border w-full p-3 rounded-lg
                                    ${formik.errors.confirmPassword && formik.touched.confirmPassword ? "border-danger placeholder-danger" : "border-primary  placeholder:text-muted"}`}
                                    placeholder={t("auth.input-confirmPassword")}
                                    name="confirmPassword"
                                    id="password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute cursor-pointer end-3 top-1/2 transform -translate-y-1/2 text-primary "
                                >
                                    {showConfirmPassword ? <EyeSlash size={24} color="currentColor" /> : <Eye size={24} color="currentColor" />}
                                </button>
                            </div>
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                                <p className="text-danger text-sm">{formik.errors.confirmPassword}</p>
                            )}
                        </div>
                        {state.statusCode !== 200 &&
                            <div className="item">
                                <p className=" text-danger text-center">{state.message}</p>
                            </div>
                        }
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg min-w-52 flex justify-center items-center">
                            {state.loading ? <Driving size={32} className="animate-pulse" color="currentColor" /> : t("auth.submit")}
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/login" className="text-primary font-semibold">
                            {t("auth.back-to-login")}
                        </Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ResetPassword