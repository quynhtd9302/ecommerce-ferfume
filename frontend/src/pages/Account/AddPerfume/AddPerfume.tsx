import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { PlusSquareFilled, PlusSquareOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";

import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsPerfumeAdded
} from "../../../redux-toolkit/admin/admin-selector";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { LoadingStatus } from "../../../types/types";
import { addPerfume } from "../../../redux-toolkit/admin/admin-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AddFormInput from "./AddFormInput";
import AddFormSelect from "./AddFormSelect";
import IconButton from "../../../components/IconButton/IconButton";

type AddPerfumeData = {
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

const AddPerfume: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isPerfumeAdded = useSelector(selectIsPerfumeAdded);
    const ispPerfumeLoading = useSelector(selectIsAdminStateLoading);
    const perfumeErrors = useSelector(selectAdminStateErrors);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, [dispatch]);

    useEffect(() => {
        if (isPerfumeAdded) {
            window.scrollTo(0, 0);
            notification.success({
                message: t("form.perfumeAdded"),
                description: t("form.perfumeAddedDescription")
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isPerfumeAdded, dispatch]);

    const onFormSubmit = (data: AddPerfumeData): void => {
        const bodyFormData: FormData = new FormData();
        // @ts-ignore
        bodyFormData.append("file", { file });
        bodyFormData.append(
            "perfume",
            new Blob([JSON.stringify({ ...data, perfumeRating: 0 })], { type: "application/json" })
        );

        dispatch(addPerfume(bodyFormData));
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <>
            <ContentTitle title={t("account.addPerfume")} titleLevel={4} icon={<PlusSquareOutlined />} />
            <Form onFinish={onFormSubmit}>
                <Row gutter={[32, 16]}>
                    <Col xs={24} md={12}>
                        <AddFormInput
                            title={t("form.perfumeTitle")}
                            name={"perfumeTitle"}
                            error={perfumeErrors.perfumeTitleError}
                            placeholder={t("form.perfumeTitlePlaceholder")}
                            disabled={ispPerfumeLoading}
                        />
                        <AddFormInput
                            title={t("form.releaseYear")}
                            name={"year"}
                            error={perfumeErrors.yearError}
                            placeholder={t("form.releaseYearPlaceholder")}
                            disabled={ispPerfumeLoading}
                        />
                        <AddFormSelect
                            title={t("form.perfumeType")}
                            name={"type"}
                            error={perfumeErrors.typeError}
                            placeholder={"Eau de Parfum"}
                            disabled={ispPerfumeLoading}
                            values={["Eau de Parfum", "Eau de Toilette"]}
                        />
                        <AddFormSelect
                            title={t("form.gender")}
                            name={"perfumeGender"}
                            error={perfumeErrors.perfumeGenderError}
                            placeholder={"male"}
                            disabled={ispPerfumeLoading}
                            values={["male", "female"]}
                        />
                        <AddFormInput
                            title={t("form.heartNotes")}
                            name={"fragranceMiddleNotes"}
                            error={perfumeErrors.fragranceMiddleNotesError}
                            placeholder={t("form.heartNotesPlaceholder")}
                            disabled={ispPerfumeLoading}
                        />
                        <AddFormInput
                            title={t("form.price")}
                            name={"price"}
                            error={perfumeErrors.priceError}
                            placeholder={t("form.pricePlaceholder")}
                            disabled={ispPerfumeLoading}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <AddFormInput
                            title={t("form.brand")}
                            name={"perfumer"}
                            error={perfumeErrors.perfumerError}
                            placeholder={t("form.brandPlaceholder")}
                            disabled={ispPerfumeLoading}
                        />
                        <AddFormInput
                            title={t("form.manufacturerCountry")}
                            name={"country"}
                            error={perfumeErrors.countryError}
                            placeholder={t("form.manufacturerCountryPlaceholder")}
                            disabled={ispPerfumeLoading}
                        />
                        <AddFormInput
                            title={t("form.volume")}
                            name={"volume"}
                            error={perfumeErrors.volumeError}
                            placeholder={t("form.volumePlaceholder")}
                            disabled={ispPerfumeLoading}
                        />
                        <AddFormInput
                            title={t("form.topNotes")}
                            name={"fragranceTopNotes"}
                            error={perfumeErrors.fragranceTopNotesError}
                            placeholder={t("form.topNotesPlaceholder")}
                            disabled={ispPerfumeLoading}
                        />
                        <AddFormInput
                            title={t("form.baseNotes")}
                            name={"fragranceBaseNotes"}
                            error={perfumeErrors.fragranceBaseNotesError}
                            placeholder={t("form.baseNotesPlaceholder")}
                            disabled={ispPerfumeLoading}
                        />
                        <Upload name={"file"} accept={"image/jpeg,image/png,image/gif,image/webp"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} style={{ marginTop: 22 }}>
                                {t("form.clickToUpload")}
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <IconButton title={t("form.add")} icon={<PlusSquareFilled />} />
            </Form>
        </>
    );
};

export default AddPerfume;
