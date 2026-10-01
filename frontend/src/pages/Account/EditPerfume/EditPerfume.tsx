import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";

import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import FormInput from "../../../components/FormInput/FormInput";
import { selectPerfume } from "../../../redux-toolkit/perfume/perfume-selector";
import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsPerfumeEdited
} from "../../../redux-toolkit/admin/admin-selector";
import { LoadingStatus } from "../../../types/types";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { fetchPerfume } from "../../../redux-toolkit/perfume/perfume-thunks";
import IconButton from "../../../components/IconButton/IconButton";
import EditPerfumeSelect from "./EditPerfumeSelect";
import { updatePerfume } from "../../../redux-toolkit/admin/admin-thunks";
import "./EditPerfume.css";
import { getImageUrl } from "../../../utils/image-url";

type EditPerfumeData = {
    perfumeTitle: string;
    perfumer: string;
    year: string;
    country: string;
    type: string;
    volume: string;
    perfumeGender: string;
    fragranceTopNotes: string;
    fragranceMiddleNotes: string;
    fragranceBaseNotes: string;
    price: string;
};

const EditPerfume: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const params = useParams<{ id: string }>();
    const perfumeData = useSelector(selectPerfume);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const isPerfumeEdited = useSelector(selectIsPerfumeEdited);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));
        dispatch(fetchPerfume(params.id));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, [dispatch, params.id]);
    
    useEffect(() => {
        if (perfumeData) {
            form.setFieldsValue(perfumeData);
        }
    }, [perfumeData, form])

    useEffect(() => {
        if (isPerfumeEdited) {
            window.scrollTo(0, 0);
            notification.success({
                message: t("form.perfumeUpdated"),
                description: t("form.perfumeUpdatedDescription")
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isPerfumeEdited, dispatch]);

    const onFormSubmit = (data: EditPerfumeData): void => {
        const bodyFormData: FormData = new FormData();
        // @ts-ignore
        bodyFormData.append("file", { file });
        bodyFormData.append(
            "perfume",
            new Blob([JSON.stringify({ ...data, id: perfumeData?.id })], { type: "application/json" })
        );

        dispatch(updatePerfume(bodyFormData));
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <div>
            <ContentTitle title={t("account.editPerfume")} titleLevel={4} icon={<EditOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={[32, 16]}>
                    <Col xs={24} md={12}>
                        <FormInput
                            title={t("form.perfumeTitle")}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"perfumeTitle"}
                            error={errors.perfumeTitleError}
                            disabled={isLoading}
                            placeholder={t("form.perfumeTitle")}
                        />
                        <FormInput
                            title={t("form.brand")}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"perfumer"}
                            error={errors.perfumerError}
                            disabled={isLoading}
                            placeholder={t("form.brand")}
                        />
                        <FormInput
                            title={t("form.releaseYear")}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"year"}
                            error={errors.yearError}
                            disabled={isLoading}
                            placeholder={t("form.releaseYear")}
                        />
                        <FormInput
                            title={t("form.manufacturerCountry")}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"country"}
                            error={errors.countryError}
                            disabled={isLoading}
                            placeholder={t("form.manufacturerCountry")}
                        />
                        <EditPerfumeSelect
                            title={t("form.perfumeType")}
                            name={"type"}
                            placeholder={t("form.perfumeType")}
                            error={errors.typeError}
                            disabled={isLoading}
                            values={["Eau de Parfum", "Eau de Toilette"]}
                        />
                        <EditPerfumeSelect
                            title={t("form.gender")}
                            name={"perfumeGender"}
                            placeholder={t("form.gender")}
                            disabled={isLoading}
                            values={["male", "female"]}
                        />
                        <FormInput
                            title={t("form.volume")}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"volume"}
                            error={errors.volumeError}
                            disabled={isLoading}
                            placeholder={t("form.volume")}
                        />
                        <FormInput
                            title={t("form.topNotes")}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"fragranceTopNotes"}
                            error={errors.fragranceTopNotesError}
                            disabled={isLoading}
                            placeholder={t("form.topNotes")}
                        />
                        <FormInput
                            title={t("form.heartNotes")}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"fragranceMiddleNotes"}
                            error={errors.fragranceMiddleNotesError}
                            disabled={isLoading}
                            placeholder={t("form.heartNotes")}
                        />
                        <FormInput
                            title={t("form.baseNotes")}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"fragranceBaseNotes"}
                            error={errors.fragranceBaseNotesError}
                            disabled={isLoading}
                            placeholder={t("form.baseNotes")}
                        />
                        <FormInput
                            title={t("form.price")}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"price"}
                            error={errors.priceError}
                            disabled={isLoading}
                            placeholder={t("form.price")}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Upload name={"file"} accept={"image/jpeg,image/png,image/gif,image/webp"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>{t("form.clickToUpload")}</Button>
                        </Upload>
                        <div className={"edit-perfume-image-wrapper"}>
                            <img
                                className={"edit-perfume-image"}
                                src={getImageUrl(perfumeData.filename)}
                                alt={perfumeData.perfumeTitle}
                            />
                        </div>
                    </Col>
                </Row>
                <IconButton title={t("common.edit")} icon={<EditOutlined />} disabled={isLoading} />
            </Form>
        </div>
    );
};

export default EditPerfume;
