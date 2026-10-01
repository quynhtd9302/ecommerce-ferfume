import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioChangeEvent } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import "./MenuSorter.css";

type PropsType = {
    onChange: (event: RadioChangeEvent) => void;
    sortByPrice?: boolean;
};

const MenuSorter: FC<PropsType> = ({ onChange, sortByPrice }): ReactElement => {
    const { t } = useTranslation();

    return (
        <Radio.Group value={sortByPrice} onChange={onChange} style={{ float: "right" }}>
            <Radio.Button disabled className={"price-button"}>
                {t("menu.sortByPrice")}
            </Radio.Button>
            <Radio.Button value={false}>
                <ArrowDownOutlined />
            </Radio.Button>
            <Radio.Button value={true}>
                <ArrowUpOutlined />
            </Radio.Button>
        </Radio.Group>
    );
};

export default MenuSorter;
