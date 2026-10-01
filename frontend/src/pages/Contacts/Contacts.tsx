import React, {FC, ReactElement, useEffect} from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import { SHOP_EMAIL, SHOP_PHONE } from "../../constants/shopInfo";

const Contacts: FC = (): ReactElement => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ContentWrapper>
            <ContentTitle icon={<InfoCircleOutlined />} title={t("contacts.title")} />
            <Row gutter={32}>
                <Col span={12}>
                    {SHOP_PHONE && (
                        <div>
                            <Typography.Text strong>{t("contacts.mobile")}</Typography.Text>
                            <Typography.Text>{SHOP_PHONE}</Typography.Text>
                        </div>
                    )}
                    {SHOP_EMAIL && (
                        <div>
                            <Typography.Text strong>{t("contacts.email")}</Typography.Text>
                            <Typography.Text>{SHOP_EMAIL}</Typography.Text>
                        </div>
                    )}
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>{t("contacts.workingTime")}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>
                            {t("contacts.workingTimeText")} <br />
                            {t("contacts.onlineOrders")}
                        </Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>{t("contacts.delivery")}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>{t("contacts.deliveryText")}</Typography.Text>
                    </div>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Contacts;
