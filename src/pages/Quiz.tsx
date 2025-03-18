import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { getQuizDetails, submitQuiz } from "../store/slices/quizzes";
import Loading from "../components/Loading";
import { CloseCircle, Play, Send2, Star1, TickCircle } from "iconsax-react";
import noDataSVG from "./../assets/svgicons/no-data.svg";
import { object } from "yup";
import { useFormik } from "formik";
import { formatDateTime } from "../utils/formatDateTime";

const Quiz = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useSelector((state: RootState) => state.auth);
    const { loading, quiz, result } = useSelector((state: RootState) => state.quizzes);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const questionsPerPage = 10;
    const totalPages = Math.ceil((quiz?.questions?.length || 0) / questionsPerPage);

    const currentQuestions = quiz?.questions?.slice(
        currentPage * questionsPerPage,
        (currentPage + 1) * questionsPerPage
    );

    useEffect(() => {
        if (token && id) {
            dispatch(getQuizDetails({ token, id }));
        }
    }, [token, id, dispatch]);
    const validationSchema = object().shape({
        studentAnswers: object()
            .test(
                "all-answered",
                "يجب الإجابة على جميع الأسئلة",
                (studentAnswers) => Object.values(studentAnswers).every((answer) => answer !== undefined)
            ),
    });

    // Handle form submission
    const handleSubmit = (values: { studentAnswers: { [key: number]: number }; }) => {
        if (!token || !id || !quiz) return;

        const formattedAnswers = Object.entries(values.studentAnswers).map(([questionId, selectedChoice]) => ({
            questionId: Number(questionId),
            selectedChoice: selectedChoice as number,
        }));
        console.log(formattedAnswers);
        dispatch(
            submitQuiz({
                token,
                body: {
                    quizId: quiz.id,
                    studentAnswers: formattedAnswers,
                },
            })
        );
    };

    const formik = useFormik({
        initialValues: {
            studentAnswers: {} as { [key: number]: number }
        },
        validationSchema,
        onSubmit: handleSubmit,
    })

    if (loading) return <div className="h-main"><Loading /></div>;

    return (
        <div className="dark:bg-dark dark:text-white py-5">
            <div className="container min-h-main">
                <div className="py-10">
                    <h2 className="text-2xl font-bold">{quiz?.name}</h2>
                    <p className="text-muted-dark dark:text-muted">{quiz?.description}</p>
                </div>
                <div className="bg-white dark:bg-dark-light p-5 rounded-xl">
                    {quiz?.course && (
                        <div>
                            <h3 className="text-xl font-bold text-dark dark:text-light mb-2">الدورة التدريبية:</h3>
                            <div className="flex items-center gap-4">
                                <img src={quiz.course.imageUrl} alt={quiz.course.name} className="w-44 border border-primary aspect-video rounded-md object-cover " />
                                <div className="flex flex-col gap-2 justify-between">
                                    {/* Course Name */}
                                    <p className="text-xl font-bold text-primary dark:text-primary-light">{quiz.course.name}</p>

                                    {/* Author Name */}
                                    <p className="text-muted-dark dark:text-muted text-sm">{quiz.course.author}</p>

                                    {/* Videos Count */}
                                    <p className="text-muted-dark dark:text-muted flex items-center gap-1">
                                        <Play className="text-red-500" variant="Bold" color="currentColor" size="22" />
                                        <span>عدد الفيديوهات: {quiz.course.courseVideosCount}</span>
                                    </p>

                                    {/* Rating */}
                                    <p className="text-muted-dark dark:text-muted flex items-center gap-1">
                                        <Star1 className="text-yellow-400" variant="Bold" color="currentColor" size="22" />
                                        <span>{quiz.course.rating} / 5</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {result && (
                    (
                        <div className="mt-5 p-5 rounded-xl bg-white dark:bg-dark-light shadow-sm">
                            <h3 className="text-xl font-bold text-primary-dark dark:text-primary-light mb-4">
                                نتيجة الاختبار:
                            </h3>
                            <div className="space-y-3">
                                <p>
                                    <strong>اسم الاختبار:</strong>{" "}
                                    <span className="text-color-primary">{result.quizName}</span>
                                </p>
                                <p>
                                    <strong>الدرجة:</strong>{" "}
                                    <span className="text-success font-bold">
                                        {result.score}
                                    </span>
                                </p>
                                <p>
                                    <strong>عدد الأسئلة الصحيحة:</strong>{" "}
                                    <span className="text-success font-bold">
                                        {result.correctAnswers}
                                    </span>
                                </p>
                                <p>
                                    <strong>عدد الأسئلة غير المجابة:</strong>{" "}
                                    <span className="text-warning font-bold">
                                        {result.unansweredQuestions}
                                    </span>
                                </p>
                                <p>
                                    <strong>تاريخ الإرسال:</strong>{" "}
                                    <span className="text-muted-dark">
                                        {formatDateTime(result.date, { isArabic: true, showTime: true, showDate: true })}
                                    </span>
                                </p>
                                <div>
                                    <h4 className="text-lg font-bold text-primary-dark mb-2">
                                        تفاصيل الأسئلة:
                                    </h4>
                                    <div className="space-y-3">
                                        {result.questionResults.map((questionResult, index) => (
                                            <div
                                                key={questionResult.questionId}
                                                className="p-4 rounded-md bg-greenish-gray"
                                            >
                                                <p>
                                                    <strong>السؤال {index + 1}:</strong>{" "}
                                                    {questionResult.questionText}
                                                </p>
                                                <p>
                                                    <strong>الإجابة المختارة:</strong>{" "}
                                                    <span
                                                        className={`${questionResult.isCorrect
                                                            ? "text-success"
                                                            : "text-danger"
                                                            } font-bold`}
                                                    >
                                                        {questionResult.selectedChoice}
                                                    </span>
                                                </p>
                                                <p>
                                                    <strong>الإجابة الصحيحة:</strong>{" "}
                                                    <span className="text-success font-bold">
                                                        {questionResult.correctChoice}
                                                    </span>
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <strong>الحالة:</strong>{" "}
                                                    {questionResult.isCorrect ? (
                                                        <span className="text-success flex items-center gap-1">
                                                            <TickCircle size={20} /> صحيح
                                                        </span>
                                                    ) : (
                                                        <span className="text-danger flex items-center gap-1">
                                                            <CloseCircle size={20} /> خطأ
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
                <div className="my-5 bg-white dark:bg-dark-light p-5 rounded-xl">
                    {/* Quiz Questions */}
                    {quiz?.questions && quiz.questions.length > 0 ? (
                        <div>
                            <h3 className="text-xl font-bold text-dark dark:text-light mb-2">الأسئلة:</h3>
                            <form onSubmit={formik.handleSubmit}>
                                <ul className="space-y-4">
                                    {currentQuestions?.map((question, index) => (
                                        <li key={question.id} className="p-4 bg-gray dark:bg-dark-lighter rounded-md">
                                            <p className="font-bold">{index + 1 + currentPage * questionsPerPage}. {question.text}</p>
                                            <ul className="mt-2 space-y-2">
                                                {question.choices.map((choice) => (
                                                    <li key={choice.id} className="pl-2 border-l-4 border-primary">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name={`studentAnswers.${question.id}`}
                                                                value={choice.id}
                                                                checked={formik.values.studentAnswers[question.id] === choice.id}
                                                                onChange={() =>
                                                                    formik.setFieldValue(`studentAnswers.${question.id}`, choice.id)
                                                                }
                                                                className="form-radio"
                                                            />
                                                            {choice.text}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                            {formik.errors.studentAnswers &&
                                                formik.touched.studentAnswers &&
                                                !formik.values.studentAnswers[question.id] && (
                                                    <p className="text-danger text-sm mt-1">يجب اختيار إجابة</p>
                                                )}
                                        </li>
                                    ))}
                                </ul>

                                {/* Pagination Buttons */}
                                <div className="w-full flex justify-between items-center mt-5">
                                    <button
                                        type="button"
                                        className={`p-3 px-6 rounded-lg text-white bg-primary hover:bg-primary-dark ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                                        disabled={currentPage === 0}
                                    >
                                        السابق
                                    </button>
                                    <button
                                        // type="submit"
                                        type="button"
                                        onClick={() => setShowModal(true)}
                                        disabled={result !== null}
                                        className="bg-primary hover:bg-primary-dark p-3 px-6 rounded-lg text-white flex justify-center items-center gap-2"
                                    >
                                        <Send2 size={20} color="currentColor" className="text-white" />
                                        إرسال الإجابات
                                    </button>
                                    <button
                                        type="button"
                                        className={`p-3 px-6 rounded-lg text-white bg-primary hover:bg-primary-dark ${currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                                        disabled={currentPage === totalPages - 1}
                                    >
                                        التالي
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            {/* No Data Image */}
                            <img
                                src={noDataSVG}
                                alt="No Data"
                                className="w-40 h-40 md:w-48 md:h-48 mb-4 opacity-80"
                            />
                            {/* Message */}
                            <p className="text-muted text-lg font-medium text-center">
                                لا توجد أسئلة متاحة حاليًا
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-dark-lighter p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold text-center mb-4">تأكيد الإرسال</h3>
                        <p className="text-muted-dark dark:text-muted text-center mb-6">هل أنت متأكد من إرسال الإجابات؟</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-red-500/90 hover:bg-danger text-white rounded-lg"
                                onClick={() => setShowModal(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="px-4 py-2 bg-success/90 hover:bg-success text-white rounded-lg"
                                type="submit"
                                onClick={() => {
                                    setShowModal(false);
                                    formik.handleSubmit();
                                }}
                            >
                                تأكيد الإرسال
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
