import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LoginOutlined, LogoutOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Affix, Badge, Col, Row, Space } from "antd";

import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import { selectCartItemsCount } from "../../redux-toolkit/cart/cart-selector";
import { logoutSuccess } from "../../redux-toolkit/user/user-slice";
import { ACCOUNT, BASE, CONTACTS, LOGIN, MENU, REGISTRATION } from "../../constants/routeConstants";
import { CART } from "../../constants/urlConstants";
import { SHOP_NAME } from "../../constants/shopInfo";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import "./NavBar.scss";

const NavBar: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const usersData = useSelector(selectUserFromUserState);
    const cartItemsCount = useSelector(selectCartItemsCount);

    const handleLogout = (): void => {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
    };

    return (
        <>
            <div className={"navbar-announcement"}>
                <span>{t("nav.announcement")}</span>
                <div className={"navbar-announcement-controls"}>
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </div>
            <div className={"navbar-logo-wrapper"}>
                <Link to={BASE} className={"navbar-logo"}>
                    <span className={"navbar-logo-name"}>{SHOP_NAME}</span>
                    <span className={"navbar-logo-tagline"}>{t("nav.tagline")}</span>
                </Link>
            </div>
            <Affix>
                <div className={"navbar-wrapper"}>
                    <Row className={"navbar-row"}>
                        <Col xs={24} md={12}>
                            <ul>
                                <Link to={BASE}>
                                    <li>{t("nav.home")}</li>
                                </Link>
                                <li>
                                    <Link to={{ pathname: MENU, state: { id: "all" } }}>{t("nav.perfumes")}</Link>
                                </li>
                                <Link to={CONTACTS}>
                                    <li>{t("nav.contacts")}</li>
                                </Link>
                            </ul>
                        </Col>
                        <Col xs={24} md={12}>
                            <ul>
                                <li className={"navbar-cart"}>
                                    <Badge count={cartItemsCount} size="small" color={"#8B5E3C"}>
                                        <Link to={CART}>
                                            <ShoppingCartOutlined />
                                        </Link>
                                    </Badge>
                                </li>
                                {usersData ? (
                                    <>
                                        <Link to={ACCOUNT}>
                                            <li>
                                                <UserOutlined />
                                                {t("nav.myAccount")}
                                            </li>
                                        </Link>
                                        <Link id={"handleLogout"} to={BASE} onClick={handleLogout}>
                                            <li>
                                                <LogoutOutlined />
                                                {t("nav.exit")}
                                            </li>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to={LOGIN}>
                                            <li>
                                                <Space align={"baseline"}>
                                                    <LoginOutlined />
                                                    {t("nav.signIn")}
                                                </Space>
                                            </li>
                                        </Link>
                                        <Link to={REGISTRATION}>
                                            <li>
                                                <UserAddOutlined />
                                                {t("nav.signUp")}
                                            </li>
                                        </Link>
                                    </>
                                )}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Affix>
        </>
    );
};

export default NavBar;
