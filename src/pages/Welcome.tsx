import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import welcomeBg from "../assets/welcome.png";

const Welcome = () => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-main bg-cover bg-center"
            style={{ backgroundImage: `url(${welcomeBg})` }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 flex min-h-main w-full justify-center items-center text-white text-center">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="content flex flex-col gap-8 justify-center items-center p-8"
                >
                    <motion.h1
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-3xl font-bold"
                    >
                        {t("zad-elealm")}
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        className="text-lg sm:w-3/5 m-auto"
                    >
                        {t("zad-desc")}
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                        className="text-lg"
                    >
                        {t("zad-hadith")}
                    </motion.p>

                    {/* Animated Button */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                    >
                        <Link
                            to="/home"
                            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-10 rounded-lg mt-5 transition-all duration-300 shadow-lg"
                        >
                            {t("get-started")}
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Welcome;
