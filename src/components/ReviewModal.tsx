import { useFormik } from "formik";
import * as Yup from "yup";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reviewText: string) => void;
}

const ReviewModal = ({ isOpen, onClose, onSubmit }: ReviewModalProps) => {
    const formik = useFormik({
        initialValues: { reviewText: "" },
        validationSchema: Yup.object({
            reviewText: Yup.string()
                .trim()
                .min(10, "يجب أن يكون التقييم 10 أحرف على الأقل")
                .required("يرجى إدخال تقييمك"),
        }),
        onSubmit: (values) => {
            onSubmit(values.reviewText);
            formik.resetForm();
            onClose();
        },
    });

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div className="bg-white min-w-xs dark:bg-dark-light p-6 rounded-lg shadow-lg flex justify-center items-stretc flex-col border border-muted-green dark:border-muted-dark">
                {/* Drag Header */}
                <div className="p-3 bg-greenish-gray dark:bg-primary/50 rounded-t-lg">
                    <h3 className="text-xl font-bold text-primary-dark dark:text-greenish-gray font-cairo">أضف تقييمك</h3>
                </div>

                {/* Content */}
                <form onSubmit={formik.handleSubmit} className="flex-grow flex flex-col my-3 w-full">
                    <textarea
                        name="reviewText"
                        value={formik.values.reviewText}
                        onChange={formik.handleChange}
                        placeholder="اكتب رأيك عن الدورة (10 أحرف على الاقل)"
                        className={`w-full border p-2 rounded-md bg-light dark:bg-dark-lighter focus:ring-2 ${formik.errors.reviewText && formik.touched.reviewText
                            ? "border-red-500 focus:ring-red-500"
                            : "border-muted-green dark:border-muted-dark focus:ring-primary-light"
                            }`}
                    />
                    {formik.errors.reviewText && formik.touched.reviewText && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.reviewText}</p>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-muted-dark dark:border-muted dark:text-muted rounded-md text-muted-dark"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            إرسال
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default ReviewModal;
