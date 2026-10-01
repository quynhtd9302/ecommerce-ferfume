import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Col, Modal, Row, Typography } from "antd";

import { PerfumeResponse } from "../../../../types/types";
import "./DeleteModal.css";
import { getImageUrl } from "../../../../utils/image-url";

type PropsType = {
    visible: boolean;
    deletePerfumeHandler: () => void;
    handleCancel: () => void;
    perfumeInfo?: PerfumeResponse;
};

const DeleteModal: FC<PropsType> = ({ visible, deletePerfumeHandler, handleCancel, perfumeInfo }): ReactElement => {
    const { t } = useTranslation();

    return (
        <Modal title={t("account.deletePerfume")} visible={visible} onOk={deletePerfumeHandler} onCancel={handleCancel}>
            <Row>
                <Col span={12} className={"delete-modal-perfume-image-wrapper"}>
                    <img
                        className={"delete-modal-perfume-image"}
                        alt={perfumeInfo?.perfumeTitle}
                        src={getImageUrl(perfumeInfo?.filename)}
                    />
                </Col>
                <Col span={12}>
                    <Typography.Text>{t("account.deleteConfirm")}</Typography.Text>
                    <Typography.Title level={5}>{perfumeInfo?.perfumer}</Typography.Title>
                    <Typography.Title level={5}>{perfumeInfo?.perfumeTitle}</Typography.Title>
                </Col>
            </Row>
        </Modal>
    );
};

export default DeleteModal;
