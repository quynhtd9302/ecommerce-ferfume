import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Form, FormInstance, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import IconButton from "../IconButton/IconButton";

type PropsType = {
    onSearch: (data: { searchValue: string }) => void;
    form?: FormInstance<{ searchValue: string }>;
};

const InputSearch: FC<PropsType> = ({ onSearch, form }): ReactElement => {
    const { t } = useTranslation();

    return (
        <Form onFinish={onSearch} form={form}>
            <Input.Group compact>
                <Form.Item name={"searchValue"}>
                    <Input placeholder={t("menu.searchPlaceholder")} />
                </Form.Item>
                <IconButton title={t("menu.search")} icon={<SearchOutlined />} />
            </Input.Group>
        </Form>
    );
};

export default InputSearch;
