import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { updateStatusAll } from "../../../service/userService";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog({ action, onClose, onAgree }) {
    const { isShow, type, data } = action;
    console.log(type);
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
                            type === "deactivate"
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
                    <Button onClick={() => onClose()}>Disagree</Button>
                    <Button onClick={() => onAgree()}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
