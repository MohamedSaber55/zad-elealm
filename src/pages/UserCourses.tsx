import { ArrowRight2, Global, MinusSquare, Play, Star1 } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { getEnrolledCourses, unEnrollCourse } from "../store/slices/enrollment";
import noDataSVG from "./../assets/svgicons/no-data.svg";
import { notify } from "../utils/notify";
import { Course } from "../interfaces";
import ReviewModal from "../components/ReviewModal";
import RatingModal from "../components/RatingModal";
import { addRating, addReview } from "../store/slices/reviews";

const UserCourses = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useSelector((state: RootState) => state.auth);
    const { loading, allEnrolledCourses, courses } = useSelector((state: RootState) => state.enrollment);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isReviewOpen, setReviewOpen] = useState(false);
    const [isRatingOpen, setRatingOpen] = useState(false);
    useEffect(() => {
        if (token) {
            dispatch(getEnrolledCourses({ token }));
        }
    }, [token, dispatch]);

    const handleUnEnrollCourse = (courseId: number) => {
        if (token) {
            dispatch(unEnrollCourse({ token, id: courseId })).then(() => {
                dispatch(getEnrolledCourses({ token }))
            })
            notify("تم الغاء التسجيل بنجاح", "success")
        }
    }
    const handleOpenReview = (course: Course) => {
        setSelectedCourse(course);
        setReviewOpen(true);
    };
    const handleOpenRating = (course: Course) => {
        setSelectedCourse(course);
        setRatingOpen(true);
    };

    const handleSubmitReview = (reviewText: string) => {
        notify("تم إضافة تقييمك بنجاح", "success");
        if (selectedCourse?.id !== undefined) {
            const body = {
                reviewText,
                courseId: selectedCourse.id,
            }

            if (token) {
                dispatch(addReview({ token, body }));
            }
        }
        setReviewOpen(false);
    };
    const handleSubmitRating = (reviewData: { rating: number }) => {
        if (selectedCourse?.id !== undefined && token) {
            dispatch(addRating({ body: { courseId: selectedCourse.id, value: reviewData.rating }, token })).then((res) => {
                (res.payload as { message: string }).message == "لقد قمت بتقييم هذه الدورة من قبل" ?
                    notify("لقد قمت بتقييم هذه الدورة من قبل", "error") :
                    notify("تم إضافة تقييمك بنجاح", "success");
            })
        }
        setRatingOpen(false);
    };

    return (
        <div className="dark:bg-dark dark:text-white">
            {loading ? <div className="h-main"><Loading /></div> :
                <div className="container min-h-main py-10">
                    <h2 className="text-2xl font-bold mb-6">كورساتي <span className="text-danger">({allEnrolledCourses || 0})</span></h2>

                    {courses?.length ?
                        <div className="flex flex-col gap-6">
                            {courses?.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white border border-primary dark:bg-dark-light rounded-lg overflow-hidden flex flex-col md:flex-row"
                                >
                                    {/* <img src={course.imageUrl} alt={course.name} className="w-full sm:w-52 h-full object-cover" /> */}
                                    <img src={course.imageUrl} alt={course.name} className="w-ful aspect-video h-52 object-cover" />

                                    {/* Course Details */}
                                    <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                                        <div className=" flex flex-col items-start gap-2">
                                            <h3 className="text-lg font-bold">{course.name}</h3>
                                            <p className="text-sm text-muted dark:text-gray">{course.author}</p>

                                            <div className="flex flex-wrap gap-4 text-sm mt-2">
                                                <p className="flex items-center gap-1">
                                                    <Play size="20" className="text-primary" color="currentColor" variant="Bold" />
                                                    <span>عدد الدروس: {course.courseVideosCount}</span>
                                                </p>

                                                <p className="flex items-center gap-1">
                                                    <Global size="20" className="text-primary" color="currentColor" variant="Bold" />
                                                    <span>اللغة: {course.courseLanguage}</span>
                                                </p>

                                                <p className="flex items-center gap-1">
                                                    <Star1 size="20" className="text-primary" color="currentColor" variant="Bold" />
                                                    <span>التقييم: {course.rating.toFixed(1)} ⭐</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap mt-3">
                                            <Link
                                                to={`/courses/${course.id}`}
                                                className="flex items-center justify-center sm:justify-start gap-2 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition text-sm font-medium"
                                            >
                                                <ArrowRight2 size={18} color="currentColor" />
                                                الذهاب إلى الكورس
                                            </Link>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleUnEnrollCourse(course.id);
                                                }}
                                                className="flex items-center justify-center sm:justify-start  gap-2 bg-danger hover:bg-danger-dark text-white py-2 px-4 rounded-lg transition text-sm font-medium"
                                            >
                                                <MinusSquare color="currentColor" size={18} />
                                                الغاء التسجيل
                                            </button>

                                            <button
                                                onClick={() => handleOpenRating(course)}
                                                className="flex items-center justify-center sm:justify-start  gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition text-sm font-medium"
                                            >
                                                <Star1 color="currentColor" size={18} />
                                                تقييم الدورة
                                            </button>
                                            <button
                                                onClick={() => handleOpenReview(course)}
                                                className="flex items-center justify-center sm:justify-start  gap-2 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition text-sm font-medium"
                                            >
                                                <Star1 color="currentColor" size={18} />
                                                اضافة تعليق
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            {/* No Data Image */}
                            <img
                                src={noDataSVG}
                                alt="No Data"
                                className="w-40 h-40 md:w-48 md:h-48 mb-4 opacity-80"
                            />
                            {/* Message */}
                            <p className="text-gray-500 text-lg font-medium text-center">
                                لا يوجد أي كورسات متاحة حالياً
                            </p>
                        </div>}
                </div>
            }
            {/* Review Modal */}
            {selectedCourse && (
                <ReviewModal isOpen={isReviewOpen} onClose={() => setReviewOpen(false)} onSubmit={handleSubmitReview} />
            )}
            {/* Rating Modal */}
            {selectedCourse && (
                <RatingModal isOpen={isRatingOpen} onClose={() => setRatingOpen(false)} onSubmit={handleSubmitRating} />
            )}
        </div>
    );
};

export default UserCourses;
