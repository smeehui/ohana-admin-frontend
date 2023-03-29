import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../NewUser.module.scss";
import userDefaultImg from "~/assets/img/default-user.png";

import {
    Col,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Image,
    Row,
} from "react-bootstrap";
import clsx from "clsx";

function NewUserForm() {
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
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
            console.log(formData);
        },
    });
    let fullNameError = !!(formik.touched.fullName && formik.errors.fullName);
    let emailError = !!(formik.touched.email && formik.errors.email);
    let phoneError = !!(formik.touched.phone && formik.errors.phone);
    let addressError = !!(formik.touched.address && formik.errors.address);

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
        <h1>UserForm</h1>
    );
}

export default NewUserForm;
