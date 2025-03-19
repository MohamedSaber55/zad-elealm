import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { forgetPasswordAsync } from "../store/slices/auth";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Driving } from "iconsax-react";

const ForgetPassword = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const validationSchema = object().shape({
        email: string().email(t("email")).required(t("validations.email-required")),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(forgetPasswordAsync({ params: values })).then((res) => {
                if ((res.payload as { statusCode: number })?.statusCode === 200) {
                    navigate(`/verify-otp/${values.email}`)
                }
            })
        }
    })

    return (
        <div className="flex justify-center items-center min-h-screen bg-primary">
            <div className="w-11/12 sm:w-3/4 md:w-1/2 bg-white dark:bg-drk shadow-lg px-8 py-6 rounded-xl">
                <div className="text-center mb-6">
                    <img src="./logo.png" alt="Logo" className="h-16 mx-auto mb-2" />
                    <h1 className="text-2xl font-bold text-black">{t("auth.forgot-password")}</h1>
                    <p className="text-gray-600">{t("auth.enter-email-reset")}</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="item space-y-3">
                            <label className="block text-lg font-semibold">{t("auth.email")}</label>
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
                        {state.statusCode !== 200 &&
                            <div className="item">
                                <p className=" text-danger text-center">{state.message}</p>
                            </div>
                        }
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg min-w-52 flex justify-center items-center">
                            {state.loading ? <Driving size={32} className="animate-pulse" color="currentColor" /> : t("auth.send-reset-link")}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/login" className="text-primary font-semibold">
                        {t("auth.back-to-login")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
