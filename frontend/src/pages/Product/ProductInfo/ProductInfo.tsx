import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Divider, Rate, Row, Space, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import Description from "./Description/Description";
import { FullPerfumeResponse } from "../../../types/types";
import { getImageUrl } from "../../../utils/image-url";
import { usePrice } from "../../../hooks/usePrice";

type PropsType = {
    perfume?: Partial<FullPerfumeResponse>;
    reviewsLength: number;
    addToCart: () => void;
};

const ProductInfo: FC<PropsType> = ({ perfume, reviewsLength, addToCart }): ReactElement => {
    const { t } = useTranslation();
    const formatPrice = usePrice();

    return (
        <>
        <Row className={"product-info"} gutter={[0, 24]}>
            <Col xs={24} md={12} className={"product-image-wrapper"}>
                <span className={"product-image-corner product-image-corner-tl"} />
                <span className={"product-image-corner product-image-corner-tr"} />
                <span className={"product-image-corner product-image-corner-bl"} />
                <span className={"product-image-corner product-image-corner-br"} />
                <img src={getImageUrl(perfume?.filename)} alt={perfume?.perfumeTitle} className={"product-image"} />
            </Col>
            <Col xs={24} md={12} className={"product-details"}>
                <Row className={"product-header"}>
                    <Col>
                        <Typography.Text className={"product-eyebrow"}>{perfume?.perfumer}</Typography.Text>
                        <Typography.Title level={3}>{perfume?.perfumeTitle}</Typography.Title>
                        <Typography.Text className={"product-subtitle"}>{perfume?.type}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col className={"product-rate"} span={8}>
                        <Rate allowHalf disabled value={perfume?.perfumeRating} />
                        <Typography.Text>{t("common.reviews", { count: reviewsLength })}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Typography.Text type="success">{t("common.inStock")}</Typography.Text>
                </Row>
                <Row className={"product-price-row"} style={{ marginTop: 16 }}>
                    <Col span={5}>
                        <Space align={"baseline"}>
                            <Typography.Text className={"product-price"}>{formatPrice(perfume?.price ?? 0)}</Typography.Text>
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Button type={"primary"} icon={<ShoppingCartOutlined />} onClick={addToCart}>
                            {t("common.addToCart")}
                        </Button>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}>
                        <Description title={t("product.gender")} />
                        <Description title={t("product.volume")} />
                        <Description title={t("product.releaseYear")} />
                        <Description title={t("product.manufacturerCountry")} />
                        <Description title={t("product.topNotesLabel")} />
                        <Description title={t("product.heartNotesLabel")} />
                        <Description title={t("product.baseNotesLabel")} />
                    </Col>
                    <Col span={16}>
                        <Description title={perfume?.perfumeGender} />
                        <Description title={`${perfume?.volume} ${t("common.ml")}`} />
                        <Description title={perfume?.year} />
                        <Description title={perfume?.country} />
                        <Description title={perfume?.fragranceTopNotes} />
                        <Description title={perfume?.fragranceMiddleNotes} />
                        <Description title={perfume?.fragranceBaseNotes} />
                    </Col>
                </Row>
            </Col>
        </Row>
        {(perfume?.fragranceTopNotes || perfume?.fragranceMiddleNotes || perfume?.fragranceBaseNotes) && (
            <div className={"fragrance-pyramid"}>
                <Typography.Title level={4} className={"fragrance-pyramid-title"}>
                    {t("product.fragrancePyramid")}
                </Typography.Title>
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={8} className={"fragrance-pyramid-item"}>
                        <span className={"fragrance-pyramid-icon"}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />
                            </svg>
                        </span>
                        <Typography.Text className={"fragrance-pyramid-label"}>{t("product.topNotes")}</Typography.Text>
                        <Typography.Text className={"fragrance-pyramid-value"}>{perfume?.fragranceTopNotes}</Typography.Text>
                    </Col>
                    <Col xs={24} md={8} className={"fragrance-pyramid-item"}>
                        <span className={"fragrance-pyramid-icon"}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <path d="M12 20s-6.5-4-8.5-8C2 8.5 3.5 5.5 6.5 5c2-.4 3.8.7 5.5 2.7C13.7 5.7 15.5 4.6 17.5 5c3 .5 4.5 3.5 3 7-2 4-8.5 8-8.5 8z" />
                            </svg>
                        </span>
                        <Typography.Text className={"fragrance-pyramid-label"}>{t("product.heartNotes")}</Typography.Text>
                        <Typography.Text className={"fragrance-pyramid-value"}>{perfume?.fragranceMiddleNotes}</Typography.Text>
                    </Col>
                    <Col xs={24} md={8} className={"fragrance-pyramid-item"}>
                        <span className={"fragrance-pyramid-icon"}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <path d="M3 19l6-10 4 6 2-3 6 7z" />
                            </svg>
                        </span>
                        <Typography.Text className={"fragrance-pyramid-label"}>{t("product.baseNotes")}</Typography.Text>
                        <Typography.Text className={"fragrance-pyramid-value"}>{perfume?.fragranceBaseNotes}</Typography.Text>
                    </Col>
                </Row>
            </div>
        )}
        </>
    );
};

export default ProductInfo;
