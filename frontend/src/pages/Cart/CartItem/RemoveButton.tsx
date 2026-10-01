import React, { FC, memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

type PropsType = {
    perfumeId: number;
    deleteFromCart: (perfumeId: number) => void;
};

const RemoveButton: FC<PropsType> = memo(({ perfumeId, deleteFromCart }): ReactElement => {
    const { t } = useTranslation();

    return (
        <Button onClick={() => deleteFromCart(perfumeId)} icon={<CloseOutlined />}>
            {t("common.remove")}
        </Button>
    );
});

export default RemoveButton;
