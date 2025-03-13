import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { verifyOTPAsync } from "../store/slices/auth";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Driving } from "iconsax-react";
import logo from "./../../public/logo.png"
const VerifyOTP = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.auth);
    const params = useParams()
    const navigate = useNavigate()
    const validationSchema = object().shape({
        otp: string()
            .length(6, t("validations.otp-length"))
            .required(t("validations.otp-required")),
    });

    const formik = useFormik({
        initialValues: {
            email: params.email || "",
            otp: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(verifyOTPAsync({ params: values })).then((res) => {
                console.log(res);
                if ((res.payload as { statusCode: number })?.statusCode === 200) {
                    return navigate(`/reset-password/${params.email}`)
                }
            })
        },
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-primary">
            <div className="w-11/12 sm:w-3/4 md:w-1/2 bg-white dark:bg-drk shadow-lg px-8 py-6 rounded-xl">
                <div className="top mb-10 flex flex-col items-center justify-center">
                    <div className="logo">
                        <img src={logo} alt="Logo" className="h-20" />
                    </div>
                    <h1 className="text-2xl font-bold text-center text-black">{t("auth.verify-otp")}</h1>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mx-auto flex flex-col gap-5 justify-center w-full sm:w-11/12 lg:w-5/6  ">
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
                        <div className="item space-y-3">
                            <label className="block text-lg font-semibold">{t("auth.otp")}</label>
                            <input
                                type="text"
                                name="otp"
                                id="otp"
                                value={formik.values.otp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`border w-full p-3 rounded-lg 
                                    ${formik.errors.otp && formik.touched.otp ? "border-danger placeholder-danger" : "border-primary placeholder:text-muted "}`}
                                placeholder={t("auth.input-otp")}
                                maxLength={6}
                            />
                            {formik.errors.otp && formik.touched.otp && (
                                <p className="text-danger text-sm">{formik.errors.otp}</p>
                            )}
                        </div>
                        {state.statusCode !== 200 &&
                            <div className="item">
                                <p className=" text-danger text-center">{state.message}</p>
                            </div>
                        }
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg min-w-52 flex justify-center items-center">
                            {state.loading ? <Driving size={32} className="animate-pulse" color="currentColor" /> : t("auth.verify")}
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

export default VerifyOTP;
