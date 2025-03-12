import { useTranslation } from 'react-i18next';
import welcomeBg from '../assets/welcome.png'
import { Link } from 'react-router-dom';
const Welcome = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-main bg-center" style={{ backgroundImage: `url(${welcomeBg})`, backgroundSize: "cover" }}>
            <div className="layer min-h-main w-full flex justify-center items-center">
                <div className="content text-white text-center flex flex-col gap-4 justify-center items-center p-8">
                    <h1 className="text-3xl font-bold">{t("zad-elealm")}</h1>
                    <p className="text-lg sm:w-3/5 m-auto">{t("zad-desc")}</p>
                    <p className='text-lg'>{t("zad-hadith")}</p>
                    <Link to={"/home"} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-10 rounded-lg mt-5">{t("get-started")}</Link>
                </div>
            </div>
        </div>
    )
}

export default Welcome