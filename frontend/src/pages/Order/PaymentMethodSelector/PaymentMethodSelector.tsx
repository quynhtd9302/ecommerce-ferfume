import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Radio } from "antd";
import { BankOutlined, CarOutlined } from "@ant-design/icons";

import { PaymentMethod } from "../../../types/types";
import "./PaymentMethodSelector.css";

type PropsType = {
    value: PaymentMethod;
    onChange: (value: PaymentMethod) => void;
};

const PaymentMethodSelector: FC<PropsType> = ({ value, onChange }): ReactElement => {
    const { t } = useTranslation();

    const options = [
        {
            value: PaymentMethod.COD,
            icon: <CarOutlined />,
            title: t("order.paymentMethodCod"),
            description: t("order.paymentMethodCodDescription")
        },
        {
            value: PaymentMethod.BANK_TRANSFER,
            icon: <BankOutlined />,
            title: t("order.paymentMethodBankTransfer"),
            description: t("order.paymentMethodBankTransferDescription")
        }
    ];

    return (
        <div className={"payment-method-selector"}>
            <span className={"payment-method-selector-title"}>{t("order.paymentMethod")}</span>
            <Radio.Group
                className={"payment-method-selector-group"}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={"payment-method-card" + (value === option.value ? " is-selected" : "")}
                    >
                        <Radio value={option.value} className={"payment-method-card-radio"} />
                        <span className={"payment-method-card-icon"}>{option.icon}</span>
                        <span className={"payment-method-card-text"}>
                            <span className={"payment-method-card-title"}>{option.title}</span>
                            <span className={"payment-method-card-description"}>{option.description}</span>
                        </span>
                    </label>
                ))}
            </Radio.Group>
        </div>
    );
};

export default PaymentMethodSelector;
