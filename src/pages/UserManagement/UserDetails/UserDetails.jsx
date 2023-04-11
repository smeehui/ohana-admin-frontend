import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import Header from "~/components/Header";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import { USER_DETAILS } from "~/service/api";
import user from "~/assets/img/Avatar-Profile-Vector.png";
import { Row } from "react-bootstrap";
import { postService, userService } from "~/service";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import CldImage from "~/components/CldImage";
import Table from "react-bootstrap/Table";
import { DataGrid } from "@mui/x-data-grid";
import dateTimeFormatter from "~/utils/dateTimeFormatter";
import { background } from "@cloudinary/url-gen/qualifiers/focusOn";
import { tokens } from "~/theme";
import { columns } from "./userDetailTBFormat";

const UserDetails = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const { id } = useParams();

  const { formatter } = dateTimeFormatter();

  const [state, setState] = useState({
    user: {},
    content: [],
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      setState({ ...state, isLoading: true });
      try {
        let result = await userService.findById(id);

        let listPosts = await postService.findAllByUserId(id, result);

        console.log(listPosts);

        setState({
          ...state,
          user: result,
          content: listPosts.content,
          isLoading: false,
        });
      } catch (error) {
        toast.error("Lấy dữ liệu thất bại!");
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {state.isLoading ? (
        <Box
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress color="success" size={80} />
        </Box>
      ) : (
        <>
          <div className="ps-5">
            <div>
              <Header
                title="Thông tin khách hàng"
                subtitle="User Profile Infomation"
              />
            </div>
            <Form>
              <div className="row col-12">
                <div className="col-8">
                  <div className="row col-12">
                    <Form.Group className="mb-3 col-4">
                      <Form.Label>Họ tên</Form.Label>
                      <Form.Control
                        type="readonly"
                        placeholder="Họ tên"
                        readOnly={true}
                        value={state.user.fullName}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 col-4">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        readOnly={true}
                        value={state.user.email}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 col-4">
                      <Form.Label>Số ĐT</Form.Label>
                      <Form.Control
                        type="phone"
                        placeholder="Số ĐT"
                        readOnly={true}
                        value={state.user.phone}
                      />
                    </Form.Group>
                  </div>

                  <div className="row col-12">
                    <Form.Group className="mb-3 col-6">
                      <Form.Label>Mô tả</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        readOnly={true}
                        value={state.user.description}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 col-6">
                      <Form.Label>Địa chỉ</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        readOnly={true}
                        value={state.user.address}
                      />
                    </Form.Group>
                  </div>

                  <div className="row col-12">
                    <Form.Group className="mb-3 col-6">
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Role"
                        readOnly={true}
                        value={state.user.role}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 col-6">
                      <Form.Label>Trạng thái</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Trạng thái"
                        readOnly={true}
                        value={state.user.status}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="col-4">
                  {state.user.thumbnailId ? (
                    <CldImage
                      id={state.user.thumbnailId}
                      w={275}
                      h={275}
                      r={50}
                    />
                  ) : (
                    <img
                      className="w-75 d-flex justify-content-center img-thumbnail rounded-circle"
                      src={user}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </Form>

           
          </div>

          <Box m="20px" display={"flex"} flexDirection={"column"}>
              <Header title="Danh mục phòng" />
              <Box
                flex={"1"}
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                }}
              >
                <DataGrid columns={columns} autoHeight rows={state.content} />
              </Box>
            </Box>

          {/* <Table
            className="ms-5 me-2 mt-4"
            bordered
            hover
            style={{ width: 1200, height: 200 }}
          >
            <thead style={{ backgroundColor: "rgba(32, 241, 139, 0.8)" }}>
              <tr>
                <th className="text-center">#</th>
                <th>BÀI VIẾT</th>
                <th className="text-center">ẢNH BÌA</th>
                <th>PHƯỜNG/QUẬN</th>
                <th>ĐỊA CHỈ</th>
                <th>NGÀY ĐĂNG</th>
                <th>DANH MỤC</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "rgba(255, 255, 255, 100)" }}>
              {state.content.map((post) => (
                <tr>
                  <td className="text-center">{post.id}</td>
                  <td>{post.title}</td>
                  <td className="text-center">
                    {<CldImage id={post.thumbnailId} w={100} h={50} />}
                  </td>
                  <td>{post.location.districtName}</td>
                  <td>{post.location.line1}</td>
                  <td>{formatter(post.createdAt)}</td>
                  <td>{post.category.title}</td>
                  <td>{post.status}</td>
                </tr>
              ))}
            </tbody>
          </Table> */}
        </>
      )}
    </>
  );
};

export default UserDetails;
