import noDataSVG from "./../assets/svgicons/no-data.svg";
import { useTranslation } from 'react-i18next';

const NoData = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 bg-light-bg dark:bg-dark dark:text-light">
            <img src={noDataSVG} alt="No Data" className="w-48 h-48 mb-4" />
            <p className="text-xl font-semibold text-dark-lighter dark:text-light-bg mb-2">{t('noData.title')}</p>
            <p className="text-muted-dark dark:text-muted mb-6">{t('noData.description')}</p>
            <button
                className="px-8 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300"
                onClick={() => window.location.reload()}
            >
                {t('noData.refreshButton')}
            </button>
        </div>
    );
};

export default NoData;