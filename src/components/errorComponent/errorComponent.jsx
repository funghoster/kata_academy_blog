import { Empty, Row, Typography } from 'antd'
import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const { Title } = Typography

const ErrorComponent = () => {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <Row justify={'center'} align={'middle'} className="error">
        <Empty className="error__item" description={<Title level={2}>Page not found</Title>} />
      </Row>
    )
  }
  return (
    <Row justify={'center'} align={'middle'}>
      <Empty description={<Title level={2}>Page not found</Title>} />
    </Row>
  )
}

export default ErrorComponent
