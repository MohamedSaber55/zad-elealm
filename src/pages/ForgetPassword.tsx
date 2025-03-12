import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Reset link sent to:", email);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-primary">
            <div className="w-11/12 sm:w-3/4 md:w-1/2 bg-white dark:bg-drk shadow-lg px-8 py-6 rounded-xl">
                <div className="text-center mb-6">
                    <img src="./logo.png" alt="Logo" className="h-16 mx-auto mb-2" />
                    <h1 className="text-2xl font-bold text-black">{t("auth.forgot-password")}</h1>
                    <p className="text-gray-600">{t("auth.enter-email-reset")}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="item space-y-3">
                            <label className="block text-lg font-semibold">{t("auth.email")}</label>
                            <input
                                type="email"
                                className="border w-full p-3 rounded-lg border-primary placeholder:text-muted"
                                placeholder={t("auth.input-email")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg">
                            {t("auth.send-reset-link")}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/login" className="text-primary font-semibold">
                        {t("auth.back-to-login")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
