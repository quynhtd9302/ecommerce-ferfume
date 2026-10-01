import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, Col, Row, Table } from "antd";
import { InfoCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

import {
    selectIsOrderLoaded,
    selectIsOrderLoading,
    selectOrder,
    selectOrderItems
} from "../../../redux-toolkit/order/order-selector";
import { fetchOrderById, fetchOrderItemsByOrderId } from "../../../redux-toolkit/order/order-thunks";
import { resetOrderState } from "../../../redux-toolkit/order/order-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import Spinner from "../../../components/Spinner/Spinner";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import { OrderItemResponse, PaymentMethod } from "../../../types/types";
import { usePrice } from "../../../hooks/usePrice";
import "./ManageUserOrder.css";

const ManageUserOrder: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const formatPrice = usePrice();
    const params = useParams<{ id: string }>();
    const order = useSelector(selectOrder);
    const orderItems = useSelector(selectOrderItems);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const isOrderLoaded = useSelector(selectIsOrderLoaded);
    const { id, email, firstName, lastName, totalPrice, postIndex, phoneNumber, date, city, address, paymentMethod } = order;
    const paymentMethodLabel =
        paymentMethod === PaymentMethod.BANK_TRANSFER ? t("order.paymentMethodBankTransfer") : t("order.paymentMethodCod");

    useEffect(() => {
        dispatch(fetchOrderById(params.id));

        return () => {
            dispatch(resetOrderState());
        };
    }, [dispatch, params.id]);

    useEffect(() => {
        if (isOrderLoaded) {
            dispatch(fetchOrderItemsByOrderId(params.id));
        }
    }, [isOrderLoaded, dispatch, params.id]);

    return (
        <>
            {isOrderLoading ? (
                <Spinner />
            ) : (
                <>
                    <div style={{ textAlign: "center" }}>
                        <ContentTitle title={t("account.orderHash", { id })} titleLevel={4} icon={<ShoppingOutlined />} />
                    </div>
                    <Row>
                        <Col span={24}>
                            <Card>
                                <Row gutter={32}>
                                    <Col span={12}>
                                        <InfoCircleOutlined className={"manage-user-icon"} />
                                        <ContentTitle title={t("account.customerInformation")} titleLevel={5} />
                                        <AccountDataItem title={t("account.firstName")} text={firstName} />
                                        <AccountDataItem title={t("account.lastName")} text={lastName} />
                                        <AccountDataItem title={t("account.city")} text={city} />
                                        <AccountDataItem title={t("account.address")} text={address} />
                                        <AccountDataItem title={t("account.email")} text={email} />
                                        <AccountDataItem title={t("account.phoneNumber")} text={phoneNumber} />
                                        <AccountDataItem title={t("account.postIndex")} text={postIndex} />
                                    </Col>
                                    <Col span={12}>
                                        <InfoCircleOutlined className={"manage-user-icon"} />
                                        <ContentTitle title={t("account.orderInformation")} titleLevel={5} />
                                        <AccountDataItem title={t("account.orderId")} text={id} />
                                        <AccountDataItem title={t("account.date")} text={date} />
                                        <AccountDataItem title={t("account.paymentMethod")} text={paymentMethodLabel} />
                                        <ContentTitle title={t("account.orderSummaryPrice", { price: formatPrice(totalPrice ?? 0) })} titleLevel={4} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 16 }}>
                                    <Col span={24}>
                                        <Table
                                            rowKey={"id"}
                                            pagination={false}
                                            dataSource={orderItems}
                                            columns={[
                                                {
                                                    title: t("account.perfumeId"),
                                                    dataIndex: "id",
                                                    key: "id"
                                                },
                                                {
                                                    title: t("account.perfumeBrand"),
                                                    dataIndex: "perfumer",
                                                    key: "perfumer",
                                                    render: (_, order: OrderItemResponse) => order.perfume.perfumer
                                                },
                                                {
                                                    title: t("account.perfumeName"),
                                                    dataIndex: "perfumeTitle",
                                                    key: "perfumeTitle",
                                                    render: (_, order: OrderItemResponse) => order.perfume.perfumeTitle
                                                },
                                                {
                                                    title: t("account.quantity"),
                                                    dataIndex: "quantity",
                                                    key: "quantity"
                                                },
                                                {
                                                    title: t("account.price"),
                                                    dataIndex: "price",
                                                    key: "price",
                                                    render: (_, order: OrderItemResponse) => formatPrice(order.perfume.price)
                                                },
                                                {
                                                    title: t("account.amount"),
                                                    dataIndex: "amount",
                                                    key: "amount",
                                                    render: (_, order: OrderItemResponse) => formatPrice(order.amount)
                                                }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUserOrder;
