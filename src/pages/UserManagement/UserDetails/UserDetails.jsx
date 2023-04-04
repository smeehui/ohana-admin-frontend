import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "~/components/Header";
import Form from "react-bootstrap/Form";
import ManageUser from "../ListUser/ManageUser";
import { columns } from "../ListUser/userTBFormat";


function UserDetails() {
    
  return (
    <div className="ps-4">
    <div className="text-center">
      <Header title="User Details" subtitle="User Profile Infomation" />
    </div>

      <Form>
            <div className="row col-12">
                <Form.Group className="mb-3 col-4" controlId="exampleForm.ControlInput1">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control type="readonly" placeholder="Họ tên" readOnly={true} value= "aa"/>
                </Form.Group>

                <Form.Group className="mb-3 col-4" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" readOnly={true} />
                </Form.Group>

                <Form.Group className="mb-3 col-4" controlId="exampleForm.ControlInput1">
                <Form.Label>Số ĐT</Form.Label>
                <Form.Control type="phone" placeholder="Số ĐT" readOnly={true} />
                </Form.Group>
            </div>

            <div className="row col-12">
                <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control as="textarea" rows={3} readOnly={true} />
                </Form.Group>

                <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control as="textarea" rows={3} readOnly={true} />
                </Form.Group>
            </div>



            <div className="row col-12">
                <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" placeholder="Role" readOnly={true} />
                </Form.Group>

                <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Control type="text" placeholder="Trạng thái" readOnly={true} />
                </Form.Group>
            </div>
    
        
      </Form>
    </div>
  );
}

export default UserDetails;
