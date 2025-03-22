import { useFormik } from "formik";
import * as Yup from "yup";

const ReportsPage = () => {
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            reportType: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("العنوان مطلوب"),
            description: Yup.string().required("الوصف مطلوب"),
            reportType: Yup.string().required("يرجى اختيار نوع التقرير"),
        }),
        onSubmit: (values) => {
            console.log(values);
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
                            <option value="bug">خطأ</option>
                            <option value="feature_request">طلب ميزة</option>
                            <option value="other">أخرى</option>
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
