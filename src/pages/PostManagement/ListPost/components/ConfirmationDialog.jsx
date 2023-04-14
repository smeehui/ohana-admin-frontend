import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {Chip, Fade, Grid} from "@mui/material";
import {PostStatus} from "~/pages/PostManagement/ListPost/constants/PostStatus";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade easing={"enter"} ref={ref} {...props} />;
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
                            type === PostStatus.REFUSED
                                ? "thu hồi"
                                : "đăng"
                        } bài viết:`}
                    </h4>

                    <Grid container direction={"row"} wrap={"wrap"} spacing={1}>
                        {data.map((item) => (
                            <Grid key={item.id} item>
                                <Chip
                                    sx={{fontSize: 14}}
                                    key={item.id}
                                    variant="outlined"
                                    label={item.title}
                                    color={
                                        type === PostStatus.REFUSED ? "error" : "success"
                                    }
                                ></Chip>
                            </Grid>
                        ))}
                    </Grid>
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
