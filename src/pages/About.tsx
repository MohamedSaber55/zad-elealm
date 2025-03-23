import { motion } from "framer-motion"; // Import Framer Motion
import {
    Book,
    Medal,
    MessageQuestion,
    DocumentLike,
    ArrowRight2,
    Star,
} from "iconsax-react";
import learningImg from "./../assets/welcome.png"; // Replace with an appropriate image
import whyUsBg from "./../assets/desk.jpg"; // Background image for Why Us section
import calenderIcon from "./../assets/icons/calendar.png";
import levelsIcon from "./../assets/icons/levels.png";
import certificateIcon from "./../assets/icons/certificate.png";
import mobileIcon from "./../assets/icons/mobile.png";

// New images
import hadithImage1 from "./../assets/about/1.png";
import hadithImage2 from "./../assets/about/2.png";
import hadithImage3 from "./../assets/about/3.png";
import hadithImage4 from "./../assets/about/4.png";
import hadithImage5 from "./../assets/about/5.png";
import hadithImage6 from "./../assets/about/6.png";

const AboutPage = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } },
    };

    return (
        <div className="dark:bg-dark dark:text-white py-10 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <motion.header
                    className="text-center mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                        <Book size={32} color="currentColor" className="text-primary" /> من نحن
                    </h1>
                    <p className="text-muted-dark dark:text-muted text-lg">
                        منصة <strong>زاد العلم</strong> هي وجهتك المثالية لتعلم العلوم الدينية بأسلوب مبتكر وفعال.
                    </p>
                </motion.header>

                {/* Introduction Section */}
                <motion.section
                    className="relative h-[400px] md:h-[400px] rounded-xl mb-6"
                    style={{ backgroundImage: `url(${learningImg})` }}
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <p className="text-light text-center leading-loose absolute inset-0 p-4 flex justify-center items-center text-lg">
                        في زاد العلم، نؤمن بأن التعليم هو أساس النجاح والتقدم. نسعى إلى تقديم دورات دينية شاملة تساعدك على فهم أصول الدين بطريقة سهلة وممتعة. سواء كنت مبتدئًا أو خبيرًا، فإن محتوانا مصمم خصيصًا لتلبية احتياجاتك.
                    </p>
                </motion.section>

                {/* Vision Section */}
                <motion.section
                    className="mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Medal size={24} color="currentColor" className="text-primary" /> رؤيتنا
                    </h2>
                    <p className="text-muted-dark dark:text-muted text-lg">
                        نطمح لأن نكون المنصة الرائدة عالميًا في تعليم العلوم الدينية، حيث يجد كل طالب علم ما يحتاجه لتحقيق أهدافه الروحية والعلمية. نحن نركز على توفير تجربة تعليمية مميزة مع دعم مستمر وتقييم دقيق للتأكد من تحقيق التقدم المطلوب.
                    </p>
                </motion.section>

                {/* How It Works Section */}
                <motion.section
                    className="mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <MessageQuestion size={24} color="currentColor" className="text-primary" /> كيف يعمل زاد العلم؟
                    </h2>
                    <ul className="list-disc list-inside pl-6 text-muted-dark dark:text-muted text-lg">
                        <li>اشترك في الدورات المتاحة واختر ما يناسب مستواك.</li>
                        <li>استمتع بمحتوى غني يتضمن دروسًا مرئية، مواد قراءة، وأسئلة تفاعلية.</li>
                        <li>احصل على تقرير مفصل عن أدائك واقتراحات لتحسين مستواك.</li>
                    </ul>
                </motion.section>

                {/* Why Us Section */}
                <motion.section
                    className="relative bg-cover bg-center rounded-xl md:h-[500px] overflow-hidden mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <img
                        src={whyUsBg}
                        alt="Why Us Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative h-full container px-4 flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold my-10 flex items-center justify-center gap-2 text-white relative after:absolute after:w-24 after:h-[3px] after:bg-warning after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2">
                            <Star size={28} color="currentColor" className="text-warning" /> لماذا
                            <span className="text-warning"> زاد العلم</span>؟
                        </h2>
                        <motion.div
                            className="flex flex-col md:flex-row justify-between items-center text-white text-center md:text-left"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {/* Item 1 */}
                            <motion.div
                                className="my-6 md:my-0 md:w-1/4 flex justify-center items-center flex-col gap-4 text-center border-b md:border-b-0 md:border-e border-warning pb-6 md:pb-0 md:pr-6 last:border-none"
                                variants={fadeInUp}
                            >
                                <div className="w-20 h-20">
                                    <img src={mobileIcon} alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    تعلم من أي مكان على حسب الجدول المناسب لك
                                </h3>
                            </motion.div>
                            {/* Item 2 */}
                            <motion.div
                                className="my-6 md:my-0 md:w-1/4 flex justify-center items-center flex-col gap-4 text-center border-b md:border-b-0 md:border-e border-warning pb-6 md:pb-0 md:pr-6 last:border-none"
                                variants={fadeInUp}
                            >
                                <div className="w-20 h-20">
                                    <img src={calenderIcon} alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    تفاعلًا مباشرًا مع المدرسين، مما يساعدك على التركيز وتحقيق أقصى استفادة من الدروس.
                                </h3>
                            </motion.div>
                            {/* Item 3 */}
                            <motion.div
                                className="my-6 md:my-0 md:w-1/4 flex justify-center items-center flex-col gap-4 text-center border-b md:border-b-0 md:border-e border-warning pb-6 md:pb-0 md:pr-6 last:border-none"
                                variants={fadeInUp}
                            >
                                <div className="w-20 h-20">
                                    <img src={certificateIcon} alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    امتحانات دورية لتقييم تقدمك، بالإضافة إلى شهادات تقدير
                                </h3>
                            </motion.div>
                            {/* Item 4 */}
                            <motion.div
                                className="my-6 md:my-0 md:w-1/4 flex justify-center items-center flex-col gap-4 text-center border-b md:border-b-0 md:border-e border-warning pb-6 md:pb-0 md:pr-6 last:border-none"
                                variants={fadeInUp}
                            >
                                <div className="w-20 h-20">
                                    <img src={levelsIcon} alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    نقدم تعليمًا دينيًا متكاملًا يناسب جميع الأعمار والمستويات، مع التركيز على تقديم محتوى غني ومفيد.
                                </h3>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Certificates Section */}
                <motion.section
                    className="mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <DocumentLike size={24} color="currentColor" className="text-primary" /> الشهادات والإنجازات
                    </h2>
                    <p className="text-muted-dark dark:text-muted text-lg">
                        عند اجتيازك الاختبارات بنجاح، ستتلقى شهادة معتمدة من <strong>زاد العلم</strong> تثبت إنجازاتك. يمكنك استخدام هذه الشهادة لتوثيق مسيرتك التعليمية أو مشاركتها مع الآخرين كدليل على جدك واجتهادك.
                    </p>
                </motion.section>

                {/* Hadith Quotes Section */}
                <motion.section
                    className="mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <MessageQuestion size={24} color="currentColor" className="text-primary" /> أقوال النبي ﷺ
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <motion.div
                            className="bg-white dark:bg-dark p-4 rounded-lg shadow-md"
                            variants={fadeInUp}
                        >
                            <img src={hadithImage1} alt="Hadith 1" className="w-full h-auto" />
                        </motion.div>
                        <motion.div
                            className="bg-white dark:bg-dark p-4 rounded-lg shadow-md"
                            variants={fadeInUp}
                        >
                            <img src={hadithImage2} alt="Hadith 2" className="w-full h-auto" />
                        </motion.div>
                        <motion.div
                            className="bg-white dark:bg-dark p-4 rounded-lg shadow-md"
                            variants={fadeInUp}
                        >
                            <img src={hadithImage3} alt="Hadith 3" className="w-full h-auto" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* Islamic Sciences Section */}
                <motion.section
                    className="mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Book size={24} color="currentColor" className="text-primary" /> خطة دراسة العلوم الشرعية
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <motion.div
                            className="bg-white dark:bg-dark p-4 rounded-lg shadow-md"
                            variants={fadeInUp}
                        >
                            <img src={hadithImage4} alt="Islamic Sciences 1" className="w-full h-auto" />
                        </motion.div>
                        <motion.div
                            className="bg-white dark:bg-dark p-4 rounded-lg shadow-md"
                            variants={fadeInUp}
                        >
                            <img src={hadithImage5} alt="Islamic Sciences 2" className="w-full h-auto" />
                        </motion.div>
                        <motion.div
                            className="bg-white dark:bg-dark p-4 rounded-lg shadow-md"
                            variants={fadeInUp}
                        >
                            <img src={hadithImage6} alt="Islamic Sciences 2" className="w-full h-auto" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* Call to Action Section */}
                <motion.section
                    className="text-center mb-10 flex flex-col items-center"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <h2 className="text-2xl font-semibold mb-4">هل لديك أي استفسارات أو مقترحات؟</h2>
                    <p className="text-muted-dark dark:text-muted text-lg mb-6">
                        نرحب دائمًا بآرائك وتعليقاتك لتحسين تجربتك معنا. يمكنك إرسال تقرير أو استفسار عبر الرابط أدناه.
                    </p>
                    <motion.button
                        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-dark transition-colors duration-300"
                        onClick={() => (window.location.href = "/report")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowRight2 color="currentColor" size={20} /> توجّه إلى صفحة التقارير
                    </motion.button>
                </motion.section>
            </div>
        </div>
    );
};

export default AboutPage;