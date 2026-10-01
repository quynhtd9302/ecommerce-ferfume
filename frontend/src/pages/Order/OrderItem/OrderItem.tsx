import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Typography } from "antd";

import { PerfumeResponse } from "../../../types/types";
import "./OrderItem.css";
import { getImageUrl } from "../../../utils/image-url";
import { usePrice } from "../../../hooks/usePrice";

type PropsType = {
    perfume: PerfumeResponse;
    quantity?: number;
};

const OrderItem: FC<PropsType> = ({ perfume, quantity }): ReactElement => {
    const { t } = useTranslation();
    const formatPrice = usePrice();

    return (
        <Col span={12}>
            <Card
                className={"menu-card"}
                cover={<img className={"menu-card-image"} alt={perfume.perfumeTitle} src={getImageUrl(perfume.filename)} />}
            >
                <div className={"menu-content"}>
                    <Typography.Text strong>{perfume.perfumer}</Typography.Text>
                    <Typography.Text strong>{perfume.perfumeTitle}</Typography.Text>
                    <Typography.Text strong>{t("order.price", { price: formatPrice(perfume.price) })}</Typography.Text>
                    <Typography.Text strong>{t("order.quantity", { count: quantity })}</Typography.Text>
                </div>
            </Card>
        </Col>
    );
};

export default OrderItem;
