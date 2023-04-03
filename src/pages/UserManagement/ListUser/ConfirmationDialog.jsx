import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { updateStatusAll } from "../service/userService";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog({ action, onClose }) {
    const { isShow, type, data } = action;
    const handleAgree = async () => {
        try {
            let result = updateStatusAll(
                data.map((item) => item.id),
                type,
            );
            data.forEach((element) => {
                toast.success(
                    `${
                        type === "deactivated" ? "Huỷ kích hoạt" : "Kích hoạt"
                    } tài khoản ${element.fullName} thành công`,
                );
            });
        } catch (error) {
            console.log(error);
        } finally {
            onClose();
        }
    };
    return (
        <div>
            <Dialog
                open={isShow}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <h4>
                        {`Bạn có chắc chắn muốn ${
                            type === "deactivated"
                                ? "huỷ kích hoạt"
                                : "kích hoạt"
                        }:`}
                    </h4>

                    {data.map((item) => (
                        <DialogContentText
                            id="alert-dialog-slide-description"
                            key={item.id}
                        >
                            {item.fullName}
                        </DialogContentText>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Disagree</Button>
                    <Button onClick={handleAgree}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
