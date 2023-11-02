import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { clearError, fetchRegistration } from '../../stores/authSlice'

const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { errors } = useSelector((state) => state.auth)
  const redirectPath = location.state?.path || '/'

  const onFinish = async (values) => {
    const result = await dispatch(fetchRegistration(values))
    if (result.meta.requestStatus === 'fulfilled') navigate(redirectPath)
  }

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  return (
    <Row className="form">
      <Col>
        <Form className="form__wrapper" onFinish={onFinish} name="sign-up">
          <Row className="form__header">Create new account</Row>
          <Row className="form__body">
            <Col className="form__element">
              Username
              <Form.Item
                className="form__item"
                name="username"
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true,
                  },
                  {
                    min: 3,
                    message: 'Minimum number of characters: 3',
                  },
                  {
                    max: 20,
                    message: 'Maximum number of characters: 20',
                  },
                ]}
                validateStatus={errors?.username ? 'error' : ''}
                help={errors?.username ? 'That username is already taken!' : ''}
              >
                <Input placeholder="Username" name="username" />
              </Form.Item>
            </Col>
            <Col className="form__element">
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
                validateStatus={errors?.email ? 'error' : ''}
                help={errors?.email ? 'That email is already taken!' : ''}
              >
                <Input placeholder="Email address" name="email" />
              </Form.Item>
            </Col>
            <Col className="form__element">
              Password
              <Form.Item
                className="form__item"
                name="password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                  {
                    min: 6,
                    message: 'Minimum number of characters: 6',
                  },
                  {
                    max: 40,
                    message: 'Maximum number of characters: 40',
                  },
                ]}
              >
                <Input.Password placeholder="Password" name="password" />
              </Form.Item>
            </Col>
            <Col className="form__element">
              Repeat Password
              <Form.Item
                className="form__item"
                name="confirm"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'))
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Password" name="confirm" />
              </Form.Item>
            </Col>
            <Col className="form__element">
              <Form.Item
                className="form__item"
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                  },
                ]}
              >
                <label className="form__checkbox">
                  <Checkbox></Checkbox>
                  <p>I agree to the processing of my personal information</p>
                </label>
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" className="form__button" block>
            Create
          </Button>
          <Row className="form__footer">
            <span>
              Already have an account?<Link to="sign-in">&nbsp;Sign In.</Link>
            </span>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default Registration
