import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../store/slices/report";
import { notify } from "../utils/notify";
import { useNavigate } from "react-router-dom";

const ReportsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            reportType: 0,
        },
        validationSchema: Yup.object({
            title: Yup.string().required("العنوان مطلوب"),
            description: Yup.string().required("الوصف مطلوب"),
            reportType: Yup.number().required("يرجى اختيار نوع التقرير"),
        }),
        onSubmit: (values) => {
            dispatch(createReport({
                body: {
                    titleOfTheIssue: values.title,
                    description: values.description,
                    reportTypes: values.reportType
                },
                token: token!
            })).then(() => {
                notify(" تم إرسال التقرير بنجاح", "success");
                navigate("/")
            })
            // هنا يمكنك إضافة منطق لإرسال التقرير إلى الخادم
        },
    });

    return (
        <div className="dark:bg-dark dark:text-white min-h-main">
            <div className="container mx-auto py-10">
                <h2 className="text-2xl font-bold mb-5">إنشاء تقرير</h2>
                <form onSubmit={formik.handleSubmit} className="bg-white dark:bg-dark-light border border-primary rounded-xl px-8 pt-6 pb-8">
                    <div className="mb-4">
                        <label className="block text-dark-lighter dark:text-muted text-sm font-bold mb-2">عنوان المشكلة</label>
                        <input
                            type="text"
                            name="title"
                            className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-dark-lighter dark:text-muted"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <p className="text-danger text-xs mt-1">{formik.errors.title}</p>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="block text-dark-lighter dark:text-muted text-sm font-bold mb-2">الوصف</label>
                        <textarea
                            name="description"
                            className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-dark-lighter dark:text-muted"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <p className="text-danger text-xs mt-1">{formik.errors.description}</p>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="block text-dark-lighter dark:text-muted text-sm font-bold mb-2">نوع التقرير</label>
                        <select
                            name="reportType"
                            className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-dark-lighter dark:text-muted"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.reportType}
                        >
                            <option value="">اختر نوع التقرير</option>
                            <option value="0">خطأ</option>
                            <option value="1">طلب ميزة</option>
                            <option value="2">أخرى</option>
                        </select>
                        {formik.touched.reportType && formik.errors.reportType ? (
                            <p className="text-danger text-xs mt-1">{formik.errors.reportType}</p>
                        ) : null}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            إرسال التقرير
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportsPage;
