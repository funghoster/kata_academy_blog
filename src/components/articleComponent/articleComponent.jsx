import { Button, Col, Form, Input, Row, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { fetchCreateArticle } from '../../stores/authSlice'

const ArticleComponent = ({ article = {} }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const [load, setLoad] = useState(false)
  const hasParams = params.slug || false
  console.log(article)

  console.log('params for edit article', params, 'has params', hasParams)

  const onFinish = async (article) => {
    setLoad(true)
    const result = await dispatch(fetchCreateArticle({ article, params }))
    if (result) setLoad(false)
    if (result.meta.requestStatus === 'fulfilled') navigate(hasParams ? `/articles/${hasParams}` : '/')
  }

  return (
    <Row className="form__article">
      <Form
        className="form__wrapper"
        onFinish={onFinish}
        name="sign-up"
        initialValues={{
          title: article?.title || '',
          description: article?.description || '',
          body: article?.body || '',
          tagList: article?.tagList || [],
        }}
      >
        <Row className="form__header">{hasParams ? 'Edit article' : 'Create new article'}</Row>
        <Row className="form__body form__body--article">
          <Col className="form__element">
            Title
            <Form.Item
              className="form__item"
              name="title"
              rules={[
                {
                  type: 'string',
                  required: true,
                  message: 'Please input title article!',
                },
              ]}
            >
              <Input placeholder="Title" name="title" />
            </Form.Item>
          </Col>
          <Col className="form__element">
            Short description
            <Form.Item
              className="form__item"
              name="description"
              rules={[
                {
                  type: 'string',
                  message: 'The input is not valid short description!',
                },
                {
                  required: true,
                  message: 'Please input short description!',
                },
              ]}
            >
              <Input placeholder="Short description" name="description" />
            </Form.Item>
          </Col>
          <Col className="form__element">
            Text
            <Form.Item className="form__item" name="body" rules={[{ required: true, message: 'Please input text!' }]}>
              <TextArea placeholder="Text" autoSize={{ minRows: 8 }} />
            </Form.Item>
          </Col>
          <Col className="form__element">
            Tags
            <div className="form__tags">
              <Form.List name="tagList">
                {(fields, { add, remove }) => (
                  <>
                    <div className="form__tags-container">
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} className="form__tag-space" align="baseline">
                          <Form.Item
                            className="form__item"
                            {...restField}
                            name={[name]}
                            rules={[{ required: true, message: 'Missing tag' }]}
                          >
                            <Input placeholder="Tag" />
                          </Form.Item>
                          {load ? (
                            <Button type="primary" danger block loading>
                              Loading
                            </Button>
                          ) : (
                            <Button danger onClick={() => remove(name)} block>
                              Delete
                            </Button>
                          )}
                        </Space>
                      ))}
                    </div>
                    <Form.Item className="form__item form__tag-add">
                      {load ? (
                        <Button type="primary" ghost block loading>
                          Loading
                        </Button>
                      ) : (
                        <Button type="primary" ghost onClick={() => add()} block>
                          Add tag
                        </Button>
                      )}
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </Col>
        </Row>
        {load ? (
          <Button type="primary" className="form__button form__button--small" loading>
            Loading
          </Button>
        ) : (
          <Button type="primary" htmlType="submit" className="form__button form__button--small">
            Send
          </Button>
        )}
      </Form>
    </Row>
  )
}

export default ArticleComponent
