import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioChangeEvent, Row, Typography } from "antd";

import { PerfumePrice } from "../../../types/types";
import { usePrice } from "../../../hooks/usePrice";

type PropsType = {
    title: string;
    onChange: (event: RadioChangeEvent) => void;
    data: Array<PerfumePrice>;
};

// Display-only bounds per price band id (the real filter range stays in MenuData's `array`).
const priceBounds: Record<number, { min?: number; max?: number; openEnded?: boolean }> = {
    1: {},
    2: { min: 15, max: 25 },
    3: { min: 25, max: 40 },
    4: { min: 40, max: 90 },
    5: { min: 90, openEnded: true }
};

const MenuRadioSection: FC<PropsType> = ({ title, onChange, data }): ReactElement => {
    const { t } = useTranslation();
    const formatPrice = usePrice();

    const getLabel = (id: number): string => {
        const bounds = priceBounds[id];
        if (!bounds || (bounds.min === undefined && bounds.max === undefined)) {
            return t("menu.any");
        }
        if (bounds.openEnded) {
            return `${formatPrice(bounds.min!)}+`;
        }
        return `${formatPrice(bounds.min!)} - ${formatPrice(bounds.max!)}`;
    };

    return (
        <div>
            <Typography.Title level={5} style={{ marginTop: 8 }}>
                {title}
            </Typography.Title>
            <Radio.Group onChange={onChange}>
                {data.map((value, index) => (
                    <Row key={index}>
                        <Radio value={value.array}>{getLabel(value.id)}</Radio>
                    </Row>
                ))}
            </Radio.Group>
        </div>
    );
};

export default MenuRadioSection;
