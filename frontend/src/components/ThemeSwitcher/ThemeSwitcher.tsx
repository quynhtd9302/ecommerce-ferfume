import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

import { useDarkMode } from "../../hooks/useDarkMode";
import "./ThemeSwitcher.scss";

const ThemeSwitcher: FC = (): ReactElement => {
    const { theme, toggleTheme } = useDarkMode();
    const { t } = useTranslation();

    return (
        <button
            type={"button"}
            className={"theme-switcher"}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("nav.switchToLight") : t("nav.switchToDark")}
            title={theme === "dark" ? t("nav.switchToLight") : t("nav.switchToDark")}
        >
            {theme === "dark" ? <MoonOutlined /> : <SunOutlined />}
        </button>
    );
};

export default ThemeSwitcher;
