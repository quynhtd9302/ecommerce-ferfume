import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, Row } from "antd";
import { CheckOutlined, EditOutlined, EyeInvisibleOutlined, ProfileOutlined } from "@ant-design/icons";

import { selectUserEditErrors, selectUserFromUserState } from "../../../redux-toolkit/user/user-selector";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import FormInput from "../../../components/FormInput/FormInput";
import IconButton from "../../../components/IconButton/IconButton";
import { updateUserInfo } from "../../../redux-toolkit/user/user-thunks";
import { resetInputForm } from "../../../redux-toolkit/user/user-slice";

interface PersonalDataForm {
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    phoneNumber: string;
    postIndex: string;
}

const PersonalData: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const usersData = useSelector(selectUserFromUserState);
    const errors = useSelector(selectUserEditErrors);
    const [showUserData, setShowUserData] = useState<boolean>(false);
    const { firstNameError, lastNameError } = errors;

    const onClickShowUserData = (): void => {
        setShowUserData((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(resetInputForm());

        if (usersData) {
            form.setFieldsValue(usersData);
        }
    // Intentionally not re-run when usersData changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, form]);

    const onFormSubmit = (data: PersonalDataForm): void => {
        dispatch(updateUserInfo({ id: usersData?.id, ...data }));
    };

    return (
        <>
            <ContentTitle title={t("account.myAccount")} titleLevel={4} icon={<ProfileOutlined />} />
            <Row>
                <Col span={12}>
                    <AccountDataItem title={t("account.email")} text={usersData?.email} />
                    <AccountDataItem title={t("account.firstName")} text={usersData?.firstName} />
                    <AccountDataItem title={t("account.lastName")} text={usersData?.lastName} />
                    <AccountDataItem title={t("account.city")} text={usersData?.city} />
                    <AccountDataItem title={t("account.address")} text={usersData?.address} />
                    <AccountDataItem title={t("account.phoneNumber")} text={usersData?.phoneNumber} />
                    <AccountDataItem title={t("account.postIndex")} text={usersData?.postIndex} />
                    <Button
                        type={"primary"}
                        onClick={onClickShowUserData}
                        icon={showUserData ? <EyeInvisibleOutlined /> : <EditOutlined />}
                    >
                        {showUserData ? t("account.hide") : t("common.edit")}
                    </Button>
                </Col>
                <Col span={12}>
                    {showUserData && (
                        <Form onFinish={onFormSubmit} form={form}>
                            <FormInput
                                title={`${t("account.firstName")}:`}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"firstName"}
                                error={firstNameError}
                                placeholder={t("account.firstName")}
                            />
                            <FormInput
                                title={`${t("account.lastName")}:`}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"lastName"}
                                error={lastNameError}
                                placeholder={t("account.lastName")}
                            />
                            <FormInput
                                title={`${t("account.city")}:`}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"city"}
                                placeholder={t("account.city")}
                            />
                            <FormInput
                                title={`${t("account.address")}:`}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"address"}
                                placeholder={t("account.address")}
                            />
                            <FormInput
                                title={`${t("account.phoneNumber")}:`}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"phoneNumber"}
                                placeholder={t("account.phoneNumber")}
                            />
                            <FormInput
                                title={`${t("account.postIndex")}:`}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"postIndex"}
                                placeholder={t("account.postIndex")}
                            />
                            <IconButton title={t("common.save")} icon={<CheckOutlined />} />
                        </Form>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default PersonalData;
