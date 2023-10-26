import { Button, Col } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogHeader = () => {
  return (
    <>
      <Col className="header__logo">
        <Link to="/">Realworld Blog</Link>
      </Col>
      <Col className="header__profile">
        <Button className="header__btn" type="text">
          Sign In
        </Button>
        <Button className="header__btn header__btn--green">Sign Up</Button>
      </Col>
    </>
  )
}

export default BlogHeader
