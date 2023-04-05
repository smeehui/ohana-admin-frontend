import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "~/components/Header";
import Form from "react-bootstrap/Form";
import { findById } from "~/service/userService";
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import axios from "axios";
import { USER_DETAILS } from "~/service/api";
import user from "~/assets/img/default-user.png";
import { Row } from "react-bootstrap";



const UserDetails = () => {

  const { id } = useParams();

  const [state, setState] = useState({
    user: {}
  })

  useEffect(() => {
    (async () => {
      try {
        
        let result = await findById(id);

        setState({...state,
          user: result.data
        })

        } catch {
            toast.error("Lấy dữ liệu thất bại!");
        }
        
    })();
  }, []);
  
  console.log(state);

  return (
    <div className="ps-5">
    <div>
      <Header title="User Details" subtitle="User Profile Infomation" />
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
              {/* <div className="d-flex justify-content-center">Avatar</div> */}
              <img className="w-75 d-flex justify-content-center img-thumbnail rounded-circle" src={user} alt="" />
              
            </div>

        </div>
      </Form>
    </div>
  );
}

export default UserDetails;
