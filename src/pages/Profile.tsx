import { Edit, Logout, User, Global, Play, ArrowRight2, MinusSquare, Star1, DocumentText, Cup, NotificationBing, Clock } from "iconsax-react";
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
import { getUserRank, getUserStats } from "../store/slices/rank";
import { formatDateTime } from "../utils/formatDateTime";



// Reusable Stat Card Component
function StatCard({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: string | number; color: string }) {
    return (
        <div className="flex items-center gap-3 p-3 hover:bg-gray dark:hover:bg-gray-800 rounded-lg transition">
            <div className={`p-2 rounded-lg ${color}/10`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted dark:text-muted-light">{title}</p>
                <p className={`font-bold ${color}`}>{value}</p>
            </div>
        </div>
    );
}

// Reusable Achievement Badge Component
function AchievementBadge({ level, count, icon, colorClass }: { level: string; count: number; icon: React.ReactNode; colorClass: string }) {
    return (
        <div className={`flex flex-col items-center p-3 rounded-lg ${colorClass}`}>
            <div className="mb-2">{icon}</div>
            <p className="text-sm font-medium">{level}</p>
            <p className="text-lg font-bold">{count}</p>
        </div>
    );
}

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token, userProfile } = useSelector((state: RootState) => state.auth);
    const { loading, allEnrolledCourses, courses } = useSelector((state: RootState) => state.enrollment);
    const rankState = useSelector((state: RootState) => state.ranks);
    useEffect(() => {
        if (token) {
            dispatch(getUserRank({ token }));
            dispatch(getUserStats({ token }));
        }
    }, [])
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
                        className="bg-white dark:bg-dark-light border border-primary rounded-lg p-6 flex flex-col gap-2 items-center">
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

                    {/* User Rank and Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 mt-10"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                رتبتي وإحصائياتي
                            </h2>
                            {!rankState.loading && !rankState.error && (
                                <div className="text-sm text-muted dark:text-muted-light">
                                    آخر تحديث: {formatDateTime(rankState.rank?.lastUpdated || "", {
                                        isArabic: true,
                                        showDate: true,
                                        showTime: true
                                    }) || "غير معروف"}
                                </div>
                            )}
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-white dark:bg-dark-light rounded-xl p-6 border border-muted dark:border-muted-dark"
                        >
                            {rankState.loading ? (
                                <div className="flex justify-center items-center h-40">
                                    <Loading />
                                </div>
                            ) : rankState.error ? (
                                <div className="text-center py-10">
                                    <NotificationBing size={48} className="mx-auto text-danger mb-4" color="currentColor" />
                                    <p className="text-danger text-lg">حدث خطأ أثناء تحميل الرتبة والإحصائيات</p>
                                    <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                                        إعادة المحاولة
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* User Rank Card */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-dark-darker dark:to-dark-darker p-6 rounded-xl border border-muted dark:border-muted-dark"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 bg-primary/10 dark:bg-primary/20 border border-primary dark:border-muted-green rounded-full">
                                                    <Star1 size="28" className="text-primary dark:text-muted-green" color="currentColor" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted dark:text-muted-green">الرتبة الحالية</p>
                                                    <h3 className="text-2xl font-bold text-primary dark:text-primary-light">
                                                        {rankState.rank?.rankName || "غير معروفة"}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-success/10 rounded-full">
                                                        <Play size="20" color="currentColor" className="text-success" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted dark:text-muted-light">النقاط</p>
                                                        <p className="font-medium">{rankState.rank?.totalPoints || 0}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-info/10 rounded-full">
                                                        <Global size="20" color="currentColor" className="text-info" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted dark:text-muted-light">الترتيب العام</p>
                                                        <p className="font-medium">{rankState.rank?.rank || "غير معروف"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Learning Stats */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white dark:bg-dark-lighter p-6 rounded-xl border border-muted dark:border-muted-dark"
                                        >
                                            <h4 className="text-xl font-semibold text-primary dark:text-primary-light mb-4 pb-2 border-b border-muted dark:border-muted-dark">
                                                إحصائيات التعلم
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <StatCard
                                                    icon={<Play size="24" color="currentColor" className="text-primary" />}
                                                    title="الكورسات المكتملة"
                                                    value={rankState.rank?.completedCoursesCount || 0}
                                                    color="text-primary"
                                                />
                                                <StatCard
                                                    icon={<DocumentText size="24" color="currentColor" className="text-success" />}
                                                    title="عدد الشهادات"
                                                    value={rankState.rank?.certificatesCount || 0}
                                                    color="text-success"
                                                />
                                                <StatCard
                                                    icon={<Star1 size="24" color="currentColor" className="text-warning" />}
                                                    title="متوسط الدرجات"
                                                    value={rankState.rank?.averageQuizScore.toFixed(2) || "0.00"}
                                                    color="text-warning"
                                                />
                                                <StatCard
                                                    icon={<Clock size="24" color="currentColor" className="text-info" />}
                                                    title="ساعات التعلم"
                                                    value="24.5"
                                                    color="text-info"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Achievements */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white dark:bg-dark-lighter p-6 rounded-xl border border-muted dark:border-muted-dark"
                                        >
                                            <h4 className="text-xl font-semibold text-primary dark:text-primary-light mb-4 pb-2 border-b border-muted dark:border-muted-dark">
                                                الإنجازات
                                            </h4>
                                            <div className="grid grid-cols-3 gap-4">
                                                <AchievementBadge
                                                    level="Bronze"
                                                    count={rankState.stats?.Bronze || 0}
                                                    icon={<Cup size="20" color="currentColor" className="text-bronze" />}
                                                    colorClass="bg-bronze/10"
                                                />
                                                <AchievementBadge
                                                    level="Silver"
                                                    count={rankState.stats?.Silver || 0}
                                                    icon={<Cup size="20" color="currentColor" className="text-silver" />}
                                                    colorClass="bg-silver/10"
                                                />
                                                <AchievementBadge
                                                    level="Gold"
                                                    count={rankState.stats?.Gold || 0}
                                                    icon={<Cup size="20" color="currentColor" className="text-gold" />}
                                                    colorClass="bg-gold/10"
                                                />
                                                <AchievementBadge
                                                    level="Platinum"
                                                    count={rankState.stats?.Platinum || 0}
                                                    icon={<Cup size="20" color="currentColor" className="text-platinum" />}
                                                    colorClass="bg-platinum/10"
                                                />
                                                <AchievementBadge
                                                    level="Diamond"
                                                    count={rankState.stats?.Diamond || 0}
                                                    icon={<Cup size="20" color="currentColor" className="text-diamond" />}
                                                    colorClass="bg-diamond/10"
                                                />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Progress Bar (optional) */}
                                    <motion.div variants={itemVariants}>
                                        <div className="mt-4">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium">تقدمك للرتبة التالية</span>
                                                <span className="text-sm font-medium">75%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                <div
                                                    className="bg-gradient-to-r from-primary to-primary-dark h-2.5 rounded-full"
                                                    style={{ width: '75%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
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
