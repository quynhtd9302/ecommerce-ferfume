import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Table } from "antd";

import { selectAdminStateUser, selectIsAdminStateLoading } from "../../../redux-toolkit/admin/admin-selector";
import { selectOrders, selectTotalElements } from "../../../redux-toolkit/orders/orders-selector";
import { fetchUserInfo } from "../../../redux-toolkit/admin/admin-thunks";
import { resetOrders } from "../../../redux-toolkit/orders/orders-slice";
import { resetAdminState } from "../../../redux-toolkit/admin/admin-slice";
import { LoadingStatus, OrderResponse, UserOrdersRequest } from "../../../types/types";
import { fetchUserOrdersByEmail } from "../../../redux-toolkit/orders/orders-thunks";
import Spinner from "../../../components/Spinner/Spinner";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import { ACCOUNT_USER_ORDERS } from "../../../constants/routeConstants";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { usePrice } from "../../../hooks/usePrice";

const ManageUser: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const formatPrice = usePrice();
    const params = useParams<{ id: string }>();
    const userData = useSelector(selectAdminStateUser);
    const userOrders = useSelector(selectOrders);
    const totalElements = useSelector(selectTotalElements);
    const isUserLoading = useSelector(selectIsAdminStateLoading);
    const handleTableChange = useTablePagination<OrderResponse, UserOrdersRequest>(fetchUserOrdersByEmail, userData.email!);
    const { id, email, firstName, lastName, city, address, phoneNumber, postIndex, provider, roles } = userData;

    useEffect(() => {
        dispatch(fetchUserInfo(params.id));

        return () => {
            dispatch(resetOrders());
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, [dispatch, params.id]);

    useEffect(() => {
        if (userData.email) {
            dispatch(fetchUserOrdersByEmail({ email: userData.email!, page: 0 }));
        }
    }, [userData, dispatch]);

    return (
        <>
            {isUserLoading ? (
                <Spinner />
            ) : (
                <>
                    <ContentTitle title={t("account.userTitle", { firstName, lastName })} titleLevel={4} icon={<UserOutlined />} />
                    <Row>
                        <Col span={24}>
                            <Card>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <AccountDataItem title={t("account.userId")} text={id} />
                                        <AccountDataItem title={t("account.email")} text={email} />
                                        <AccountDataItem title={t("account.role")} text={roles} />
                                        <AccountDataItem title={t("account.firstName")} text={firstName} />
                                        <AccountDataItem title={t("account.lastName")} text={lastName} />
                                    </Col>
                                    <Col span={8}>
                                        <AccountDataItem title={t("account.provider")} text={provider} />
                                        <AccountDataItem title={t("account.city")} text={city} />
                                        <AccountDataItem title={t("account.address")} text={address} />
                                        <AccountDataItem title={t("account.phoneNumber")} text={phoneNumber} />
                                        <AccountDataItem title={t("account.postIndex")} text={postIndex} />
                                    </Col>
                                </Row>
                            </Card>
                            <Row style={{ marginTop: 16 }}>
                                <Col span={24}>
                                    {userOrders.length === 0 ? (
                                        <div style={{ textAlign: "center" }}>
                                            <ContentTitle title={t("account.noOrdersShort")} titleLevel={4} />
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{ textAlign: "center" }}>
                                                <ContentTitle title={t("account.orders")} titleLevel={4} />
                                            </div>
                                            <Table
                                                rowKey={"id"}
                                                onChange={handleTableChange}
                                                pagination={{
                                                    total: totalElements,
                                                    position: ["bottomRight", "topRight"]
                                                }}
                                                dataSource={userOrders}
                                                columns={[
                                                    {
                                                        title: t("account.orderNo"),
                                                        dataIndex: "id",
                                                        key: "id"
                                                    },
                                                    {
                                                        title: t("account.date"),
                                                        dataIndex: "date",
                                                        key: "date"
                                                    },
                                                    {
                                                        title: t("account.city"),
                                                        dataIndex: "city",
                                                        key: "city"
                                                    },
                                                    {
                                                        title: t("account.address"),
                                                        dataIndex: "address",
                                                        key: "address"
                                                    },
                                                    {
                                                        title: t("account.postIndex"),
                                                        dataIndex: "postIndex",
                                                        key: "postIndex"
                                                    },
                                                    {
                                                        title: t("account.orderSummary"),
                                                        dataIndex: "totalPrice",
                                                        key: "totalPrice",
                                                        render: (_, order: OrderResponse) => formatPrice(order.totalPrice)
                                                    },
                                                    {
                                                        title: t("common.actions"),
                                                        dataIndex: "actions",
                                                        key: "actions",
                                                        render: (_, order: OrderResponse) => (
                                                            <Link to={`${ACCOUNT_USER_ORDERS}/${order.id}`}>
                                                                {t("common.showMore")}
                                                            </Link>
                                                        )
                                                    }
                                                ]}
                                            />
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUser;
