import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

import { selectIsOrdersLoading, selectOrders } from "../../../redux-toolkit/orders/orders-selector";
import { fetchAllUsersOrders } from "../../../redux-toolkit/orders/orders-thunks";
import { resetOrders } from "../../../redux-toolkit/orders/orders-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import OrdersTable from "../../../components/OrdersTable/OrdersTable";
import { ACCOUNT_USER_ORDERS } from "../../../constants/routeConstants";

const OrdersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const adminOrders = useSelector(selectOrders);
    const isOrderLoading = useSelector(selectIsOrdersLoading);
    const [searchError, setSearchError] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchAllUsersOrders(0));

        return () => {
            dispatch(resetOrders());
        };
    }, [dispatch]);

    // Accepts either the raw order id ("21") or the bank transfer content
    // shown on the confirmation page ("DH21"), so an admin can paste the
    // transfer description straight from a bank statement when reconciling
    // a bank-transfer order.
    const onSearchOrder = (value: string): void => {
        const id = value.trim().replace(/^DH/i, "").trim();

        if (/^\d+$/.test(id)) {
            setSearchError(false);
            history.push(`${ACCOUNT_USER_ORDERS}/${id}`);
        } else if (id) {
            setSearchError(true);
        }
    };

    return (
        <>
            <ContentTitle title={t("account.listOfAllOrders")} titleLevel={4} icon={<ShoppingOutlined />} />
            <Input.Search
                className={"orders-list-search"}
                placeholder={t("account.searchOrderPlaceholder")}
                onSearch={onSearchOrder}
                onChange={() => setSearchError(false)}
                status={searchError ? "error" : undefined}
                style={{ maxWidth: 320, marginBottom: 16 }}
                allowClear
            />
            <OrdersTable orders={adminOrders} loading={isOrderLoading} fetchOrders={fetchAllUsersOrders} />
        </>
    );
};

export default OrdersList;
