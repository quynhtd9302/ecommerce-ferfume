import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Alert, Col, Divider, Form, Row, Typography } from "antd";
import { KeyOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";

import {
    selectErrorMessage,
    selectIsAuthLoading,
    selectSuccessMessage
} from "../../redux-toolkit/auth/auth-selector";
import { setAuthLoadingState } from "../../redux-toolkit/auth/auth-slice";
import { LoadingStatus } from "../../types/types";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import FormInput from "../../components/FormInput/FormInput";
import IconButton from "../../components/IconButton/IconButton";
import { forgotPassword } from "../../redux-toolkit/auth/auth-thunks";

const ForgotPassword: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const error = useSelector(selectErrorMessage);
    const success = useSelector(selectSuccessMessage);
    const isLoading = useSelector(selectIsAuthLoading);

    useEffect(() => {
        dispatch(setAuthLoadingState(LoadingStatus.LOADED));
    }, [dispatch]);

    useEffect(() => {
        form.resetFields();
    }, [success, form]);

    const onClickSend = (value: { email: string }): void => {
        dispatch(forgotPassword(value.email));
    };

    return (
        <ContentWrapper>
            <ContentTitle icon={<KeyOutlined />} title={t("auth.forgotPasswordTitle").toUpperCase()} />
            <Row gutter={32}>
                <Col span={12}>
                    <Form form={form} onFinish={onClickSend}>
                        <Divider />
                        <Typography.Text style={{ display: "block", marginBottom: 16 }}>
                            {t("auth.forgotPasswordHint")}
                        </Typography.Text>
                        {error && <Alert type="error" message={error} />}
                        {success && <Alert type="success" message={success} />}
                        <FormInput
                            title={t("auth.eMail")}
                            icon={<MailOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"email"}
                            placeholder={"E-mail"}
                            rule={[{ required: true, message: t("auth.emailRequired") }]}
                        />
                        <IconButton disabled={isLoading} title={t("common.send")} icon={<SendOutlined />} />
                    </Form>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default ForgotPassword;
