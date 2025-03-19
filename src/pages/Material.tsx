import { Link, useParams } from "react-router-dom"
import { AddSquare, ArrowDown2, ArrowUp2, Calendar, Filter, Global, Heart, MinusSquare, Play, SearchNormal1, Star1 } from "iconsax-react"
import { SetStateAction, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { getCoursesByCategoryAsync } from "../store/slices/categories"
import { formatDateTime } from "../utils/formatDateTime"
import debounce from "lodash/debounce";
import Loading from "../components/Loading"
import NoData from "../components/NoData"
import { enrollCourse, getEnrolledCourses, unEnrollCourse } from "../store/slices/enrollment"
import { notify } from "../utils/notify"
import { addFavoriteCourseAsync, getFavoritesForUserAsync, removeFavoriteCourseAsync } from "../store/slices/favorites"
import { getNotifications } from "../store/slices/notifications"

const Material = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const { token } = useSelector((state: RootState) => state.auth)
    const state = useSelector((state: RootState) => state.categories)
    const enrollmentState = useSelector((state: RootState) => state.enrollment) as { courses: any[] }
    const favoritesState = useSelector((state: RootState) => state.favorites)
    const enrollmentCourses = enrollmentState.courses;
    const favoritesCourses = favoritesState.favoriteCourses;
    const courses = state.courses || [];
    // Filters & Pagination State
    const [search, setSearch] = useState("")
    const [sortBy] = useState("newest")
    const [author, setAuthor] = useState("")
    const [language, setLanguage] = useState("")
    const [minRating, setMinRating] = useState(0)
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [pageNumber] = useState(1)
    const [pageSize] = useState(8)
    const [showFilters, setShowFilters] = useState(false);
    const [sortByDropdownOpen, setSortByDropdownOpen] = useState(false);

    useEffect(() => {
        if (token && id) {
            fetchCourses()
        }

    }, [token, id, search, sortBy, author, language, minRating, fromDate, toDate, pageNumber, pageSize])
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
    const fetchCourses = debounce(() => {
        dispatch(getCoursesByCategoryAsync({
            token: token || "",
            params: {
                categoryId: id || "",
                search,
                sortBy,
                author,
                minRating,
                fromDate,
                toDate,
                pageNumber,
                pageSize
            }
        }))
    }, 500)
    const options = [
        { value: "", label: "كل اللغات" },
        { value: "العربي", label: "العربية" },
        { value: "English", label: "الإنجليزية" },
    ];
    const handleSelect = (value: SetStateAction<string>) => {
        setLanguage(value);
        setSortByDropdownOpen(false);
    };

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
            {state.loading ? <div className="h-main">
                <Loading />
            </div> :
                <div className="container min-h-main">
                    <div className="flex justify-between flex-wrap items-center py-10">
                        <h2 className="text-2xl font-bold">{id}</h2>
                        <div className="flex flex-wrap gap-4 items-center">
                            {/* Search Input */}
                            <div className="relative">
                                <div className="relative">
                                    <SearchNormal1
                                        size="20"
                                        color="currentColor"
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="بحث..."
                                        className="pl-10 pr-3 py-2 rounded-lg border border-primary bg-white dark:bg-dark-light text-black dark:text-white focus:outline-none focus:ring focus:ring-primary"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary dark:bg-primary-light border border-primary text-white rounded-lg hover:bg-primary-dark transition"
                                >
                                    <Filter size="20" color="currentColor" />
                                    <span> فلتر</span>
                                    {showFilters ? <ArrowUp2 size="18" color={"currentColor"} /> : <ArrowDown2 size="18" color={"currentColor"} />}
                                </button>
                                {/* Filters Section */}
                                {showFilters && (
                                    <div className="p-4 my-4 bg-white dark:bg-dark-light shadow-xl absolute end-0 z-50 border border-muted-dark rounded-xl">
                                        <div className="triangle border absolute -top-4 end-5 border-muted-dark bg-muted-dark h-4 w-5 clip-path-triangle"></div>
                                        <div className="flex flex-col gap-4">
                                            <div className="relative">
                                                {/* Dropdown Trigger */}
                                                <div className="w-full inline-flex items-center overflow-hidden rounded-md border border-primary bg-white dark:bg-dark-light">
                                                    <div
                                                        className="cursor-pointer w-full border-e border-primary px-4 py-2 text-sm/normal text-muted-dark dark:text-muted"
                                                        onClick={() => setSortByDropdownOpen(!sortByDropdownOpen)}
                                                    >
                                                        {language ? options.find((opt) => opt.value === language)?.label : "كل اللغات"}
                                                    </div>

                                                    <button
                                                        className="h-full p-2 text-gray-600 hover:bg-gray  dark:hover:bg-dark-lighter"
                                                        onClick={() => setSortByDropdownOpen(!sortByDropdownOpen)}
                                                    >
                                                        <span className="sr-only">Menu</span>
                                                        {sortByDropdownOpen ? (
                                                            <ArrowUp2 size="18" color="currentColor" />
                                                        ) : (
                                                            <ArrowDown2 size="18" color="currentColor" />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Dropdown Menu */}
                                                {sortByDropdownOpen && (
                                                    <div
                                                        className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray dark:divide-dark-lighter rounded-md border border-gray dark:border-muted bg-white dark:bg-dark-light shadow-lg"
                                                        role="menu"
                                                    >
                                                        <div className="p-2">
                                                            {options.map((option) => (
                                                                <button
                                                                    key={option.value}
                                                                    className="block w-full rounded-lg px-4 py-2 text-sm text-muted-dark dark:text-muted hover:bg-gray-50 hover:text-gray-700 text-left"
                                                                    role="menuitem"
                                                                    onClick={() => handleSelect(option.value)}
                                                                >
                                                                    {option.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="اسم المؤلف"
                                                className="p-2 px-4 rounded-md text-sm/normal border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                value={author}
                                                onChange={(e) => setAuthor(e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                min="0"
                                                max="5"
                                                step="0.1"
                                                placeholder="التقييم الأدنى"
                                                className="p-2 px-4 text-sm/normal rounded-md border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                value={minRating}
                                                onChange={(e) => setMinRating(Number(e.target.value))}
                                            />
                                            <input
                                                type="date"
                                                className="p-2 px-4 text-sm/normal rounded-md border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                value={fromDate}
                                                onChange={(e) => setFromDate(e.target.value)}
                                            />
                                            <input
                                                type="date"
                                                className="p-2 px-4 text-sm/normal rounded-md border border-primary bg-white dark:bg-dark-light text-muted-dark dark:text-muted"
                                                value={toDate}
                                                onChange={(e) => setToDate(e.target.value)}
                                            />
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
                                        <p className="text-sm text-muted-dark dark:text-muted mt-1">{course.author}</p>
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
                        <div className="pagination py-10">
                            <ol className="flex justify-center gap-1 text-xs font-medium">
                                <li>
                                    <a
                                        href="#"
                                        className="inline-flex size-8 items-center justify-center rounded-sm border border-muted bg-white dark:bg-dark-light dark:text-light dark:border-muted-dark text-dark rtl:rotate-180"
                                    >
                                        <span className="sr-only">Prev Page</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-3"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className="block size-8 rounded-sm border border-muted bg-white dark:bg-dark-light dark:text-light dark:border-muted-dark text-center leading-8 text-dark"
                                    >
                                        1
                                    </a>
                                </li>

                                <li className="block size-8 rounded-sm border border-muted-green bg-primary text-center leading-8 text-white">
                                    2
                                </li>



                                <li>
                                    <a
                                        href="#"
                                        className="inline-flex size-8 items-center justify-center rounded-sm border border-muted bg-white dark:bg-dark-light dark:text-light dark:border-muted-dark text-center leading-8 text-dark rtl:rotate-180"
                                    >
                                        <span className="sr-only">Next Page</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-3"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ol>
                        </div>
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