import React, { FC, memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Col, Typography } from "antd";

import { PerfumeResponse } from "../../../types/types";
import { getImageUrl } from "../../../utils/image-url";

type PropsType = {
    perfume: PerfumeResponse;
};

const CartItemInfo: FC<PropsType> = memo(({ perfume }): ReactElement => {
    const { t } = useTranslation();

    return (
        <>
            <Col xs={8} sm={8} className={"cart-item-image"}>
                <img src={getImageUrl(perfume.filename)} alt={perfume.perfumeTitle} style={{ height: 100 }} />
            </Col>
            <Col xs={16} sm={8}>
                <Typography.Title level={3}>{perfume.perfumer}</Typography.Title>
                <Typography.Title level={5}>{perfume.perfumeTitle}</Typography.Title>
                <Typography.Text strong>{perfume.volume} {t("common.ml")}</Typography.Text>
            </Col>
        </>
    );
});

export default CartItemInfo;
