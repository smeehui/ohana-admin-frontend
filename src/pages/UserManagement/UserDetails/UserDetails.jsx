import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "~/components/Header";
import Form from "react-bootstrap/Form";
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import axios from "axios";
import { USER_DETAILS } from "~/service/api";
import user from "~/assets/img/Avatar-Profile-Vector.png";
import { Row } from "react-bootstrap";
import {postService, userService} from "~/service";
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import CldImage from "~/components/CldImage";
import Table from 'react-bootstrap/Table';
import {DataGrid} from "@mui/x-data-grid";
import dateTimeFormatter from "~/utils/dateTimeFormatter";
import { background } from "@cloudinary/url-gen/qualifiers/focusOn";


const UserDetails = () => {

  const { id } = useParams();

  const {formatter} = dateTimeFormatter();

  const [state, setState] = useState({
    user: {},
    content: []
  })

  useEffect(() => {
    (async () => {
      try {
        
        let result = await userService.findById(id);

        let listPosts = await postService.findAllByUserId(id, result);
        
        console.log(listPosts);

        setState({...state,
          user: result,
          content: listPosts.content
        })

        } catch (
          error
        ){
            toast.error("Lấy dữ liệu thất bại!");
            console.log(error);
        }
        
    })();
  }, []);


  return (
    <>
    <div className="ps-5">
    <div>
      <Header title="Thông tin khách hàng" subtitle="User Profile Infomation" />
    </div>
      <Form>
        <div className="row col-12">
        <div className="col-8">
            <div className="row col-12">
                <Form.Group className="mb-3 col-4">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control type="readonly" placeholder="Họ tên" readOnly={true} value= {state.user.fullName}/>
                </Form.Group>

                <Form.Group className="mb-3 col-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" readOnly={true} value= {state.user.email}/>
                </Form.Group>

                <Form.Group className="mb-3 col-4">
                <Form.Label>Số ĐT</Form.Label>
                <Form.Control type="phone" placeholder="Số ĐT" readOnly={true} value= {state.user.phone}/>
                </Form.Group>
            </div>

            <div className="row col-12">
                <Form.Group className="mb-3 col-6">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control as="textarea" rows={3} readOnly={true} value= {state.user.description}/>
                </Form.Group>

                <Form.Group className="mb-3 col-6">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control as="textarea" rows={3} readOnly={true} value= {state.user.address}/>
                </Form.Group>
            </div>

            <div className="row col-12">
                <Form.Group className="mb-3 col-6">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" placeholder="Role" readOnly={true} value= {state.user.role}/>
                </Form.Group>

                <Form.Group className="mb-3 col-6">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Control type="text" placeholder="Trạng thái" readOnly={true} value= {state.user.status}/>
                </Form.Group>
            </div>
        </div>

            <div className="col-4">
              <div>
                { state.user.thumbnailId ?
                  <CldImage id={state.user.thumbnailId} w={275} h={275} r={210} /> : 
                  <img className="w-75 d-flex justify-content-center img-thumbnail rounded-circle" src={user} alt="" />}
              </div>
            </div>

        </div>
      </Form>
    </div>

    <Table className="ms-5 me-2 mt-4" bordered hover style={{width: 1200, height: 200}}>
      <thead style={{backgroundColor: "rgba(32, 241, 139, 0.8)"}}>
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
      <tbody style={{backgroundColor: "rgba(255, 255, 255, 100)"}}>
        {
          state.content.map(
            post => (<tr>
              <td className="text-center">{post.id}</td>
              <td>{post.title}</td>
              <td className="text-center p-0">{<CldImage id={post.thumbnailId} w={100} h={50} />}</td>
              <td>{post.location.districtName}</td>
              <td>{post.location.line1}</td>
              <td>{formatter(post.createdAt)}</td>
              <td>{post.category.title}</td>
              <td>{post.status}</td>
            </tr>)
          )
        }
       
      </tbody>
    </Table>

    </>
  )
}

export default UserDetails;
