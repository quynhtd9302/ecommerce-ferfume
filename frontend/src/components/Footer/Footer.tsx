import React, { FC, ReactElement } from "react";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";

import { SHOP_NAME, SHOP_PHONE, SOCIAL_LINKS } from "../../constants/shopInfo";
import "./Footer.scss";

const socialNetworks = [
    { url: SOCIAL_LINKS.facebook, label: "Facebook", icon: <FacebookOutlined /> },
    { url: SOCIAL_LINKS.instagram, label: "Instagram", icon: <InstagramOutlined /> },
    { url: SOCIAL_LINKS.twitter, label: "Twitter", icon: <TwitterOutlined /> }
].filter((network) => network.url);

const Footer: FC = (): ReactElement => {
    return (
        <div className={"footer-wrapper"}>
            <div className={"footer-inner"}>
                <Row >
                    <Col span={12}>
                        <Typography.Title level={3}>{SHOP_NAME}</Typography.Title>
                        {SHOP_PHONE && <Typography.Text>{SHOP_PHONE}</Typography.Text>}
                        <Typography.Text className={"mt-12"}>from 08:00 to 20:00 without breaks and weekends</Typography.Text>
                    </Col>
                    {socialNetworks.length > 0 && (
                        <Col span={12} >
                            <div className={"footer-wrapper-social"}>
                                <Typography.Title level={3}>Social networks</Typography.Title>
                                {socialNetworks.map((network) => (
                                    <a key={network.label} href={network.url} aria-label={network.label} target="_blank" rel="noopener noreferrer">
                                        {network.icon}
                                    </a>
                                ))}
                            </div>
                        </Col>
                    )}
                </Row>
                <Row className={"footer-wrapper-copyright"}>
                    <Typography.Text>© {new Date().getFullYear()} {SHOP_NAME}</Typography.Text>
                </Row>
            </div>
        </div>
    );
};

export default Footer;
