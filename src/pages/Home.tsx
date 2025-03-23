import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { currentCategoryName, getAllCategoriesAsync } from "../store/slices/categories";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import { ArrowDown } from "iconsax-react";
import welcomeBg from "../assets/welcome.png";
import { getUserProfileAsync } from "../store/slices/auth";

const Home = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useSelector((state: RootState) => state.auth);
    const state = useSelector((state: RootState) => state.categories);
    const categories = state?.categories || [];

    useEffect(() => {
        if (token) {
            dispatch(
                getAllCategoriesAsync({
                    token,
                })
            );
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (token) {
            dispatch(
                getUserProfileAsync({
                    token,
                })
            );
        }
    }, [dispatch, token]);

    // Function to handle smooth scrolling
    const scrollToCategories = () => {
        const categoriesSection = document.getElementById("categories-section");
        if (categoriesSection) {
            categoriesSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="dark:bg-dark dark:text-white pb-10">
            {/* Here Section */}
            <div className="h-screen py-14 px-4 sm:px-8 md:px-14 dark:bg-dark">
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    // animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "keyframes",duration: 0.8 }}
                    // transition={{ delay: 0.2, duration: 0.8 }}
                    className="h-full rounded-4xl bg-primary bg-cover bg-center border dark:border-muted-green flex flex-col gap-6 justify-center items-center text-center py-20 shadow-2xl"
                    style={{ backgroundImage: `url(${welcomeBg})` }}
                >                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-3xl sm:text-4xl font-bold text-white "
                >
                        {t("home.welcome")}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-4 text-lg sm:text-xl text-light"
                    >
                        {t("home.subtitle")}
                    </motion.p>
                    {/* Bouncing Arrow */}
                    <motion.div
                        onClick={scrollToCategories}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="mt-8 cursor-pointer animate-bounce"
                    >
                        {/* <ArrowDown size={60} color="currentColor" className="text-primary" /> */}
                        <ArrowDown size={60} color="currentColor" className="text-muted-green" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Categories Section */}
            <div id="categories-section" className="container min-h-main pt-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-2xl font-bold"
                >
                    {t("home.categories")}
                </motion.h2>

                {state.loading ? (
                    <div className="h-80 flex justify-center items-center">
                        <Loading />
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
                        }}
                    >
                        {categories.map((category) => (
                            <motion.div
                                key={category.id}
                                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                                className="overflow-hidden rounded-lg"
                            >
                                <Link
                                    to={`/materials/${category.id}`}
                                    onClick={() => dispatch(currentCategoryName(category.name))}
                                    className="relative overflow-hidden rounded-lg shadow-lg group"
                                >
                                    <div
                                        className="bg-cover rounded-lg bg-center min-h-40 transition-transform duration-500 transform group-hover:scale-110"
                                        style={{ backgroundImage: `url(${category.imageUrl})` }}
                                    />
                                    <div className="absolute inset-0 bg-black/60 rounded-lg flex justify-center items-center">
                                        <h3 className="text-lg font-bold text-white transition-opacity duration-300 group-hover:opacity-80">
                                            {category.name}
                                        </h3>
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

export default Home;