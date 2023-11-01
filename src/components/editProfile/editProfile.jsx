import { Button, Col, Form, Input, Row, Spin } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchEditProfile } from '../../stores/authSlice'

const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const state = useSelector((state) => state.auth)
  const { errors, user } = state
  console.log(user, 'EditProfile/user')
  const onFinish = async (values) => {
    const result = await dispatch(fetchEditProfile(values))
    if (result.meta.requestStatus === 'fulfilled') navigate(-1)
  }
  if (!user) {
    return (
      <Row className="form">
        <Spin size="large" />
      </Row>
    )
  }
  return (
    <Row className="form">
      <Col>
        <Form
          className="form__wrapper"
          onFinish={onFinish}
          initialValues={{
            username: user?.username || '',
            email: user?.email || '',
            image: user?.image || '',
          }}
        >
          <Row className="form__header">Edit Profile</Row>
          <Row className="form__body">
            <Col className="form__element">
              Username
              <Form.Item
                className="form__item"
                name="username"
                rules={[
                  {
                    type: 'string',
                    required: false,
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
                <Input placeholder="Username" />
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
                    required: false,
                  },
                ]}
                validateStatus={errors?.email ? 'error' : ''}
                help={errors?.email ? 'That email is already taken!' : ''}
              >
                <Input placeholder="Email address" />
              </Form.Item>
            </Col>
            <Col className="form__element">
              New password
              <Form.Item
                className="form__item"
                name="password"
                rules={[
                  { required: false },
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
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
            <Col className="form__element">
              Avatar image (url)
              <Form.Item
                className="form__item"
                name="image"
                rules={[{ required: false }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
              >
                <Input placeholder="input placeholder" />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" className="form__button">
            Save
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default EditProfile
