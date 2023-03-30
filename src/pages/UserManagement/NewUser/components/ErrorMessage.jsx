import React from "react";
import { FormText } from "react-bootstrap";

function ErrorMessage({message,className}) {
    return (
        <FormText className={"text-danger border-danger fw-bold "+ className}>
            {message}
        </FormText>
    );
}

export default ErrorMessage;
