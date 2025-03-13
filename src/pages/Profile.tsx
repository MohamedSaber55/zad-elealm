import { Edit, Logout } from "iconsax-react";
import { Link } from "react-router-dom";

const user = {
    name: "محمد أحمد",
    email: "mohamed@example.com",
    role: "طالب",
    avatar: "https://i.ytimg.com/vi/tdOCkSvoH8k/hqdefault.jpg", // Replace with real user image
};

const userCourses = [
    {
        id: 1,
        name: 'برنامج " 3 دقائق مع علاء حامد " (الموسم الثاني )',
        author: "Alaa Hamed - علاء حامد",
        courseLanguage: "العربي",
        courseVideosCount: 31,
        rating: 0.0,
        imageUrl: "https://i.ytimg.com/vi/tdOCkSvoH8k/hqdefault.jpg",
    }
];

const Profile = () => {
    return (
        <div className="dark:bg-dark dark:text-white min-h-main py-10">
            <div className="container">
                {/* Profile Info */}
                <div className="bg-white border border-gray dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
                    <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full mb-4" />
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>

                    <div className="flex gap-3 mt-4">
                        <Link
                            to="/edit-profile"
                            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm"
                        >
                            <Edit size="18" />
                            تعديل الحساب
                        </Link>
                        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
                            <Logout size="18" />
                            تسجيل الخروج
                        </button>
                    </div>
                </div>

                {/* User Courses */}
                <h3 className="text-2xl font-bold mt-10 mb-6">كورساتي</h3>
                <div className="flex flex-col gap-6">
                    {userCourses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm flex flex-col sm:flex-row"
                        >
                            <img src={course.imageUrl} alt={course.name} className="w-full sm:w-52 h-40 object-cover" />

                            <div className="p-4 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="text-lg font-bold text-primary">{course.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{course.author}</p>

                                    <div className="flex flex-wrap gap-3 text-sm mt-2">
                                        <p className="flex items-center gap-1">🎥 {course.courseVideosCount} دروس</p>
                                        <p className="flex items-center gap-1">🌍 {course.courseLanguage}</p>
                                        <p className="flex items-center gap-1">⭐ {course.rating.toFixed(1)}</p>
                                    </div>
                                </div>

                                <Link
                                    to={`/courses/${course.id}`}
                                    className="mt-4 w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg text-center"
                                >
                                    الذهاب إلى الكورس
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
