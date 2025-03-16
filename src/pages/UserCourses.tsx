import { Global, MinusSquare, Play, Star1 } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { getEnrolledCourses, unEnrollCourse } from "../store/slices/enrollment";
import noDataSVG from "./../assets/svgicons/no-data.svg";
import { notify } from "../utils/notify";

const UserCourses = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useSelector((state: RootState) => state.auth);
    const { loading, allEnrolledCourses, courses } = useSelector((state: RootState) => state.enrollment);
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
    return (
        <div className="dark:bg-dark dark:text-white">
            {loading ? <div className="h-main"><Loading /></div> :
                <div className="container min-h-main py-10">
                    <h2 className="text-2xl font-bold mb-6">كورساتي <span className="text-danger">({allEnrolledCourses})</span></h2>

                    {courses?.length ?
                        <div className="flex flex-col gap-6">
                            {courses?.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white border border-primary dark:bg-dark-light rounded-lg overflow-hidden flex flex-col sm:flex-row"
                                >
                                    {/* <img src={course.imageUrl} alt={course.name} className="w-full sm:w-52 h-full object-cover" /> */}
                                    <img src={course.imageUrl} alt={course.name} className="w-ful aspect-video h-52 object-cover" />

                                    {/* Course Details */}
                                    <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                                        <div className=" flex flex-col items-start gap-2">
                                            <h3 className="text-lg font-bold">{course.name}</h3>
                                            <p className="text-sm text-muted dark:text-gray">{course.author}</p>

                                            <div className="flex flex-wrap gap-5 text-sm mt-2">
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

                                        <div className=" flex items-center gap-5 ">
                                            <Link
                                                to={`/courses/${course.id}`}
                                                className="w-fit bg-primary hover:bg-primary-dark text-light py-2 px-5 rounded-md text-center"
                                            >
                                                الذهاب إلى الكورس
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleUnEnrollCourse(course.id);
                                                }}
                                                className="bg-danger/90 hover:bg-danger text-white py-2 px-4 rounded-md transition flex items-center justify-center gap-2"
                                            >
                                                <MinusSquare color="currentColor" size={20} />
                                                <span className=""> الغاء التسجيل في الدورة</span>
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
        </div>
    );
};

export default UserCourses;
