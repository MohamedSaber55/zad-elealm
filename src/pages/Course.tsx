import { DocumentText1, Global, Play, Star1, User, VideoCircle } from "iconsax-react"
import RatingStars from "../components/RatingStars"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getCourseDetails } from "../store/slices/courses";
import { CourseWithReviews } from "../interfaces";
import Loading from "../components/Loading";
import VideoPlayer from "../components/VideoPlayer";
import { getCourseProgress } from "../store/slices/videoProgress";
import ReviewsSection from "../components/ReviewsSection";
import { motion } from "framer-motion";

const Course = () => {
    const { id } = useParams<{ id: string }>()
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [selectedVideoId, setSelectedVideoId] = useState<number>(0);
    const [selectedVideoDuration, setSelectedVideoDuration] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>()
    const { token } = useSelector((state: RootState) => state.auth)
    const state = useSelector((state: RootState) => state.courses)
    const videoProgressState = useSelector((state: RootState) => state.videoProgress)
    const course: CourseWithReviews | null = state.course || null;

    const { courseProgress } = videoProgressState
    const setVideoUrlAsEmbedded = (url: string) => {
        setSelectedVideo(url)
    }
    useEffect(() => {
        if (id && token) {
            dispatch(getCourseProgress({ courseId: id, token }))
        }
    }, [id, token, dispatch])
    useEffect(() => {
        if (id && token) {
            dispatch(getCourseDetails({ token, id }))
        }
    }, [id, token, dispatch]);

    // Variants for animating the video list
    const videoListVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Delay between each child animation
            },
        },
    };

    const videoItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <div className="dark:bg-dark dark:text-white">
            {state.loading ? (
                <div className="h-main">
                    <Loading />
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="container min-h-main pb-10"
                >
                    {/* Page Title Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="py-10"
                    >
                        <h2 className="text-2xl font-bold">{course?.name}</h2>
                    </motion.div>

                    <div className={`grid grid-cols-3 gap-5`}>
                        {/* Video Player Section */}
                        {selectedVideo && (
                            <VideoPlayer
                                selectedVideo={selectedVideo}
                                currentVideoId={selectedVideoId}
                                selectedVideoDuration={selectedVideoDuration}
                            />
                        )}

                        {/* Video List Section */}
                        <motion.div
                            variants={videoListVariants}
                            initial="hidden"
                            animate="visible"
                            className={`videos h-[520px] overflow-y-scroll col-span-3 ${selectedVideo ? "md:col-span-1" : "md:col-span-2"
                                } bg-white dark:bg-dark-light rounded-xl p-5`}
                        >
                            <h3 className="text-2xl text-primary dark:text-primary-light font-bold mb-5">
                                الفيديوهات
                            </h3>
                            <div className="flex flex-col justify-center gap-5">
                                {course?.videos.map((video, index) => (
                                    <motion.div
                                        key={index}
                                        variants={videoItemVariants}
                                        whileHover={{ scale: 1.02 }} // Slightly enlarge on hover
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="flex items-center gap-2"
                                    >
                                        <div>
                                            <VideoCircle
                                                size="28"
                                                color="currentColor"
                                                className="text-primary dark:text-primary-light"
                                                variant="Bold"
                                            />
                                        </div>
                                        <p
                                            className={`font-bold text-sm ${selectedVideo == video.videoUrl &&
                                                "text-primary dark:text-primary-light"
                                                } hover:text-primary cursor-pointer transition`}
                                            onClick={() => {
                                                setVideoUrlAsEmbedded(video.videoUrl);
                                                setSelectedVideoId(video.id);
                                                setSelectedVideoDuration(video.videoDuration);
                                            }}
                                        >
                                            {index + 1}- {video.title}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Course Details Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={`details ${selectedVideo ? "col-span-3" : "col-span-3 md:col-span-1"
                                } bg-white dark:bg-dark-light rounded-xl`}
                        >
                            <div className="bg-white dark:bg-dark-light rounded-xl p-5">
                                <h3 className="text-2xl text-primary dark:text-primary-light font-bold mb-5">
                                    تفاصيل الكورس
                                </h3>
                                <div className="flex flex-col justify-center items-center gap-5 mb-5">
                                    {/* Author */}
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-lg font-bold flex items-center flex-wrap gap-1">
                                            <User
                                                size="24"
                                                color="currentColor"
                                                className="text-primary dark:text-primary-light"
                                                variant="Bold"
                                            />
                                            بواسطة
                                        </div>
                                        <p className="font-bold">{course?.author}</p>
                                    </div>
                                    {/* Number of Videos */}
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-lg font-bold flex items-center flex-wrap gap-1">
                                            <Play
                                                size="24"
                                                color="currentColor"
                                                className="text-primary dark:text-primary-light"
                                                variant="Bold"
                                            />
                                            عدد الدروس
                                        </div>
                                        <p className="font-bold">
                                            <span className="text-danger">{course?.courseVideosCount}</span> فيديو
                                        </p>
                                    </div>
                                    {/* Language */}
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-lg font-bold flex items-center flex-wrap gap-1">
                                            <Global
                                                size="24"
                                                color="currentColor"
                                                className="text-primary dark:text-primary-light"
                                                variant="Bold"
                                            />
                                            اللغه
                                        </div>
                                        <p className="font-bold">{course?.courseLanguage}</p>
                                    </div>
                                    {/* Rating */}
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-lg font-bold flex items-center flex-wrap gap-1">
                                            <Star1
                                                size="24"
                                                color="currentColor"
                                                className="text-primary dark:text-primary-light"
                                                variant="Bold"
                                            />
                                            التقييم
                                        </div>
                                        <div className="font-bold">
                                            <RatingStars
                                                initialRating={course?.rating}
                                                allowSelection={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {!selectedVideo && (
                                    <div className="button flex justify-center items-center mt-8">
                                        <button
                                            onClick={() =>
                                                course?.videos[0].videoUrl &&
                                                setVideoUrlAsEmbedded(course?.videos[0].videoUrl)
                                            }
                                            className="bg-primary hover:bg-primary-dark text-white rounded-lg py-3 px-10"
                                        >
                                            ابدأ
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Additional Course Details Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-5"
                    >
                        {/* Category Section */}
                        <div className="bg-white dark:bg-dark-light rounded-xl p-5">
                            <h3 className="text-2xl text-primary dark:text-primary-light font-bold mb-5">
                                التصنيف
                            </h3>
                            <p className="text-lg font-bold">{course?.category.name}</p>
                            <p className="text-muted-dark dark:text-muted">
                                {course?.category.description}
                            </p>
                        </div>

                        {/* Progress Section */}
                        <div className="mt-5 bg-white dark:bg-dark-light rounded-xl p-6 shadow-sm">
                            <h3 className="text-2xl text-primary dark:text-primary-light font-bold mb-5">
                                التقدم
                            </h3>
                            <div className="space-y-4">
                                {/* Video Progress */}
                                <div>
                                    <p className="font-semibold text-muted-dark dark:text-muted-dark-alt mb-2">
                                        معدل مشاهدة الفيديو:
                                    </p>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${courseProgress?.videoProgress}%`,
                                        }}
                                        transition={{ duration: 1 }}
                                        className="relative w-full bg-track dark:bg-track-dark rounded-full h-3 overflow-hidden"
                                    >
                                        <div
                                            className="h-full bg-primary-light dark:bg-primary-light rounded-full"
                                        ></div>
                                    </motion.div>
                                    <p className="text-sm text-muted dark:text-muted-dark-alt mt-1">
                                        {Math.floor(courseProgress?.videoProgress || 0)}%
                                    </p>
                                </div>
                                {/* Overall Progress */}
                                <div>
                                    <p className="font-semibold text-muted-dark dark:text-muted-dark-alt mb-2">
                                        التقدم العام:
                                    </p>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${courseProgress?.overallProgress}%`,
                                        }}
                                        transition={{ duration: 1 }}
                                        className="relative w-full bg-track dark:bg-track-dark rounded-full h-3 overflow-hidden"
                                    >
                                        <div
                                            className="h-full bg-success dark:bg-green-500 rounded-full"
                                        ></div>
                                    </motion.div>
                                    <p className="text-sm text-muted dark:text-muted-dark-alt mt-1">
                                        {Math.floor(courseProgress?.overallProgress || 0)}%
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-between text-muted-dark dark:text-muted text-sm">
                                    <p>
                                        <strong>الفيديوهات المكتملة:</strong>{" "}
                                        <span className="text-success">
                                            {courseProgress?.completedVideos}
                                        </span>{" "}
                                        / {courseProgress?.totalVideos}
                                    </p>
                                    <p>
                                        <strong>الفيديوهات المتبقية:</strong>{" "}
                                        <span className="text-danger">
                                            {courseProgress?.remainingVideos}
                                        </span>
                                    </p>
                                </div>
                                <p className="flex items-center gap-1">
                                    <strong>مؤهل للاختبار:</strong>
                                    <span
                                        className={`ml-2 font-semibold ${courseProgress?.isEligibleForQuiz
                                            ? "text-success"
                                            : "text-danger"
                                            }`}
                                    >
                                        {courseProgress?.isEligibleForQuiz ? " نعم " : " لا "}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Quizzes Section */}
                        {courseProgress?.isEligibleForQuiz ? (
                            <div className="mt-5 bg-white dark:bg-dark-light rounded-xl p-5">
                                <h3 className="text-2xl text-primary dark:text-primary-light font-bold mb-5">
                                    الاختبارات
                                </h3>
                                {course?.quizzes.length ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col gap-5"
                                    >
                                        {course?.quizzes.map((quiz) => (
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                key={quiz.id}
                                            >
                                                <Link
                                                    to={`/quizzes/${quiz.id}`}
                                                    className="flex items-center gap-2 group"
                                                >
                                                    <div>
                                                        <DocumentText1
                                                            size="28"
                                                            color="currentColor"
                                                            className="text-primary dark:text-primary-light"
                                                            variant="Bold"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-bold group-hover:text-primary dark:group-hover:text-primary-light text-sm">
                                                            {quiz.name}
                                                        </p>
                                                        <p className="text-muted-dark dark:text-muted">
                                                            {quiz.description}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <p className="text-muted-dark">لا يوجد اختبارات حتى الآن.</p>
                                )}
                            </div>
                        ) : (
                            <div className="mt-5 bg-white dark:bg-dark-light rounded-xl p-5">
                                <h3 className="text-2xl text-primary dark:text-primary-light font-bold mb-5">
                                    الاختبارات
                                </h3>
                                <p className="text-muted-dark dark:text-muted">
                                    لم تكمل على الأقل 80% من المادة الدراسية.
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Reviews Section */}
                    <ReviewsSection reviews={course?.review} />
                </motion.div>
            )}
        </div>
    );
}

export default Course