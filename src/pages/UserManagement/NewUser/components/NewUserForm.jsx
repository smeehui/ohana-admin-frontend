import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../NewUser.module.scss";
import userDefaultImg from "~/assets/img/default-user.png";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "~/components/Header";

import {
    Col,
    Container,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Image,
    Row,
} from "react-bootstrap";
import clsx from "clsx";
import ErrorMessage from "./ErrorMessage";
import {
    Add,
    PlusOneOutlined,
    PlusOneTwoTone,
    Restore,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { tokens } from "~/theme";

function NewUserForm() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            addresss: "",
            file: null,
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .min(4, "Must be 4 characters or less")
                .required("Required"),
            email: Yup.string()
                .matches(
                    /^[A-Z0-9._]+@[A-Z0-9.-]{2,}\.[A-Z]{2,4}$/i,
                    "Invalid email address",
                )
                .required("Required"),
            phone: Yup.string().required("Phone is required"),
            address: Yup.string().required("Address is required"),
        }),
        onSubmit: (values) => {
            const { fullName, email, phone, address } = values;
            let formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("file", imgRef.current.files[0]);
            console.log(Object.fromEntries(formData));
        },
    });
    let fullNameError = !!(formik.touched.fullName && formik.errors.fullName);
    let emailError = !!(formik.touched.email && formik.errors.email);
    let phoneError = !!(formik.touched.phone && formik.errors.phone);
    let addressError = !!(formik.touched.address && formik.errors.address);
    const inputStyle = (field) =>
        clsx(
            field && "border-danger",
            "border border-2",
            "border-" + theme.palette.mode === "dark" ? "light" : "dark",
            theme.palette.mode === "dark"
                ? "bg-secondary text-white"
                : "bg-light text-dark",
        );

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const imgRef = useRef();

    const [imgSrc, setImgSrc] = useState(userDefaultImg);

    const handleUploadImg = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const src = URL.createObjectURL(file);
            setImgSrc(src);
        };
    };

    return (
        <Form
            onSubmit={formik.handleSubmit}
            style={{ backgroundColor: colors.grey[800] }}
            className={clsx(styles.form)}
        >
            <Row className="mb-3">
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <FormLabel
                            className="h6 fw-bolder"
                            htmlFor="fullNameCre"
                        >
                            Tên đầy đủ
                        </FormLabel>
                        <FormControl
                            name="fullName"
                            type="text"
                            id="fullNameCre"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                            className={inputStyle(fullNameError)}
                        />
                        {fullNameError ? (
                            <ErrorMessage message={formik.errors.fullName} />
                        ) : (
                            <ErrorMessage className="invisible" message="|" />
                        )}
                    </FormGroup>
                    <FormGroup>
                        <FormLabel className="h6 fw-bolder" htmlFor="emailCre">
                            Email
                        </FormLabel>
                        <FormControl
                            autoComplete="email"
                            type="email"
                            id="emailCre"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={inputStyle(emailError)}
                        />
                        {emailError ? (
                            <ErrorMessage message={formik.errors.email} />
                        ) : (
                            <ErrorMessage className="invisible" message={"|"} />
                        )}
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <FormLabel className="h6 fw-bolder" htmlFor="phoneCre">
                            Số điện thoại
                        </FormLabel>
                        <FormControl
                            name="phone"
                            type="text"
                            id="phoneCre"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            className={inputStyle(phoneError)}
                        />
                        {phoneError ? (
                            <ErrorMessage message={formik.errors.phone} />
                        ) : (
                            <ErrorMessage className="invisible" message={"|"} />
                        )}
                    </FormGroup>
                    <FormGroup>
                        <FormLabel
                            className="h6 fw-bolder"
                            htmlFor="addressCre"
                        >
                            Địa chỉ
                        </FormLabel>
                        <FormControl
                            type="text"
                            id="addressCre"
                            name="address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                            className={inputStyle(addressError)}
                        />
                        {addressError ? (
                            <ErrorMessage message={formik.errors.address} />
                        ) : (
                            <ErrorMessage className="invisible" message={"|"} />
                        )}
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup className="text-white position-relative h-100 d-flex justify-content-center">
                        <FormLabel
                            className={clsx(styles["select-text"])}
                            htmlFor="fileCre"
                        ></FormLabel>
                        <FormControl
                            ref={imgRef}
                            id="fileCre"
                            type="file"
                            multiple
                            accept="image/*"
                            hidden
                            name="file"
                        />
                        <Image
                            id="imgPreviewCre"
                            className={clsx(
                                styles["img-preview"],
                                "container-fluid",
                            )}
                            src={imgSrc}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={6} sm={12}>
                    {/* <ButtonCustom
                    type="submit"
                    title={"Create"}
                    icon={<FontAwesomeIcon icon={faPlusCircle} />}
                    variant="success"
                    className="text-success"
                /> */}
                    <div className="d-flex justify-content-between">
                        <Button
                            type="submit"
                            endIcon={<Add />}
                            color="success"
                            variant="contained"
                        >
                            Tạo mới
                        </Button>
                        <Button
                            type="reset"
                            endIcon={<Restore />}
                            variant="contained"
                            color="warning"
                            onClick={formik.resetForm}
                        >
                            Nhập lại
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}

export default NewUserForm;
