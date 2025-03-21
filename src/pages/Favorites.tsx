import { Heart, Play } from 'iconsax-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/item.jpeg";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getFavoritesForUserAsync, removeFavoriteCourseAsync } from '../store/slices/favorites';
import { notify } from '../utils/notify';
import NoData from '../components/NoData';
import { motion } from 'framer-motion';

const Favorites = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useSelector((state: RootState) => state.auth);
    const state = useSelector((state: RootState) => state.favorites);
    const favoritesCourses = state.favoriteCourses || [];

    useEffect(() => {
        if (token) {
            dispatch(getFavoritesForUserAsync({ token }));
        }
    }, [token, dispatch]);

    const handleRemoveFavCourse = (courseId: number) => {
        if (token) {
            dispatch(removeFavoriteCourseAsync({ token, courseId })).then(() => {
                dispatch(getFavoritesForUserAsync({ token }));
            });
            notify("تم إزالة المادة من المفضلة بنجاح", "success");
        }
    };

    // Variants for animating the favorites grid
    const favoritesContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Delay between each child animation
            },
        },
    };

    // Variants for animating individual favorite course cards
    const favoriteCardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="dark:bg-dark dark:text-white">
            <div className="container min-h-main">
                {/* Page Title Animation */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="py-10"
                >
                    <h2 className="text-2xl font-bold">
                        المفضلة <span className='text-danger'>({state.allFavoriteCourses || 0})</span>
                    </h2>
                </motion.div>

                {/* Display message if no favorites */}
                {favoritesCourses.length === 0 ? (
                    <div className="">
                        <NoData />
                    </div>
                ) : (
                    // Animate the favorites grid container
                    <motion.div
                        variants={favoritesContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                    >
                        {favoritesCourses.map((course) => (
                            // Animate individual favorite course cards
                            <motion.div
                                key={course.id}
                                variants={favoriteCardVariants}
                                whileHover={{
                                    scale: 1.02, // Slightly enlarge on hover
                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white dark:bg-dark-light rounded-lg overflow-hidden shadow hover:shadow-md transition"
                            >
                                <Link to={`/courses/${course.id}`} className="block">
                                    <div className="relative">
                                        <img
                                            src={course.imageUrl || image}
                                            alt={course.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <motion.button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleRemoveFavCourse(course.id);
                                            }}
                                            whileTap={{ scale: 0.9 }} // Shrink slightly when clicked
                                            className="absolute top-3 right-3 bg-white dark:bg-dark-light p-2 rounded-full z-10"
                                        >
                                            <Heart size="20" variant="Bold" color="#E63946" />
                                        </motion.button>
                                    </div>

                                    {/* Course Details */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold truncate">{course.name}</h3>
                                        <p className="text-sm text-dark-lighter dark:text-muted mt-1">
                                            {course.author}
                                        </p>
                                        <p className="text-sm text-dark-lighter dark:text-gray mt-2 flex items-center gap-1">
                                            <Play size="18" color="currentColor" variant="Bold" />
                                            <span className="text-danger font-bold">{course.courseVideosCount}</span> فيديو
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Favorites;