import React from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearError, fetchLogin } from '../../stores/authSlice'

const AuthorizationForm = () => {
  const dispatch = useDispatch()
  dispatch(clearError())
  const errors = useSelector((state) => state.auth.errors)

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    dispatch(fetchLogin(values))
  }
  return (
    <Row className="form">
      <Col>
        <Form className="form__wrapper" onFinish={onFinish}>
          <Row className="form__header">Sign In</Row>
          <Row className="form__body">
            Email address
            <Form.Item
              className="form__item"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
              validateStatus={errors ? 'error' : ''}
              help={errors ? 'Incorrect login or password' : ''}
            >
              <Input placeholder="Email address" />
            </Form.Item>
            Password
            <Form.Item
              className="form__item"
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Row>
          <Button type="primary" htmlType="submit" className="form__button">
            Log in
          </Button>
          <Row className="form__footer">
            Don’t have an account?<Link to="/sign-up">&nbsp;Sign Up.</Link>
            <span></span>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default AuthorizationForm
