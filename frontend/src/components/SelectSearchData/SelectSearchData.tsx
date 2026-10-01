import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import {SearchPerfume} from "../../types/types";

const searchByData = [
    { labelKey: "menu.searchByBrand", value: SearchPerfume.BRAND },
    { labelKey: "menu.searchByTitle", value: SearchPerfume.PERFUME_TITLE },
    { labelKey: "menu.searchByCountry", value: SearchPerfume.COUNTRY }
];

type PropsType = {
    handleChangeSelect: (value: SearchPerfume) => void;
};

const SelectSearchData: FC<PropsType> = ({ handleChangeSelect }): ReactElement => {
    const { t } = useTranslation();

    return (
        <Select defaultValue={SearchPerfume.BRAND} onChange={handleChangeSelect} style={{ width: 250 }}>
            {searchByData.map((value, index) => (
                <Select.Option key={index} value={value.value}>
                    {t(value.labelKey)}
                </Select.Option>
            ))}
        </Select>
    );
};

export default SelectSearchData;
