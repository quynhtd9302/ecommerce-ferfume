import React, {FC, ReactElement, useEffect} from "react";
import { Col, Row, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import { SHOP_EMAIL, SHOP_PHONE } from "../../constants/shopInfo";

const Contacts: FC = (): ReactElement => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <ContentWrapper>
            <ContentTitle icon={<InfoCircleOutlined />} title={"Contacts"} />
            <Row gutter={32}>
                <Col span={12}>
                    {SHOP_PHONE && (
                        <div>
                            <Typography.Text strong>{"Mobile: "}</Typography.Text>
                            <Typography.Text>{SHOP_PHONE}</Typography.Text>
                        </div>
                    )}
                    {SHOP_EMAIL && (
                        <div>
                            <Typography.Text strong>{"E-mail: "}</Typography.Text>
                            <Typography.Text>{SHOP_EMAIL}</Typography.Text>
                        </div>
                    )}
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Working time</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>
                            The online store is open from 08:00 to 20:00 without breaks and weekends. <br />
                            Online orders are accepted around the clock.
                        </Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Delivery</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>Delivery of orders come through courier service.</Typography.Text>
                    </div>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Contacts;
