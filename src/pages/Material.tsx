// import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import image from "../assets/item.jpeg"
import { Heart, Play } from "iconsax-react"
import { useState } from "react"

const Material = () => {
    const { id } = useParams<{ id: string }>()
    console.log(id)
    // const { t } = useTranslation()
    // Sample data for items
    const items = [
        { id: 1, title: "المدخل الي الفقه الاسلامي", author: "منصه زادي للتعليم", videos: 12 },
        { id: 2, title: "المدخل الي الفقه الاسلامي", author: "منصه زادي للتعليم", videos: 15 },
        { id: 3, title: "المدخل الي الفقه الاسلامي", author: "منصه زادي للتعليم", videos: 10 },
        { id: 4, title: "المدخل الي الفقه الاسلامي", author: "منصه زادي للتعليم", videos: 18 },
    ]

    const [favorites, setFavorites] = useState<number[]>([])

    // Toggle favorite
    const toggleFavorite = (itemId: number) => {
        setFavorites((prev) =>
            prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
        )
    }

    return (
        <div className="dark:bg-dark dark:text-white">
            <div className="container min-h-main">
                <div className="py-10">
                    <h2 className="text-2xl font-bold ">ماده الفقه الاسلامي</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {items.map((course) => (
                        <Link to={"/courses/id"} key={course.id} className="bg-white dark:bg-dark-light rounded-lg overflow-hidden shadow hover:shadow-md transition">
                            <div className="relative">
                                <img src={image} alt={course.title} className="w-full h-48 object-cover" />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(course.id);
                                    }}
                                    className="absolute top-3 right-3 bg-white dark:bg-dark-light p-2 rounded-full z-10"
                                >
                                    <Heart
                                        size="20"
                                        variant={favorites.includes(course.id) ? "Bold" : "Linear"}
                                        color={favorites.includes(course.id) ? "#E63946" : "#A0A0A0"}
                                    />
                                </button>
                            </div>

                            {/* Course Details */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold truncate">{course.title}</h3>
                                <p className="text-sm text-dark-lighter dark:text-muted mt-1">{course.author}</p>
                                <p className="text-sm text-dark-lighter dark:text-gray mt-2 flex items-center gap-1">
                                    <Play size="18" color="currentColor" variant="Bold" />
                                    <span className="text-danger font-bold">{course.videos} </span> فيديو
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Material