import { Book, Medal, MessageQuestion, DocumentLike, ArrowRight2 } from "iconsax-react";
import learningImg from "./../assets/welcome.png"; // Replace with an appropriate image
import whyUsBg from "./../assets/desk.jpg"; // Background image for Why Us section
import calenderIcon from "./../assets/icons/calendar.png"
import levelsIcon from "./../assets/icons/levels.png"
import certificateIcon from "./../assets/icons/certificate.png"
import mobileIcon from "./../assets/icons/mobile.png"
const AboutPage = () => {
    return (
        <div className="dark:bg-dark dark:text-white py-10 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <header className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                        <Book size={32} color="currentColor" className="text-primary" /> من نحن
                    </h1>
                    <p className="text-muted-dark dark:text-muted text-lg">
                        منصة <strong>زاد العلم</strong> هي وجهتك المثالية لتعلم العلوم الدينية بأسلوب مبتكر وفعال.
                    </p>
                </header>

                {/* Introduction Section */}
                <section className="relative h-[400px] md:h-[400px] rounded-xl mb-6" style={{backgroundImage: `url(${learningImg})`}}>
                    <p className="text-light leading-loose absolute inset-0 p-4 flex justify-center items-center text-lg">
                        في زاد العلم، نؤمن بأن التعليم هو أساس النجاح والتقدم. نسعى إلى تقديم دورات دينية شاملة تساعدك على فهم أصول الدين بطريقة سهلة وممتعة. سواء كنت مبتدئًا أو خبيرًا، فإن محتوانا مصمم خصيصًا لتلبية احتياجاتك.
                    </p>
                </section>

                {/* Vision Section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Medal size={24} color="currentColor" className="text-primary" /> رؤيتنا
                    </h2>
                    <p className="text-muted-dark dark:text-muted text-lg">
                        نطمح لأن نكون المنصة الرائدة عالميًا في تعليم العلوم الدينية، حيث يجد كل طالب علم ما يحتاجه لتحقيق أهدافه الروحية والعلمية. نحن نركز على توفير تجربة تعليمية مميزة مع دعم مستمر وتقييم دقيق للتأكد من تحقيق التقدم المطلوب.
                    </p>
                </section>

                {/* How It Works Section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <MessageQuestion size={24} color="currentColor" className="text-primary" /> كيف يعمل زاد العلم؟
                    </h2>
                    <ul className="list-disc pl-6 text-muted-dark dark:text-muted text-lg">
                        <li>اشترك في الدورات المتاحة واختر ما يناسب مستواك.</li>
                        <li>استمتع بمحتوى غني يتضمن دروسًا مرئية، مواد قراءة، وأسئلة تفاعلية.</li>
                        <li>قم بإجراء اختبارات قصيرة بعد كل درس لقياس مدى استيعابك.</li>
                        <li>احصل على تقرير مفصل عن أدائك واقتراحات لتحسين مستواك.</li>
                    </ul>
                </section>

                {/* Why Us Section */}
                <section className="relative bg-cover bg-center rounded-xl h-[400px] md:h-[500px] overflow-hidden mb-10">
                    <img
                        src={whyUsBg}
                        alt="Why Us Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative h-full container px-4">
                        <div className="flex flex-col h-full md:flex-row justify-between items-center text-white text-center md:text-left">
                            {/* Item 1 */}
                            <div className="my-6 md:my-0 md:w-1/4 flex justify-center items-center flex-col gap-4 text-center">
                                <div className="w-20 h-20">
                                    <img src={mobileIcon} alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">محفظون متميزون وقادرون على تعليم كل المستويات</h3>
                            </div>

                            {/* Item 2 */}
                            <div className="my-6 md:my-0 md:w-1/4 flex justify-center items-center flex-col gap-4 text-center">
                                <div className="w-20 h-20">
                                    <img src={calenderIcon} alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">مؤهلون للتعامل مع الأطفال بمختلف الأعمار</h3>
                            </div>

                            {/* Item 3 */}
                            <div className="my-6 md:my-0 md:w-1/4 flex justify-center items-center flex-col gap-4 text-center">
                                <div className="w-20 h-20">
                                    <img src={certificateIcon} alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">حصص فردية تضمن تركيز المدرس معك وحدك</h3>
                            </div>

                            {/* Item 4 */}
                            <div className="my-6 md:my-0 md:w-1/4 flex justify-center items-center flex-col gap-4 text-center">
                                <div className="w-20 h-20">
                                    <img src={levelsIcon} alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">تعلم من أي مكان على حسب الجدول المناسب لك</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Certificates Section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <DocumentLike size={24} color="currentColor" className="text-primary" /> الشهادات والإنجازات
                    </h2>
                    <p className="text-muted-dark dark:text-muted text-lg">
                        عند اجتيازك الاختبارات بنجاح، ستتلقى شهادة معتمدة من <strong>زاد العلم</strong> تثبت إنجازاتك. يمكنك استخدام هذه الشهادة لتوثيق مسيرتك التعليمية أو مشاركتها مع الآخرين كدليل على جدك واجتهادك.
                    </p>
                </section>

                {/* Call to Action Section */}
                <section className="text-center mb-10 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">هل لديك أي استفسارات أو مقترحات؟</h2>
                    <p className="text-muted-dark dark:text-muted text-lg mb-6">
                        نرحب دائمًا بآرائك وتعليقاتك لتحسين تجربتك معنا. يمكنك إرسال تقرير أو استفسار عبر الرابط أدناه.
                    </p>
                    <button
                        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-dark transition-colors duration-300"
                        onClick={() => window.location.href = "/report"}
                    >
                        <ArrowRight2 color="currentColor" size={20} /> توجّه إلى صفحة التقارير
                    </button>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;