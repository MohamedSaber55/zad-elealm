import { motion } from 'framer-motion';
import { Crown, Cup, ArrowRight } from 'iconsax-react';
import avatar from "./../assets/avatar.png"
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTopUsersRanks } from '../store/slices/rank';
const TopUsersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useSelector((state: RootState) => state.auth);
    const rankState = useSelector((state: RootState) => state.ranks);
    const topUsers = rankState.ranks;
    useEffect(() => {
        if (token) {
            dispatch(getTopUsersRanks({ token }));
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-6"
        >
            {/* Header Section */}
            <div className="mb-8 dark:text-white">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-primary dark:text-primary-light">
                        المتصدرين
                    </h1>
                    {/* <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="ابحث عن متدرب..."
                            className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-light focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <SearchNormal color='currentColor' size={24} className="absolute start-3 top-2.5 text-muted dark:text-muted-light" />
                    </div> */}
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-dark-darker dark:to-dark-darker p-6 rounded-xl border border-primary/20 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-full">
                            <Cup color='currentColor' size={28} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">لوحة المتصدرين</h2>
                            <p className="text-muted dark:text-muted-light">
                                اعرف من هم الأكثر تفوقاً في منصتنا التعليمية
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top 3 Users with Podium */}
            <div className="mb-10">
                <h3 className="text-xl font-semibold mb-6 text-primary dark:text-primary-light">
                    الأوائل
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    {/* 2nd Place */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative w-full dark:text-white bg-white dark:bg-dark-light p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 text-center">
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-silver text-white w-10 h-10 flex items-center justify-center rounded-full">
                                <span className="font-bold">2</span>
                            </div>
                            <div className="h-24 w-24 mx-auto mb-4 rounded-full border-4 border-silver overflow-hidden">
                                <img
                                    src={topUsers?.[1]?.userImage || avatar}
                                    alt={topUsers?.[1]?.userName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="font-bold text-lg">{topUsers?.[1]?.userName || "المتدرب الثاني"}</h4>
                            <p className="text-muted dark:text-muted-light text-sm mb-2">
                                {topUsers?.[1]?.rankName || "Rank"}
                            </p>
                            <div className="bg-silver/10 text-silver px-3 py-1 rounded-full text-sm font-medium">
                                {topUsers?.[1]?.totalPoints || 0} نقطة
                            </div>
                        </div>
                        <div className="h-16 w-full bg-silver/ rounded-b-lg"></div>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative w-full dark:text-white bg-white dark:bg-dark-light p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gold text-white w-10 h-10 flex items-center justify-center rounded-full">
                                <Crown color='currentColor' size={16} variant="Bold" />
                            </div>
                            <div className="h-28 w-28 mx-auto mb-4 rounded-full border-4 border-gold overflow-hidden">
                                <img
                                    src={topUsers?.[0]?.userImage || avatar}
                                    alt={topUsers?.[0]?.userName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="font-bold text-xl">{topUsers?.[0]?.userName || "المتصدر الأول"}</h4>
                            <p className="text-muted dark:text-muted-light text-sm mb-2">
                                {topUsers?.[0]?.rankName || "Rank"}
                            </p>
                            <div className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium">
                                {topUsers?.[0]?.totalPoints || 0} نقطة
                            </div>
                        </div>
                        <div className="h-24 w-full bg-gold/ rounded-b-lg"></div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative w-full dark:text-white bg-white dark:bg-dark-light p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 text-center">
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-bronze text-white w-10 h-10 flex items-center justify-center rounded-full">
                                <span className="font-bold">3</span>
                            </div>
                            <div className="h-20 w-20 mx-auto mb-4 rounded-full border-4 border-bronze overflow-hidden">
                                <img
                                    src={topUsers?.[2]?.userImage || avatar}
                                    alt={topUsers?.[2]?.userName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="font-bold text-lg">{topUsers?.[2]?.userName || "المتدرب الثالث"}</h4>
                            <p className="text-muted dark:text-muted-light text-sm mb-2">
                                {topUsers?.[2]?.rankName || "Rank"}
                            </p>
                            <div className="bg-bronze/10 text-bronze px-3 py-1 rounded-full text-sm font-medium">
                                {topUsers?.[2]?.totalPoints || 0} نقطة
                            </div>
                        </div>
                        <div className="h-12 w-full bg-bronze/ rounded-b-lg"></div>
                    </motion.div>
                </div>
            </div>

            {/* All Top Users List */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-primary dark:text-primary-light">
                        قائمة المتصدرين
                    </h3>
                    {/* <div className="flex items-center gap-2 text-sm text-muted dark:text-muted-light">
                        <span>تصفية حسب</span>
                        <select className="bg-white  dark:bg-dark-light border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary/50">
                            <option>الكل</option>
                            <option>الرتبة</option>
                            <option>النقاط</option>
                            <option>الكورسات المكتملة</option>
                        </select>
                    </div> */}
                </div>

                <div className="bg-white dark:text-white  dark:bg-dark-light rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 font-medium">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-4">المتدرب</div>
                        <div className="col-span-2 text-center">الرتبة</div>
                        <div className="col-span-2 text-center">النقاط</div>
                        <div className="col-span-2 text-center">الكورسات</div>
                        <div className="col-span-1"></div>
                    </div>

                    {/* Users List */}
                    {topUsers?.map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                        >
                            <div className="col-span-1 text-center">
                                {index <= 2 ? (
                                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index === 0 ? 'bg-gold/10 text-gold' :
                                        index === 1 ? 'bg-silver/10 text-silver' :
                                            'bg-bronze/10 text-bronze'
                                        }`}>
                                        {index + 1}
                                    </div>
                                ) : (
                                    <span className="text-muted dark:text-muted-light">{index + 1}</span>
                                )}
                            </div>
                            <div className="col-span-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                                    <img
                                        src={user.userImage || avatar}
                                        alt={user.userName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="font-medium">{user.userName}</span>
                            </div>
                            <div className="col-span-2 text-center">
                                <span className={`px-3 py-1 rounded-full text-sm ${user.rankName === 'Bronze' ? 'bg-bronze/10 text-bronze' :
                                    user.rankName === 'Silver' ? 'bg-silver/10 text-silver' :
                                        user.rankName === 'Gold' ? 'bg-gold/10 text-gold' :
                                            user.rankName === 'Platinum' ? 'bg-platinum/10 text-platinum' :
                                                'bg-primary/10 text-primary'
                                    }`}>
                                    {user.rankName}
                                </span>
                            </div>
                            <div className="col-span-2 text-center font-medium text-primary dark:text-primary-light">
                                {user.totalPoints}
                            </div>
                            <div className="col-span-2 text-center text-muted dark:text-muted-light">
                                {user.completedCoursesCount}
                            </div>
                            <div className="col-span-1 flex justify-end">
                                <button className="p-1 text-muted dark:text-muted-light hover:text-primary dark:hover:text-primary-light transition">
                                    <ArrowRight color='currentColor' size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default TopUsersPage;