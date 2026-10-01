import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TeamOutlined } from "@ant-design/icons";
import { Table } from "antd";

import {
    selectAdminStateUsers,
    selectIsAdminStateLoading,
    selectTotalElements
} from "../../../redux-toolkit/admin/admin-selector";
import { fetchAllUsers } from "../../../redux-toolkit/admin/admin-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import { BaseUserResponse, LoadingStatus } from "../../../types/types";
import { ACCOUNT_ADMIN_USERS } from "../../../constants/routeConstants";
import { resetAdminState } from "../../../redux-toolkit/admin/admin-slice";
import { useTablePagination } from "../../../hooks/useTablePagination";

const UsersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const users = useSelector(selectAdminStateUsers);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const totalElements = useSelector(selectTotalElements);
    const handleTableChange = useTablePagination<BaseUserResponse, number>(fetchAllUsers);

    useEffect(() => {
        dispatch(fetchAllUsers(0));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, [dispatch]);

    return (
        <div>
            <ContentTitle title={t("account.listOfAllUsers")} titleLevel={4} icon={<TeamOutlined />} />
            <Table
                rowKey={"id"}
                onChange={handleTableChange}
                loading={isLoading}
                scroll={{ x: true }}
                pagination={{
                    total: totalElements,
                    position: ["bottomRight", "topRight"]
                }}
                dataSource={users}
                columns={[
                    {
                        title: t("account.id"),
                        dataIndex: "id",
                        key: "id"
                    },
                    {
                        title: t("account.firstName"),
                        dataIndex: "firstName",
                        key: "firstName"
                    },
                    {
                        title: "E-mail",
                        dataIndex: "email",
                        key: "email"
                    },
                    {
                        title: t("account.role"),
                        dataIndex: "roles",
                        key: "roles",
                        render: (_, user: BaseUserResponse) => user.roles[0]
                    },
                    {
                        title: t("account.provider"),
                        dataIndex: "provider",
                        key: "provider"
                    },
                    {
                        title: t("common.actions"),
                        dataIndex: "amount",
                        key: "amount",
                        render: (_, user: BaseUserResponse) => (
                            <Link to={`${ACCOUNT_ADMIN_USERS}/${user.id}`}>{t("common.showMore")}</Link>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default UsersList;
