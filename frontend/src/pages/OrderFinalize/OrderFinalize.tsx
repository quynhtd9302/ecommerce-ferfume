import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import { selectOrder } from "../../redux-toolkit/order/order-selector";
import { resetCartState } from "../../redux-toolkit/cart/cart-slice";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { PaymentMethod } from "../../types/types";
import { BANK_INFO } from "../../constants/shopInfo";
import { buildVietQrUrl } from "../../utils/vietqr";
import { usePrice } from "../../hooks/usePrice";
import "./OrderFinalize.css";

const OrderFinalize: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const formatPrice = usePrice();
    const order = useSelector(selectOrder);
    const [qrFailed, setQrFailed] = useState<boolean>(false);

    useEffect(() => {
        dispatch(resetCartState());
    }, [dispatch]);

    const paymentMethodLabel =
        order.paymentMethod === PaymentMethod.BANK_TRANSFER
            ? t("order.paymentMethodBankTransfer")
            : t("order.paymentMethodCod");

    const transferContent = t("orderFinalize.transferContentValue", { id: order.id });
    const qrUrl = BANK_INFO.bankBin ? buildVietQrUrl(order.totalPrice ?? 0, transferContent) : "";

    return (
        <ContentWrapper>
            <div style={{ textAlign: "center" }}>
                <Typography.Title level={2}>{t("orderFinalize.thankYou")}</Typography.Title>
                <Typography.Text>{t("orderFinalize.orderNumber", { id: order.id })}</Typography.Text>
                <br />
                <Typography.Text>{t("orderFinalize.paymentMethodLabel", { method: paymentMethodLabel })}</Typography.Text>
            </div>
            {order.paymentMethod === PaymentMethod.BANK_TRANSFER ? (
                <div className={"bank-transfer-info"}>
                    <Typography.Title level={4}>{t("orderFinalize.bankTransferTitle")}</Typography.Title>
                    <Typography.Text>{t("orderFinalize.bankTransferNote")}</Typography.Text>
                    {qrUrl && !qrFailed && (
                        <div className={"bank-transfer-qr"}>
                            <img
                                src={qrUrl}
                                alt={t("orderFinalize.scanToPay")}
                                onError={() => setQrFailed(true)}
                            />
                            <Typography.Text type={"secondary"}>{t("orderFinalize.scanToPay")}</Typography.Text>
                        </div>
                    )}
                    <div className={"bank-transfer-details"}>
                        <div className={"bank-transfer-row"}>
                            <span>{t("orderFinalize.bankName")}</span>
                            <strong>{BANK_INFO.bankName}</strong>
                        </div>
                        <div className={"bank-transfer-row"}>
                            <span>{t("orderFinalize.accountNumber")}</span>
                            <strong>{BANK_INFO.accountNumber}</strong>
                        </div>
                        <div className={"bank-transfer-row"}>
                            <span>{t("orderFinalize.accountHolder")}</span>
                            <strong>{BANK_INFO.accountHolder}</strong>
                        </div>
                        <div className={"bank-transfer-row"}>
                            <span>{t("orderFinalize.transferAmount")}</span>
                            <strong>{formatPrice(order.totalPrice ?? 0)}</strong>
                        </div>
                        <div className={"bank-transfer-row"}>
                            <span>{t("orderFinalize.transferContent")}</span>
                            <strong>{transferContent}</strong>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <Typography.Text type={"secondary"}>{t("orderFinalize.codNote")}</Typography.Text>
                </div>
            )}
        </ContentWrapper>
    );
};

export default OrderFinalize;
