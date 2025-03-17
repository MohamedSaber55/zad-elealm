import { Heart, Play } from 'iconsax-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/item.jpeg"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getFavoritesForUserAsync, removeFavoriteCourseAsync } from '../store/slices/favorites';
import { notify } from '../utils/notify';
import NoData from '../components/NoData';

const Favorites = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { token } = useSelector((state: RootState) => state.auth)
    const state = useSelector((state: RootState) => state.favorites)
    const favoritesCourses = state.favoriteCourses;
    useEffect(() => {
        if (token) {
            dispatch(getFavoritesForUserAsync({ token }))
        }
    }, [token, dispatch])

    const handleRemoveFavCourse = (courseId: number) => {
        if (token) {
            dispatch(removeFavoriteCourseAsync({ token, courseId })).then(() => {
                dispatch(getFavoritesForUserAsync({ token }))
            })
            notify(" تم إزالة المادة من المفضلة بنجاح", "success")
        }
    }
    return (
        <div className="dark:bg-dark dark:text-white">
            <div className="container min-h-main">
                <div className="py-10">
                    <h2 className="text-2xl font-bold">المفضلة <span className='text-danger'>({state.allFavoriteCourses})</span></h2>
                </div>
                {/* Display message if no favorites */}
                {favoritesCourses.length === 0 ? (
                    <div className="">
                        <NoData />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {favoritesCourses.map((course) => (
                            <Link to={`/courses/${course.id}`} key={course.id} className="bg-white dark:bg-dark-light rounded-lg overflow-hidden shadow hover:shadow-md transition">
                                <div className="relative">
                                    <img src={image} alt={course.name} className="w-full h-48 object-cover" />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRemoveFavCourse(course.id);
                                        }}
                                        className="absolute top-3 right-3 bg-white dark:bg-dark-light p-2 rounded-full z-10"
                                    >
                                        <Heart
                                            size="20"
                                            variant={"Bold"}
                                            color={"#E63946"}
                                        />
                                    </button>
                                </div>

                                {/* Course Details */}
                                <div className="p-4">
                                    <h3 className="text-lg font-bold truncate">{course.name}</h3>
                                    <p className="text-sm text-dark-lighter dark:text-muted mt-1">{course.author}</p>
                                    <p className="text-sm text-dark-lighter dark:text-gray mt-2 flex items-center gap-1">
                                        <Play size="18" color="currentColor" variant="Bold" />
                                        <span className="text-danger font-bold">{course.courseVideosCount}</span> فيديو
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorites