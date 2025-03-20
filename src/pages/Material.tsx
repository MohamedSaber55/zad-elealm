import { Link, useParams } from "react-router-dom"
import { AddSquare, ArrowDown2, ArrowUp2, Calendar, Filter, Global, Heart, MinusSquare, Play, SearchNormal1, Star1 } from "iconsax-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { getCoursesByCategoryAsync } from "../store/slices/categories"
import { formatDateTime } from "../utils/formatDateTime"
import Loading from "../components/Loading"
import NoData from "../components/NoData"
import { enrollCourse, getEnrolledCourses, unEnrollCourse } from "../store/slices/enrollment"
import { notify } from "../utils/notify"
import { addFavoriteCourseAsync, getFavoritesForUserAsync, removeFavoriteCourseAsync } from "../store/slices/favorites"
import { getNotifications } from "../store/slices/notifications"
import Pagination from "../components/Pagination"

const Material = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const { token } = useSelector((state: RootState) => state.auth)
    const state = useSelector((state: RootState) => state.categories)
    const metaData = state.metaData

    const enrollmentState = useSelector((state: RootState) => state.enrollment) as { courses: any[] }
    const favoritesState = useSelector((state: RootState) => state.favorites)
    const enrollmentCourses = enrollmentState.courses;
    const favoritesCourses = favoritesState.favoriteCourses;
    const courses = state.courses || [];
    // Filters & Pagination State
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("rating")
    const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc")
    const [author, setAuthor] = useState<string>("")
    const [minRating, setMinRating] = useState<number | null>(null)
    const [maxRating, setMaxRating] = useState<number | null>(null)
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState<number>(() => {
        const saved = localStorage.getItem('pageSize');
        return saved ? parseInt(saved, 10) : 10;
    });
    const [showFilters, setShowFilters] = useState(false);

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setPageNumber(1); // Reset to first page when changing size
        localStorage.setItem('pageSize', size.toString());
    };
    useEffect(() => {
        if (token && id) {
            const params: Record<string, any> = {
                categoryId: id,
                search,
                sortBy,
                author,
                minRating,
                fromDate,
                toDate,
                pageNumber,
                pageSize
            };
            const filteredParams = {
                categoryId: id,
                ...Object.fromEntries(
                    Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== "")
                )
            };

            dispatch(getCoursesByCategoryAsync({
                token: token || "",
                params: filteredParams
            }))
        }

    }, [token, id, search, sortBy, author, minRating, fromDate, toDate, pageNumber, pageSize])
    useEffect(() => {
        if (token) {
            dispatch(getEnrolledCourses({ token }))
        }
    }, [token, dispatch])
    useEffect(() => {
        if (token) {
            dispatch(getFavoritesForUserAsync({ token }))
        }
    }, [token, dispatch])

    const handleEnrollCourse = (courseId: number) => {
        if (token) {
            dispatch(enrollCourse({ token, id: courseId })).then(() => {
                dispatch(getEnrolledCourses({ token })).then(() => {
                    dispatch(getNotifications({ token }))
                })
            })
            notify(" تم التسجيل بنجاح", "success")
        }
    }
    const handleUnEnrollCourse = (courseId: number) => {
        if (token) {
            dispatch(unEnrollCourse({ token, id: courseId })).then(() => {
                dispatch(getEnrolledCourses({ token }))
            })
            notify("تم الغاء التسجيل بنجاح", "success")
        }
    }
    const handleAddFavCourse = (courseId: number) => {
        if (token) {
            dispatch(addFavoriteCourseAsync({ token, courseId })).then(() => {
                dispatch(getFavoritesForUserAsync({ token }))
            })
            notify(" تم إضافة المادة بنجاح", "success")
        }
    }
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
            {false ? <div className="h-main">
                <Loading />
            </div> :
                <div className="container min-h-main">
                    <div className="flex justify-between flex-wrap gap-4 items-center py-10">
                        <h2 className="text-2xl font-bold">{id}</h2>
                        <div className="flex flex-wrap items-center gap-4 w-ful">
                            {/* Search Input */}
                            <div className="relative flex-1 min-w-[150px]">
                                <SearchNormal1
                                    size="20"
                                    color="currentColor"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-dark dark:text-muted"
                                />
                                <input
                                    type="text"
                                    placeholder="بحث..."
                                    className="pl-10 pr-3 py-2 rounded-lg w-full border border-primary bg-white dark:bg-dark-light text-black dark:text-white focus:outline-none focus:ring focus:ring-primary"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex w-full items-center justify-center gap-2 px-4 py-2 bg-primary dark:bg-primary-light border border-primary text-white rounded-lg hover:bg-primary-dark transition"
                                >
                                    <Filter size="20" color="currentColor" />
                                    <span>فلتر</span>
                                    {showFilters ? <ArrowUp2 size="18" color={"currentColor"} /> : <ArrowDown2 size="18" color={"currentColor"} />}
                                </button>

                                {/* Filters Section */}
                                {showFilters && (
                                    <div className="p-5 mt-4 bg-white dark:bg-dark-light shadow-xl absolute end-0 z-50 border border-muted-dark rounded-xl w-80">
                                        <div className="triangle border absolute -top-4 end-5 border-muted-dark bg-muted-dark h-4 w-5 clip-path-triangle"></div>

                                        {/* Filter Fields */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Sort By */}
                                            <div className="col-span-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-muted">ترتيب حسب</label>
                                                <select
                                                    className="w-full p-2 text-sm rounded-md border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                    value={sortBy}
                                                    onChange={(e) => setSortBy(e.target.value)}
                                                >
                                                    <option value="rating">التقييم</option>
                                                    <option value="date">التاريخ</option>
                                                    <option value="name">الاسم</option>
                                                </select>
                                            </div>

                                            {/* Sort Direction */}
                                            <div className="col-span-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-muted">اتجاه الترتيب</label>
                                                <select
                                                    className="w-full p-2 text-sm rounded-md border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                    value={sortDirection}
                                                    onChange={(e) => setSortDirection(e.target.value as "asc" | "desc")}
                                                >
                                                    <option value="desc">تنازلي</option>
                                                    <option value="asc">تصاعدي</option>
                                                </select>
                                            </div>

                                            {/* Author */}
                                            <div className="col-span-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-muted">اسم المؤلف</label>
                                                <input
                                                    type="text"
                                                    placeholder="ادخل اسم المؤلف"
                                                    className="w-full p-2 text-sm rounded-md border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                    value={author}
                                                    onChange={(e) => setAuthor(e.target.value)}
                                                />
                                            </div>

                                            {/* Min Rating */}
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 dark:text-muted">التقييم الأدنى</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="5"
                                                    step="0.1"
                                                    placeholder="0 - 5"
                                                    className="w-full p-2 text-sm rounded-md border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                    value={minRating ?? ""}
                                                    onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : null)}
                                                />
                                            </div>

                                            {/* Max Rating */}
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 dark:text-muted">التقييم الأعلى</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="5"
                                                    step="0.1"
                                                    placeholder="0 - 5"
                                                    className="w-full p-2 text-sm rounded-md border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                    value={maxRating ?? ""}
                                                    onChange={(e) => setMaxRating(e.target.value ? Number(e.target.value) : null)}
                                                />
                                            </div>

                                            {/* Date Range */}
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 dark:text-muted">من تاريخ</label>
                                                <input
                                                    type="date"
                                                    className="w-full p-2 text-sm rounded-md border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                    value={fromDate}
                                                    onChange={(e) => setFromDate(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 dark:text-muted">إلى تاريخ</label>
                                                <input
                                                    type="date"
                                                    className="w-full p-2 text-sm rounded-md border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                    value={toDate}
                                                    onChange={(e) => setToDate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {courses.length ? <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {courses.map((course) => (
                                <Link to={`/courses/${course.id}`} key={course.id} className="bg-white dark:bg-dark-light rounded-lg overflow-hidden shadow hover:shadow-md transition">
                                    <div className="relative">
                                        <img src={course.imageUrl} alt={course.name} className="w-full h-48 object-cover" />
                                        {!favoritesCourses?.some((fav) => fav.id === course.id) ?
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleAddFavCourse(course.id);
                                                }}
                                                className="absolute top-3 right-3 bg-white dark:bg-dark-light p-2 rounded-full z-10"
                                            >
                                                <Heart
                                                    size="20"
                                                    variant={"Linear"}
                                                    color={"#A0A0A0"}
                                                />
                                            </button> : <button
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
                                            </button>}
                                    </div>

                                    {/* Course Details */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold truncate">{course.name}</h3>
                                        <p className="text-sm text-muted-dark dark:text-muted mt-1 truncate">{course.author}</p>
                                        <p className="text-sm text-muted-dark dark:text-muted mt-2 flex items-center gap-1">
                                            <Play size="18" color="currentColor" variant="Bold" />
                                            <span className="text-danger font-bold">{course.courseVideosCount} </span> فيديو
                                        </p>
                                        <div className="flex justify-start items-center gap-4">
                                            <p className="text-sm text-muted-dark dark:text-muted mt-2 flex items-center gap-1">
                                                <Global size="18" color="currentColor" variant="Bold" />
                                                <span className="font-semibold">{course.courseLanguage}</span>
                                            </p>
                                            <p className="text-sm text-muted-dark dark:text-muted mt-2 flex items-center gap-1">
                                                <Star1 size="18" color="currentColor" variant="Bold" />
                                                <span className="font-semibold">{course.rating.toFixed(1)}</span>
                                            </p>
                                        </div>
                                        <p className="text-sm text-muted-dark dark:text-muted mt-2 flex items-center gap-1">
                                            <Calendar size="18" color="currentColor" variant="Bold" />
                                            تمت الإضافة في
                                            <span className="text-xs">{formatDateTime(course.createdAt, { isArabic: true, showDate: true })}</span>
                                        </p>
                                        {/* Enroll Button */}
                                        {!enrollmentCourses?.some((enrolled) => enrolled.id === course.id) ?
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEnrollCourse(course.id);
                                                }}
                                                className="w-full mt-4 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                                            >
                                                <AddSquare color="currentColor" size={20} />
                                                <span className="">التسجيل في الدورة</span>
                                            </button> :
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleUnEnrollCourse(course.id);
                                                }}
                                                className="w-full mt-4 bg-danger/90 hover:bg-danger text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                                            >
                                                <MinusSquare color="currentColor" size={20} />
                                                <span className=""> الغاء التسجيل في الدورة</span>
                                            </button>
                                        }
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {metaData && <Pagination metaData={metaData} onPageChange={(page) => setPageNumber(page)} onPageSizeChange={handlePageSizeChange} pageSize={pageSize} />}
                    </> :
                        <div className=" h-80">
                            <NoData />
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Material