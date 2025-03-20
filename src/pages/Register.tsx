import { useFormik } from "formik";
import { Driving, Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import { registerAsync } from "../store/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { object, string } from "yup";
import { notify } from "../utils/notify";

const Register = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.auth)

  const validationSchema = object().shape({
    displayName: string().required(t("validations.name-required")),
    email: string().email(t("email")).required(t("validations.email-required")),
    password: string().required(t("validations.password-required")),
  });
  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(registerAsync({ body: values })).then((res) => {
        if ((res.payload as { statusCode: number })?.statusCode === 200) {
          return <Navigate to="/login" />;
        }
      })
    }
  })
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (state.token) {
    notify("تم التسجيل بنجاح, يرجى متابعة البريد الإلكتروني لتفعيل الحساب", "success");
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-primary dark:bg-primary-light">
      <div className="form w-11/12 sm:w-3/4 md:w-1/2 bg-white dark:bg-dark dark:text-white shadow-lg px-8 py-2 rounded-xl">
        <div className="top mb-10 flex flex-col items-center justify-center">
          <div className="logo">
            <img src="./logo.png" alt="Logo" className="h-20" />
          </div>
          <h1 className="text-2xl font-bold text-center ">{t("auth.register")}</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="mb-10">
          <div className="w-full sm:w-3/4 mx-auto flex flex-col gap-5 justify-center">
            <div className="item space-y-3">
              <label className="block ps-2 text-xl font-semibold">{t("auth.fullName")}</label>
              <input
                type="text"
                className={`border w-full p-3 rounded-lg 
                  ${formik.errors.displayName && formik.touched.displayName ? "border-danger placeholder-danger" : "border-primary placeholder:text-muted "}`}
                placeholder={t("auth.input-fullName")}
                onChange={formik.handleChange}
                value={formik.values.displayName}
                name="displayName"
                onBlur={formik.handleBlur}
              />
              {formik.touched.displayName && formik.errors.displayName && (
                <p className="text-red-500">{formik.errors.displayName}</p>
              )}
            </div>
            <div className="item space-y-3">
              <label className="block ps-2 text-xl font-semibold">{t("auth.email")}</label>
              <input
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                onBlur={formik.handleBlur}
                className={`border w-full p-3 rounded-lg 
                  ${formik.errors.email && formik.touched.email ? "border-danger placeholder-danger" : "border-primary placeholder:text-muted "}`}
                placeholder={t("auth.input-email")} />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="item space-y-3">
              <label className="block ps-2 text-xl font-semibold">{t("auth.password")}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  name="password"
                  onBlur={formik.handleBlur}
                  className={`border w-full p-3 rounded-lg 
                  ${formik.errors.password && formik.touched.password ? "border-danger placeholder-danger" : "border-primary placeholder:text-muted "}`}
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
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}
            </div>
            {state.statusCode !== 200 &&
              <div className="item">
                <p className=" text-danger text-center">{state.message}</p>
              </div>
            }
            <div className="item flex flex-col items-center justify-center gap-3">
              <button type="submit" className="bg-primary text-white font-bold py-3 px-16 min-w-64 rounded flex justify-center items-center">{state.loading ? <Driving size={32} className="animate-pulse" color="currentColor" /> : t("auth.register")}</button>
              <p className="text-lg font-semibold">{t("auth.have-account")} <Link to="/login" className="text-primary ps-1">{t("auth.login")}</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register