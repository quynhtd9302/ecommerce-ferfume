import React, { FC, ReactElement } from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectTotalPrice } from "../../redux-toolkit/cart/cart-selector";
import { usePrice } from "../../hooks/usePrice";

const CartTotalPrice: FC = (): ReactElement => {
    const { t } = useTranslation();
    const formatPrice = usePrice();
    const totalPrice = useSelector(selectTotalPrice);

    return <Typography.Title level={3}>{t("cart.total", { price: formatPrice(totalPrice) })}</Typography.Title>;
};

export default CartTotalPrice;
