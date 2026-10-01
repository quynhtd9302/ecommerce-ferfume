import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

import {BASE_URL} from "../../../constants/urlConstants";
import "./SocialButton.css";

type PropsType = {
    socialNetwork: string;
    image: string;
};

const socialLabelKeys: Record<string, string> = {
    google: "auth.loginWithGoogle",
    facebook: "auth.loginWithFacebook",
    github: "auth.loginWithGithub"
};

const SocialButton: FC<PropsType> = ({ socialNetwork, image }): ReactElement => {
    const { t } = useTranslation();

    return (
        <a href={`${BASE_URL}/oauth2/authorize/${socialNetwork}`}>
            <Button className={`social-btn ${socialNetwork}`} size="large" block>
                <img src={image} alt={socialNetwork} />
                {t(socialLabelKeys[socialNetwork] ?? "")}
            </Button>
        </a>
    );
};

export default SocialButton;
