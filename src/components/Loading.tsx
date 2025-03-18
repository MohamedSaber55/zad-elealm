import { useTranslation } from "react-i18next"
import loadingSVG from "./../assets/svgicons/loader.svg"
const Loading = () => {
    const {t} = useTranslation();
    return (
        <div className="h-full bg-light-bg dark:bg-dark dark:text-light flex-col gap-4 flex justify-center items-center">
            <img src={loadingSVG} alt="Loading..." className="h-16 w-16" />
            <div className="">
                <p className="text-lg font-bold">{t("loading")}</p>
            </div>
        </div>
    )
}

export default Loading