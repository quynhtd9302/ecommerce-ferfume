import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";

import { MENU } from "../../../constants/routeConstants";
import "./HomePageTheme.css";

const HomePageTheme: FC = (): ReactElement => {
    const { t } = useTranslation();

    return (
        <div className={"page-theme"}>
            <Row gutter={32}>
                <Col span={12}>
                    <Link to={{ pathname: MENU, state: { id: "female" } }} className={"theme-banner"}>
                        <img
                            src="https://images.unsplash.com/photo-1595425959632-34f2822322ce?auto=format&fit=crop&w=1200&q=80"
                            alt={"female"}
                        />
                        <div className={"theme-banner-overlay"}>
                            <span className={"theme-banner-eyebrow"}>{t("home.forHer")}</span>
                            <h3 className={"theme-banner-heading"}>{t("home.womenPerfume")}</h3>
                            <span className={"theme-banner-cta"}>{t("home.shopNow")}</span>
                        </div>
                    </Link>
                </Col>
                <Col span={12}>
                    <Link to={{ pathname: MENU, state: { id: "male" } }} className={"theme-banner"}>
                        <img
                            src="https://images.unsplash.com/photo-1593487568720-92097fb460fb?auto=format&fit=crop&w=1200&q=80"
                            alt={"male"}
                        />
                        <div className={"theme-banner-overlay"}>
                            <span className={"theme-banner-eyebrow"}>{t("home.forHim")}</span>
                            <h3 className={"theme-banner-heading"}>{t("home.menPerfume")}</h3>
                            <span className={"theme-banner-cta"}>{t("home.shopNow")}</span>
                        </div>
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default HomePageTheme;
