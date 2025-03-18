import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { getUserCertificatesAsync } from "../store/slices/certificates";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import { DocumentDownload } from "iconsax-react";
import { formatDateTime } from "../utils/formatDateTime";
// import certificateImage from "../assets/certificateImage.webp";
import certificateImage from "../assets/congrates.png";
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

    return (
        <div className="bg-light-bg dark:bg-dark min-h-main p-6">
            {state.loading ? (
                <div className="h-main flex justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <div className="container mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-primary-dark dark:text-white">
                            {t("certificates.certificates")}
                        </h2>
                    </div>

                    {certificates.length === 0 ? (
                        <NoData />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                            {certificates.map((certificate) => (
                                <div
                                    key={certificate.id}
                                    className="bg-white dark:bg-dark-light rounded-lg overflow-hidden border border-primary shadow-sm hover:shadow-md transition"
                                >
                                    {/* Certificate Image */}
                                    <img src={certificateImage} alt="Certificate" className="w-full aspect-video object-cover" />

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
                                                : formatDateTime(certificate.completedDate, { isArabic: true, showDate: true, showTime: true })}
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
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CertificationsPage;
