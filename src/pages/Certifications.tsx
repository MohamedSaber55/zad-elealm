import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // For navigation

const CertificationsPage = () => {
    const {t} = useTranslation();   
    // Sample certificates data (replace with props or API fetch)
    const certificatesData = [
        {
            id: 1,
            name: "شهادة اجتياز الفقه الإسلامي",
            description: "تم منح هذه الشهادة لإتمام الفقه الإسلامي بنجاح",
            pdfUrl: "/certificates/certificate_638770027682653498.pdf",
            completedDate: "2023-10-01T00:00:00", // Updated to a valid date
            userName: "Youssef Ahmed",
            quizName: "الفقه الإسلامي",
        },
        {
            id: 2,
            name: "شهادة اجتياز التفسير العلمي",
            description: "تم منح هذه الشهادة لإتمام التفسير العلمي بنجاح",
            pdfUrl: "/certificates/certificate_638770027682653499.pdf",
            completedDate: "2023-09-15T00:00:00", // Updated to a valid date
            userName: "Youssef Ahmed",
            quizName: "التفسير العلمي",
        },
        // Add more certificates as needed
    ];

    return (
        <div className="dark:bg-dark bg-light-bg min-h-main">
            <div className="container">
                <div className="py-10">
                    <h2 className="text-2xl font-bold">{t("certificates.certificates")}</h2>
                </div>
                {/* Display message if no certificates */}
                {certificatesData.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-lg text-muted dark:text-gray">لا توجد شهادات متاحة.</p>
                        <Link
                            to="/home"
                            className="mt-4 inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300"
                        >
                            تصفح الدورات
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {certificatesData.map((certificate) => (
                            <div
                                key={certificate.id}
                                className="bg-white dark:bg-dark-light rounded-lg overflow-hidden shadow hover:shadow-md transition"
                            >
                                {/* Certificate Details */}
                                <div className="p-4">
                                    <h3 className="text-lg font-bold truncate text-primary-dark dark:text-white">
                                        {certificate.name}
                                    </h3>
                                    <p className="text-sm text-muted dark:text-gray mt-1">
                                        {certificate.description}
                                    </p>
                                    <p className="text-sm text-muted dark:text-gray mt-2">
                                        <span className="font-semibold">الدورة:</span> {certificate.quizName}
                                    </p>
                                    <p className="text-sm text-muted dark:text-gray mt-2">
                                        <span className="font-semibold">تاريخ الإصدار:</span>{" "}
                                        {new Date(certificate.completedDate).toLocaleDateString("ar-EG")}
                                    </p>
                                    {/* Download Button */}
                                    <a
                                        href={"https://zadelealm.runasp.net" + certificate.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-block px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300"
                                    >
                                        تحميل الشهادة
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificationsPage;