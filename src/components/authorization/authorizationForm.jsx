import React, { useEffect } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearError, fetchLogin } from '../../stores/authSlice'

const AuthorizationForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { errors } = useSelector((state) => state.auth)
  const redirectPath = location.state?.path || '/'

  const onFinish = async (values) => {
    const result = await dispatch(fetchLogin(values))
    if (result.meta.requestStatus === 'fulfilled') navigate(redirectPath)
  }

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  return (
    <Row className="form">
      <Col>
        <Form className="form__wrapper" onFinish={onFinish} method="post" action="/sign-in">
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
              help={errors ? `${Object.keys(errors)[0]}: ${errors[Object.keys(errors)[0]]}` : ''}
            >
              <Input placeholder="Email address" name="email" />
            </Form.Item>
            Password
            <Form.Item
              className="form__item"
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password placeholder="Password" name="password" />
            </Form.Item>
          </Row>
          <Button type="primary" htmlType="submit" className="form__button" block>
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
