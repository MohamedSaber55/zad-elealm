import { Global, Play, Star1 } from "iconsax-react";
import { Link } from "react-router-dom";

const userCourses = [
    {
        "id": 1,
        "name": "برنامج \" 3 دقائق مع علاء حامد \" (الموسم الثاني )",
        "description": "",
        "author": "Alaa Hamed - علاء حامد",
        "courseLanguage": "العربي",
        "courseVideosCount": 31,
        "rating": 0.00,
        "imageUrl": "https://i.ytimg.com/vi/tdOCkSvoH8k/hqdefault.jpg",
        "createdAt": "2025-03-08T04:33:05.6944797"
    },
    {
        "id": 2,
        "name": "معوقات الطريق إلي الله",
        "description": "",
        "author": "Alaa Hamed - علاء حامد",
        "courseLanguage": "العربي",
        "courseVideosCount": 14,
        "rating": 0.00,
        "imageUrl": "https://i.ytimg.com/vi/aX6z-mH3gPg/hqdefault.jpg",
        "createdAt": "2025-03-08T04:33:20.2984143"
    },
    {
        "id": 3,
        "name": "دروس منوعة",
        "description": "",
        "author": "Alaa Hamed - علاء حامد",
        "courseLanguage": "العربي",
        "courseVideosCount": 37,
        "rating": 0.00,
        "imageUrl": "https://i.ytimg.com/vi/lKkrC-aAq1M/hqdefault.jpg",
        "createdAt": "2025-03-08T04:33:32.671878"
    },
    {
        "id": 4,
        "name": "أساسيات الطريق إلي الله",
        "description": "",
        "author": "Alaa Hamed - علاء حامد",
        "courseLanguage": "العربي",
        "courseVideosCount": 21,
        "rating": 0.00,
        "imageUrl": "https://i.ytimg.com/vi/Mq84UmqumaM/hqdefault.jpg",
        "createdAt": "2025-03-08T04:33:45.974587"
    }
];

const UserCourses = () => {
    return (
        <div className="dark:bg-dark dark:text-white">
            <div className="container min-h-main py-10">
                <h2 className="text-2xl font-bold mb-6">كورساتي</h2>

                <div className="flex flex-col gap-6">
                    {userCourses.map((course) => (
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
                                            <Play size="20" className="text-primary" color="currentColor"  variant="Bold" />
                                            <span>عدد الدروس: {course.courseVideosCount}</span>
                                        </p>

                                        <p className="flex items-center gap-1">
                                            <Global size="20" className="text-primary" color="currentColor"  variant="Bold" />
                                            <span>اللغة: {course.courseLanguage}</span>
                                        </p>

                                        <p className="flex items-center gap-1">
                                            <Star1 size="20" className="text-primary" color="currentColor" variant="Bold" />
                                            <span>التقييم: {course.rating.toFixed(1)} ⭐</span>
                                        </p>
                                    </div>
                                </div>

                                {/* <div className=""> */}
                                    <Link
                                        to={`/courses/${course.id}`}
                                        className="w-fit bg-primary hover:bg-primary-dark text-light py-2 px-5 rounded-md text-center"
                                    >
                                        الذهاب إلى الكورس
                                    </Link>
                                {/* </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserCourses;
