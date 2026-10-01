import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import { selectIsUserLoading, selectUserFromUserState } from "../../../redux-toolkit/user/user-selector";
import Spinner from "../../../components/Spinner/Spinner";

const AccountItem: FC = (): ReactElement => {
    const { t } = useTranslation();
    const usersData = useSelector(selectUserFromUserState);
    const loading = useSelector(selectIsUserLoading);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <Typography.Title level={5} style={{ textAlign: "center" }}>
                    {t("account.hello", { firstName: usersData?.firstName, lastName: usersData?.lastName })}
                </Typography.Title>
            )}
        </>
    );
};

export default AccountItem;
