import { DocumentText1, Global, Play, Star, Star1, User, VideoCircle } from "iconsax-react"
import RatingStars from "../components/RatingStars"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getCourseDetails } from "../store/slices/courses";
import { CourseWithReviews } from "../interfaces";
import Loading from "../components/Loading";

const Course = () => {
    const { id } = useParams<{ id: string }>()
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>()
    const { token } = useSelector((state: RootState) => state.auth)
    const state = useSelector((state: RootState) => state.courses)
    const course: CourseWithReviews | null = state.course || null;

    const setVideoUrlAsEmbedded = (url: string) => {
        setSelectedVideo(url)
    }
    const convertToEmbedUrl = (url: string) => {
        const videoId = url.split('v=')[1]; // Extract the video ID
        return `https://www.youtube.com/embed/${videoId}`;
    };

    useEffect(() => {
        if (id && token) {
            dispatch(getCourseDetails({ token, id }))
        }
    }, [id, token, dispatch]);

    return (
        <div className="dark:bg-dark dark:text-white">
            {state.loading ? <div className="h-main">
                <Loading />
            </div> :
                <div className="container min-h-main pb-10">
                    <div className="py-10">
                        <h2 className="text-2xl font-bold ">{course?.name}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Video Player Section */}
                        {selectedVideo && (
                            <div className="videos col-span-2 bg-white rounded-xl p-5">
                                {/* Embedded YouTube Video */}
                                <div className="mb-5">
                                    <iframe
                                        className="w-full aspect-video rounded-lg"
                                        src={convertToEmbedUrl(selectedVideo)}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}
                        <div className={`videos h-[520px] overflow-y-scroll ${selectedVideo ? "col-span-1" : "col-span-2"} bg-white rounded-xl p-5`}>
                            <h3 className="text-2xl text-primary font-bold mb-5">الفيديوهات</h3>
                            <div className="flex flex-col justify-center gap-5">
                                {course?.videos.map((video, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="">
                                            <VideoCircle size="28" color="currentColor" className="text-primary" variant="Bold" />
                                        </div>
                                        <p
                                            className={`font-bold text-sm ${selectedVideo == video.videoUrl && "text-primary"} hover:text-primary cursor-pointer transition`}
                                            onClick={() => setVideoUrlAsEmbedded(video.videoUrl)}
                                        >
                                            {index + 1}- {" "}
                                            {video.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`details col-span-1 ${selectedVideo && "col-span-3"} bg-white rounded-xl`}>
                            <div className=" bg-white rounded-xl p-5">
                                <h3 className="text-2xl text-primary font-bold mb-5">تفاصيل الكورس</h3>
                                <div className="flex flex-col justify-center items-center gap-5 mb-5">
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-lg font-bold flex items-center gap-1">
                                            <User size="24" color="currentColor" className="text-primary" variant="Bold" />
                                            بواسطة
                                        </p>
                                        <p className="font-bold">{course?.author}</p>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-lg font-bold flex items-center gap-1">
                                            <Play size="24" color="currentColor" className="text-primary" variant="Bold" />
                                            عدد الدروس
                                        </p>
                                        <p className="font-bold"><span className="text-danger">{course?.courseVideosCount}</span> فيديو</p>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-lg font-bold flex items-center gap-1">
                                            <Global size="24" color="currentColor" className="text-primary" variant="Bold" />
                                            اللغه
                                        </p>
                                        <p className="font-bold">{course?.courseLanguage}</p>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-lg font-bold flex items-center gap-1">
                                            <Star1 size="24" color="currentColor" className="text-primary" variant="Bold" />
                                            التقييم
                                        </p>
                                        <p className="font-bold">
                                            <RatingStars initialRating={course?.rating} allowSelection={false} />
                                        </p>
                                    </div>
                                </div>
                                <div className="button flex justify-center items-center mt-8">
                                    <button onClick={() => course?.videos[0].videoUrl && setVideoUrlAsEmbedded(course?.videos[0].videoUrl)} className="bg-primary hover:bg-primary-dark text-white rounded-lg py-3 px-10">ابدأ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Additional Course Details Section */}
                    <div className="mt-5">
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> */}
                        <div className="">
                            {/* Category Section */}
                            <div className="bg-white rounded-xl p-5">
                                <h3 className="text-2xl text-primary font-bold mb-5">التصنيف</h3>
                                <p className="text-lg font-bold">{course?.category.name}</p>
                                <p className="text-gray-600">{course?.category.description}</p>
                            </div>
                        </div>
                        {/* Quizzes Section */}
                        <div className="mt-5 bg-white rounded-xl p-5">
                            <h3 className="text-2xl text-primary font-bold mb-5">الاختبارات</h3>
                            <div className="flex flex-col gap-5">
                                {course?.quizzes.map((quiz) => (
                                    <Link to={`/quizzes/${quiz.id}`} key={quiz.id} className="flex items-center gap-2 group">
                                        <div className="">
                                            <DocumentText1 size="28" color="currentColor" className="text-primary" variant="Bold" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold group-hover:text-primary text-sm">{quiz.name}</p>
                                            <p className=" text-muted"> {quiz.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {/* Reviews Section */}
                        <div className="mt-5 bg-white rounded-xl p-5">
                            <h3 className="text-2xl text-primary font-bold mb-5">التقييمات</h3>
                            <div className="flex flex-col gap-5">
                                {course?.review && course.review.length > 0 ? (
                                    course?.review.map((review) => (
                                        <div key={review.id} className="flex items-center gap-2">
                                            <div className="">
                                                <Star size="28" color="currentColor" className="text-primary" variant="Bold" />
                                            </div>
                                            <p className="font-bold text-sm">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600">لا توجد تقييمات حتى الآن.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >)
}

export default Course