import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import "./LanguageSwitcher.scss";

const LanguageSwitcher: FC = (): ReactElement => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string): void => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={"language-switcher"} role={"group"} aria-label={"Language"}>
            <button
                type={"button"}
                className={i18n.language === "en" ? "is-active" : ""}
                onClick={() => changeLanguage("en")}
            >
                EN
            </button>
            <span>/</span>
            <button
                type={"button"}
                className={i18n.language === "vi" ? "is-active" : ""}
                onClick={() => changeLanguage("vi")}
            >
                VI
            </button>
        </div>
    );
};

export default LanguageSwitcher;
