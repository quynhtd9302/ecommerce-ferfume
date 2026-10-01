import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Col, Rate, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import { DeleteOutlined, EditOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { PerfumeResponse } from "../../types/types";
import { ACCOUNT_ADMIN_PERFUMES, PRODUCT } from "../../constants/routeConstants";
import { useCart } from "../../hooks/useCart";
import { usePrice } from "../../hooks/usePrice";
import "./PerfumeCard.css";
import { getImageUrl } from "../../utils/image-url";

type PropsType = {
    perfume: PerfumeResponse;
    colSpan: number;
    edit?: boolean;
    onOpenDelete?: (perfume: PerfumeResponse) => void;
};

const PerfumeCard: FC<PropsType> = ({ perfume, colSpan, edit, onOpenDelete }): ReactElement => {
    const { t } = useTranslation();
    const formatPrice = usePrice();
    const { addToCart } = useCart(perfume.id);
    const history = useHistory();

    const onClickAddToCart = (event: any) => {
        event.preventDefault();
        addToCart();
    };

    const onClickEdit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`${ACCOUNT_ADMIN_PERFUMES}/${perfume.id}`);
    };

    const onClickDelete = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        onOpenDelete!(perfume);
    };

    return (
        <Col xs={12} sm={12} md={colSpan}>
            <Link to={`${PRODUCT}/${perfume.id}`}>
                <Card
                    className={"perfume-card"}
                    cover={<img className={"perfume-card-image"} alt={perfume.perfumeTitle} src={getImageUrl(perfume.filename)} />}
                    hoverable
                    actions={
                        edit
                            ? [
                                  <Button icon={<EditOutlined />} onClick={onClickEdit}>
                                      {t("common.edit")}
                                  </Button>,
                                  <Button icon={<DeleteOutlined />} onClick={onClickDelete} danger>
                                      {t("common.delete")}
                                  </Button>
                              ]
                            : [
                                  <Button icon={<ShoppingCartOutlined />} onClick={onClickAddToCart}>
                                      {t("common.addToCart")}
                                  </Button>
                              ]
                    }
                >
                    <div className={"perfume-card-rate"}>
                        <Rate defaultValue={perfume.perfumeRating === 0 ? 5 : perfume.perfumeRating} disabled />
                        <Typography.Text>{t("common.reviews", { count: perfume.reviewsCount })}</Typography.Text>
                    </div>
                    <Meta title={perfume.perfumeTitle} description={perfume.perfumer} style={{ textAlign: "center" }} />
                    <Typography.Text className={"perfume-card-price"}>{formatPrice(perfume.price)}</Typography.Text>
                </Card>
            </Link>
        </Col>
    );
};

export default PerfumeCard;
