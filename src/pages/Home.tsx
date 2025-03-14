import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react"
import { getAllCategoriesAsync } from "../store/slices/categories"
const Home = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()
    const { token } = useSelector((state: RootState) => state.auth)
    const state = useSelector((state: RootState) => state.categories)
    const categories = state?.categories || []
    useEffect(() => {
        if (token) {
            dispatch(getAllCategoriesAsync({
                token,
            }))
        }
    }, [dispatch, token])

    return (
        <div className="dark:bg-dark dark:text-white pb-10">
            <div className="container min-h-main">
                <div className="py-10">
                    <h2 className="text-2xl font-bold ">{t("home.categories")}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {categories.map(category => (
                        <Link key={category.id} to={`/materials/${category.id}`} className="bg-white rounded-xl shadow-md bg-cover bg-center min-h-40" style={{ backgroundImage: `url(${category.imageUrl})` }}>
                            <div className="layer bg-black/65 w-full h-full p-5 rounded-xl flex justify-center items-center">
                                <h3 className="text-lg font-bold text-white">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home