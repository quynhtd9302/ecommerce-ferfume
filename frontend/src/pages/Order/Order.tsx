import React, {FC, ReactElement, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Typography } from "antd";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import FormInput from "../../components/FormInput/FormInput";
import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import {selectCartItems, selectTotalPrice} from "../../redux-toolkit/cart/cart-selector";
import { selectIsOrderLoading, selectOrderErrors } from "../../redux-toolkit/order/order-selector";
import { resetOrderState, setOrderLoadingState } from "../../redux-toolkit/order/order-slice";
import { LoadingStatus, PaymentMethod } from "../../types/types";
import { addOrder } from "../../redux-toolkit/order/order-thunks";
import {resetCartState} from "../../redux-toolkit/cart/cart-slice";
import {fetchCart} from "../../redux-toolkit/cart/cart-thunks";
import OrderItem from "./OrderItem/OrderItem";
import PaymentMethodSelector from "./PaymentMethodSelector/PaymentMethodSelector";
import { usePrice } from "../../hooks/usePrice";
import "./Order.css";

interface OrderFormData {
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    phoneNumber: string;
    postIndex: string;
    email: string;
}

const Order: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const formatPrice = usePrice();
    const [form] = Form.useForm();
    const usersData = useSelector(selectUserFromUserState);
    const perfumes = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const errors = useSelector(selectOrderErrors);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const [perfumesFromLocalStorage, setPerfumesFromLocalStorage] = useState<Map<number, number>>(new Map());
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);
    // Local flag, independent of the shared cart.loadingState: that state can
    // still read as LOADED from a previous page (e.g. the Cart page itself)
    // on this page's very first render, before the fetchCart dispatched below
    // has had a chance to flip it back to LOADING. Tracking readiness locally
    // guarantees the submit button starts disabled on every mount and only
    // enables once this page's own fetchCart call has actually resolved.
    const [isCartReady, setIsCartReady] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;
        const perfumesFromLocalStorage: Map<number, number> = new Map(
            JSON.parse(localStorage.getItem("perfumes") as string)
        );
        setPerfumesFromLocalStorage(perfumesFromLocalStorage);
        dispatch(setOrderLoadingState(LoadingStatus.LOADED));
        (async (): Promise<void> => {
            try {
                await dispatch(fetchCart(Array.from(perfumesFromLocalStorage.keys())));
            } finally {
                if (isMounted) {
                    setIsCartReady(true);
                }
            }
        })();

        if (usersData) {
            form.setFieldsValue(usersData);
        }

        return () => {
            isMounted = false;
            dispatch(resetOrderState());
            dispatch(resetCartState());
        };
    // Intentionally not re-run when usersData changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, form]);

    const onFormSubmit = (order: OrderFormData): void => {
        // Guard against submitting before the cart (and its totalPrice) has
        // finished loading — the submit button is disabled for the same
        // reason, but a Form can also be submitted by pressing Enter in a
        // text field, which bypasses a disabled button.
        if (!isCartReady) {
            return;
        }

        const perfumesId = Object.fromEntries(new Map(JSON.parse(localStorage.getItem("perfumes") as string)));
        dispatch(addOrder({ order: { ...order, perfumesId, totalPrice, paymentMethod }, history }));
    };

    return (
        <ContentWrapper>
            <div style={{ textAlign: "center" }}>
                <ContentTitle icon={<ShoppingOutlined />} title={t("order.title")} />
            </div>
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={[32, 24]}>
                    <Col xs={24} md={12} className={"order-form-fields"}>
                        <FormInput
                            title={t("order.name")}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"firstName"}
                            error={errors.firstNameError}
                            disabled={isOrderLoading}
                            placeholder={t("order.namePlaceholder")}
                        />
                        <FormInput
                            title={t("order.surname")}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"lastName"}
                            error={errors.lastNameError}
                            disabled={isOrderLoading}
                            placeholder={t("order.surnamePlaceholder")}
                        />
                        <FormInput
                            title={t("order.city")}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"city"}
                            error={errors.cityError}
                            disabled={isOrderLoading}
                            placeholder={t("order.cityPlaceholder")}
                        />
                        <FormInput
                            title={t("order.address")}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"address"}
                            error={errors.addressError}
                            disabled={isOrderLoading}
                            placeholder={t("order.addressPlaceholder")}
                        />
                        <FormInput
                            title={t("order.index")}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"postIndex"}
                            error={errors.postIndexError}
                            disabled={isOrderLoading}
                            placeholder={t("order.indexPlaceholder")}
                        />
                        <FormInput
                            title={t("order.mobile")}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"phoneNumber"}
                            error={errors.phoneNumberError}
                            disabled={isOrderLoading}
                            placeholder={"(___)-___-____"}
                        />
                        <FormInput
                            title={t("order.email")}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"email"}
                            error={errors.emailError}
                            disabled={isOrderLoading}
                            placeholder={t("order.emailPlaceholder")}
                        />
                        <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
                    </Col>
                    <Col xs={24} md={12} className={"order-summary"}>
                        <Row gutter={[32, 32]}>
                            {perfumes.map((perfume) => (
                                <OrderItem
                                    key={perfume.id}
                                    perfume={perfume}
                                    quantity={perfumesFromLocalStorage.get(perfume.id)}
                                />
                            ))}
                        </Row>
                        <Row gutter={[32, 32]} className={"order-summary-total"} style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <Typography.Title level={3}>{t("order.toPay", { price: formatPrice(totalPrice) })}</Typography.Title>
                            </Col>
                            <Col>
                                <Button
                                    htmlType={"submit"}
                                    loading={isOrderLoading || !isCartReady}
                                    disabled={!isCartReady}
                                    type="primary"
                                    size="large"
                                    icon={<CheckCircleOutlined />}
                                >
                                    {t("common.validateOrder")}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </ContentWrapper>
    );
};

export default Order;
