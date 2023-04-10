import { Cancel, Delete, Edit } from "@mui/icons-material";
import { Backdrop, Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useSpring, animated } from "@react-spring/web";
import React from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";

function ActionButton({ row }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Fade = React.forwardRef(function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null, true);
        }
      },
    });

    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  });

  Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Stack spacing={1} direction="row">
      <Button
        onClick={handleOpen}
        size="small"
        variant="contained"
        color="warning"
      >
        <Edit /> Chỉnh sửa
      </Button>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Button
              onClick=""
              size="small"
              variant="contained"
              color="info"
            >
              <Edit /> Chỉnh sửa
            </Button>

            <Button
              onClick=""
              size="small"
              variant="contained"
              color="error"
            >
              <Cancel /> Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Button
        onClick={handleOpen}
        size="small"
        variant="contained"
        color="error"
      >
        <Delete /> Xóa
      </Button>
    </Stack>
  );
}

const columns = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "title",
    headerName: "Danh mục",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: ({ row }) => <ActionButton row={row} key={row.title} />,
  },
];

export { columns };
