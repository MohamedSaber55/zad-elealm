import { Edit, Logout, User, Global, Play, ArrowRight2, MinusSquare, Star1 } from "iconsax-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getEnrolledCourses, unEnrollCourse } from "../store/slices/enrollment";
import { notify } from "../utils/notify";
import { getUserProfileAsync, logout } from "../store/slices/auth";
import Loading from "../components/Loading";
import noDataSVG from "./../assets/svgicons/no-data.svg";
import avatarImage from "../assets/avatar.png";
import { Variants } from "framer-motion";
import { motion } from "framer-motion"
const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token, userProfile } = useSelector((state: RootState) => state.auth);
    const { loading, allEnrolledCourses, courses } = useSelector((state: RootState) => state.enrollment);
    useEffect(() => {
        if (token) {
            dispatch(getEnrolledCourses({ token }));
        }
    }, [token, dispatch]);
    useEffect(() => {
        if (token) {
            dispatch(getUserProfileAsync({ token }));
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
    const handleLogout = () => {
        dispatch(logout());
    };

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dark:bg-dark bg-light min-h-screen py-10 text-black dark:text-white">
            {loading ? <div className="h-main"><Loading /></div>
                : <motion.div
                    className="container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Profile Info */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white dark:bg-dark-light border border-primary rounded-lg p-6 flex flex-col gap-2 items-center shadow-sm">
                        {!userProfile?.imageUrl ?
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="w-24 h-24 flex items-center justify-center bg-muted-green text-primary rounded-full mb-4">
                                <User size="48" color="currentColor" variant="Bold" />
                            </motion.div> :
                            <motion.img
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                src={userProfile?.imageUrl || avatarImage}
                                alt="User Avatar"
                                className="w-24 h-24 rounded-full object-cover border-4 border-success"
                            />
                        }
                        <motion.h2
                            variants={itemVariants}
                            className="text-xl font-bold">{userProfile?.displayName}</motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-muted-dark-alt">{userProfile?.email}</motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-sm text-muted">{userProfile?.phoneNumber}</motion.p>

                        <div className="flex gap-3 mt-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className=""
                            >
                                <Link
                                    to="/edit-profile"
                                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm"
                                >
                                    <Edit size="18" color="currentColor" />
                                    تعديل الحساب
                                </Link>
                            </motion.div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 bg-danger text-white px-4 py-2 rounded-lg text-sm" onClick={handleLogout}>
                                <Logout size="18" color="currentColor" />
                                تسجيل الخروج
                            </motion.button>
                        </div>
                    </motion.div>
                    {/* User Courses */}

                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold mt-10 mb-6">
                        كورساتي
                        <span className="text-danger">({allEnrolledCourses || 0})</span>
                    </motion.h2>
                    {courses?.length != 0 ? <>
                        <motion.div
                            variants={containerVariants}
                            className="flex flex-col gap-6">
                            {courses?.map((course) => (
                                <motion.div
                                    key={course.id}
                                    className="bg-white border border-primary dark:bg-dark-light rounded-lg overflow-hidden flex flex-col sm:flex-row"
                                    variants={itemVariants}
                                    exit="exit"
                                    layout
                                >
                                    {/* <img src={course.imageUrl} alt={course.name} className="w-full sm:w-52 h-full object-cover" /> */}
                                    <img src={course.imageUrl} alt={course.name} className="w-ful aspect-video h-52 object-cover" />

                                    {/* Course Details */}
                                    <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                                        <div className=" flex flex-col items-start gap-2">
                                            <motion.h3
                                                variants={itemVariants}
                                                className="text-lg font-bold">{course.name}</motion.h3>
                                            <motion.p
                                                variants={itemVariants}
                                                className="text-sm text-muted dark:text-gray">{course.author}</motion.p>

                                            <div className="flex flex-wrap gap-5 text-sm mt-2">
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="flex items-center gap-1">
                                                    <Play size="20" className="text-primary" color="currentColor" variant="Bold" />
                                                    <span>عدد الدروس: {course.courseVideosCount}</span>
                                                </motion.div>

                                                <motion.div
                                                    variants={itemVariants}
                                                    className="flex items-center gap-1">
                                                    <Global size="20" className="text-primary" color="currentColor" variant="Bold" />
                                                    <span>اللغة: {course.courseLanguage}</span>
                                                </motion.div>

                                                <motion.div
                                                    variants={itemVariants}
                                                    className="flex items-center gap-1">
                                                    <Star1 size="20" className="text-primary" color="currentColor" variant="Bold" />
                                                    <span>التقييم: {course.rating.toFixed(1)} ⭐</span>
                                                </motion.div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 flex-wrap mt-3">
                                            <Link
                                                to={`/courses/${course.id}`}
                                                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition text-sm font-medium"
                                            >
                                                <ArrowRight2 size={18} color="currentColor" />
                                                الذهاب إلى الكورس
                                            </Link>

                                            <motion.button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleUnEnrollCourse(course.id);
                                                }}
                                                className="flex items-center gap-2 bg-danger hover:bg-danger-dark text-white py-2 px-4 rounded-lg transition text-sm font-medium"
                                            >
                                                <MinusSquare color="currentColor" size={18} />
                                                الغاء التسجيل
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </> : <div className="flex flex-col justify-center items-center">
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
                </motion.div>
            }
        </motion.div>
    );
};

export default Profile;
