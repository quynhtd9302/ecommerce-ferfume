import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import { selectOrder } from "../../redux-toolkit/order/order-selector";
import { resetCartState } from "../../redux-toolkit/cart/cart-slice";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";

const OrderFinalize: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const order = useSelector(selectOrder);

    useEffect(() => {
        dispatch(resetCartState());
    }, [dispatch]);

    return (
        <ContentWrapper>
            <div style={{ textAlign: "center" }}>
                <Typography.Title level={2}>{t("orderFinalize.thankYou")}</Typography.Title>
                <Typography.Text>{t("orderFinalize.orderNumber", { id: order.id })}</Typography.Text>
            </div>
        </ContentWrapper>
    );
};

export default OrderFinalize;
