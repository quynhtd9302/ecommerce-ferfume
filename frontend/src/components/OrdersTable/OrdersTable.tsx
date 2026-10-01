import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import { AsyncThunk } from "@reduxjs/toolkit";

import { HeaderResponse, OrderResponse } from "../../types/types";
import { ACCOUNT_USER_ORDERS } from "../../constants/routeConstants";
import { selectTotalElements } from "../../redux-toolkit/orders/orders-selector";
import { useTablePagination } from "../../hooks/useTablePagination";
import { usePrice } from "../../hooks/usePrice";

type PropsType = {
    orders: Array<OrderResponse>;
    loading: boolean;
    fetchOrders: AsyncThunk<HeaderResponse<OrderResponse>, number, {}>;
};

const OrdersTable: FC<PropsType> = ({ orders, loading, fetchOrders }): ReactElement => {
    const { t } = useTranslation();
    const formatPrice = usePrice();
    const totalElements = useSelector(selectTotalElements);
    const handleTableChange = useTablePagination<OrderResponse, number>(fetchOrders);

    return (
        <Table
            rowKey={"id"}
            onChange={handleTableChange}
            loading={loading}
            scroll={{ x: true }}
            pagination={{
                total: totalElements,
                position: ["bottomRight", "topRight"]
            }}
            dataSource={orders}
            columns={[
                {
                    title: t("account.orderNo"),
                    dataIndex: "id",
                    key: "id"
                },
                {
                    title: t("account.date"),
                    dataIndex: "date",
                    key: "date",
                    sorter: (a, b) => a.date.localeCompare(b.date)
                },
                {
                    title: t("account.customer"),
                    dataIndex: "firstName",
                    key: "firstName",
                    render: (_, order: OrderResponse) => `${order.firstName} ${order.lastName}`
                },
                {
                    title: t("account.email"),
                    dataIndex: "email",
                    key: "email"
                },
                {
                    title: t("account.sum"),
                    dataIndex: "totalPrice",
                    key: "totalPrice",
                    sorter: (a, b) => a.totalPrice - b.totalPrice,
                    render: (totalPrice: number) => formatPrice(totalPrice)
                },
                {
                    title: t("common.actions"),
                    dataIndex: "operations",
                    key: "operations",
                    render: (_, order: OrderResponse) => (
                        <Link to={`${ACCOUNT_USER_ORDERS}/${order.id}`}>{t("common.showMore")}</Link>
                    )
                }
            ]}
        />
    );
};

export default OrdersTable;
