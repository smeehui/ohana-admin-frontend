import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import {Stack} from "@mui/system";
import {Chip} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog({ action, onClose, onAgree }) {
    const { isShow, type, data } = action;
    return (
        <div>
            <Dialog
                open={isShow}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <h4>
                        {`Bạn có chắc chắn muốn ${
                            type === "deactivate"
                                ? "huỷ kích hoạt"
                                : "kích hoạt"
                        }:`}
                    </h4>

                    <Stack direction="row" spacing={1}>
                        {data.map((item) => (
                            <Chip
                                key={item.id}
                                variant="outlined"
                                label={item.fullName}
                                color={
                                    type === "deactivate" ? "error" : "success"
                                }
                            ></Chip>
                        ))}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => onClose()}
                    >
                        Huỷ
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onAgree()}
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
