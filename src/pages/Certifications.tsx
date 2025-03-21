import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { getUserCertificatesAsync } from "../store/slices/certificates";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import { DocumentDownload } from "iconsax-react";
import { formatDateTime } from "../utils/formatDateTime";
import certificateImage from "../assets/congrates.png";
// Import Framer Motion components
import { motion } from "framer-motion";

const CertificationsPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useSelector((state: RootState) => state.auth);
    const state = useSelector((state: RootState) => state.certificates);
    const certificates = state.certificates || [];

    useEffect(() => {
        if (token) {
            dispatch(getUserCertificatesAsync({ token }));
        }
    }, [token, dispatch]);

    // Variants for animating the certificates grid
    const certificatesContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Delay between each child animation
            },
        },
    };

    // Variants for animating individual certificate cards
    const certificateCardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="bg-light-bg dark:bg-dark dark:text-white min-h-main p-6">
            {state.loading ? (
                <div className="h-main flex justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <div className="container mx-auto">
                    {/* Page Title with Fade-in Animation */}
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold mb-8"
                    >
                        {t("certificates.certificates")}
                    </motion.h2>

                    {certificates.length === 0 ? (
                        <NoData />
                    ) : (
                        // Animate the certificates grid container
                        <motion.div
                            variants={certificatesContainerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
                        >
                            {certificates.map((certificate) => (
                                // Animate individual certificate cards
                                <motion.div
                                    key={certificate.id}
                                    variants={certificateCardVariants}
                                    whileHover={{
                                        scale: 1.02, // Slightly enlarge the card on hover
                                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
                                    }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="bg-white dark:bg-dark-light rounded-lg overflow-hidden border border-primary shadow-sm hover:shadow-md transition"
                                >
                                    {/* Certificate Image */}
                                    <img
                                        src={certificateImage}
                                        alt="Certificate"
                                        className="w-full aspect-video object-cover"
                                    />

                                    {/* Certificate Details */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold truncate text-primary-dark dark:text-white">
                                            {certificate.name}
                                        </h3>
                                        <p className="text-sm text-muted-dark dark:text-gray mt-1">
                                            {certificate.description}
                                        </p>
                                        <p className="text-sm text-muted-dark dark:text-gray mt-2">
                                            <span className="font-semibold">الدورة:</span> {certificate.quizName}
                                        </p>
                                        <p className="text-sm text-muted-dark dark:text-gray mt-2">
                                            <span className="font-semibold">تاريخ الإصدار:</span>{" "}
                                            {certificate.completedDate === "0001-01-01T00:00:00"
                                                ? "غير متاح"
                                                : formatDateTime(certificate.completedDate, {
                                                    isArabic: true,
                                                    showDate: true,
                                                    showTime: true,
                                                })}
                                        </p>

                                        <a
                                            href={certificate.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300"
                                        >
                                            <DocumentDownload size="20" color="white" />
                                            تحميل الشهادة
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CertificationsPage;