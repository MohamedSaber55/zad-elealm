import { Global, Play, Star1, VideoCircle } from "iconsax-react"
import RatingStars from "../components/RatingStars"
import { useState } from "react";

const videos = [
    {
        title: "المدخل إلى الفقه- التعريف والأهداف والأهمية|د.عامر بهجت–1/1- المدخل إلى الفقه الإسلامي–منصة زادي",
        url: "https://www.youtube.com/embed/vVyVLYeyupU" // Replace with actual video ID
    },
    {
        title: "الدرس الثاني: الفقه الإسلامي ومصادره",
        url: "https://www.youtube.com/embed/drOhitxCjhM" // Replace with actual video ID
    },
    {
        title: "تطور الفقه عبر العصور",
        url: "https://www.youtube.com/embed/DB8i1kyXkWc" // Replace with actual video ID
    }
];

const Course = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <div className="dark:bg-dark dark:text-white">
            <div className="container min-h-main">
                <div className="py-10">
                    <h2 className="text-2xl font-bold ">المدخل الي الفقه الاسلامي</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Video Player Section */}
                    {selectedVideo && (
                        <div className="videos col-span-2 bg-white rounded-xl p-5">
                            {/* Embedded YouTube Video */}
                            <div className="mb-5">
                                <iframe
                                    className="w-full aspect-video rounded-lg"
                                    src={selectedVideo}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                    <div className={`videos ${selectedVideo ? "col-span-1" : "col-span-2"} bg-white rounded-xl p-5`}>
                        <h3 className="text-2xl text-primary font-bold mb-5">الفيديوهات</h3>
                        <div className="flex flex-col justify-center gap-5">
                            {videos.map((video, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="">
                                        <VideoCircle size="28" color="currentColor" className="text-primary" variant="Bold" />
                                    </div>
                                    <p
                                        className={`font-bold text-sm ${selectedVideo == video.url && "text-primary"} hover:text-primary cursor-pointer transition`}
                                        onClick={() => setSelectedVideo(video.url)}
                                    >
                                        {index + 1}- {" "}
                                        {video.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {!selectedVideo && (
                        <div className="details col-span-1">
                            <div className=" bg-white rounded-xl p-5">
                                <h3 className="text-2xl text-primary font-bold mb-5">تفاصيل الكورس</h3>
                                <div className="flex flex-col justify-center items-center gap-5 mb-5">
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-lg font-bold flex items-center gap-1">
                                            <Play size="24" color="currentColor" className="text-primary" variant="Bold" />
                                            عدد الدروس
                                        </p>
                                        <p className="font-bold"><span className="text-danger">12</span> فيديو</p>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-lg font-bold flex items-center gap-1">
                                            <Global size="24" color="currentColor" className="text-primary" variant="Bold" />
                                            اللغه
                                        </p>
                                        <p className="font-bold">عربي</p>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-lg font-bold flex items-center gap-1">
                                            <Star1 size="24" color="currentColor" className="text-primary" variant="Bold" />
                                            التقييم
                                        </p>
                                        <p className="font-bold">
                                            <RatingStars initialRating={4} allowSelection={false} />
                                        </p>
                                    </div>
                                </div>
                                <div className="button flex justify-center items-center mt-8">
                                    <button onClick={() => setSelectedVideo(videos[0].url)} className="bg-primary hover:bg-primary-dark text-white rounded-lg py-3 px-10">ابدأ</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>)
}

export default Course