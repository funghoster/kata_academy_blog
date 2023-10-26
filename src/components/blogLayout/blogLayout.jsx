import { Col, Layout, Row, Space } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

import BlogHeader from '../blogHeader'

const BlogLayout = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Header className="header">
        <BlogHeader />
      </Header>
      <Layout>
        <Content className="content">
          <Row>
            <Col className="wrapper" span={16} offset={4}>
              <Outlet />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Space>
  )
}

export default BlogLayout
