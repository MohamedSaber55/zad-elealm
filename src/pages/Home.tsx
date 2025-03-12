import { useTranslation } from "react-i18next"
import image from "../assets/image-1.png"
import { Link } from "react-router-dom"
const Home = () => {
    const { t } = useTranslation()
    return (
        <div className="dark:bg-dark dark:text-white">
            <div className="container min-h-main">
                <div className="py-10">
                    <h2 className="text-2xl font-bold ">{t("home.categories")}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    <Link to={`/materials/id`} className="bg-white rounded-xl shadow-md bg-cover bg-center min-h-40" style={{ backgroundImage: `url(${image})` }}>
                        <div className="layer bg-black/65 w-full h-full p-5 rounded-xl flex justify-center items-center">
                            <h3 className="text-lg font-bold text-white">ماده الفقه الاسلامي</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home