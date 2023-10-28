import { Avatar, Button, Col } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogHeader = () => {
  const data = useSelector((state) => state.auth)
  console.log(data, 'blog')
  let elements
  if (data.isAuthenticated) {
    elements = (
      <>
        <Button className="header__btn header__btn--green header__btn--sm">
          <Link to="/sign-up">Create article</Link>
        </Button>
        <Col>
          <label className="header__user">
            <Link className="header__username" to="/sign-up">
              {data.user.username}
            </Link>
            {data.user.image ? (
              <Avatar src={data.user.image} size={46} />
            ) : (
              <Avatar src="../../assets/Rectangle.png" size={46} />
            )}
          </label>
        </Col>
        <Button className="header__btn header__btn--black" type="text">
          Log Out
        </Button>
      </>
    )
  } else
    elements = (
      <>
        <Button className="header__btn" type="text">
          <Link to="/sign-in">Sign In</Link>
        </Button>
        <Button className="header__btn header__btn--green">
          <Link to="/sign-up">Sign Up</Link>
        </Button>
      </>
    )
  return (
    <>
      <Col className="header__logo">
        <Link to="/">Realworld Blog</Link>
      </Col>
      <Col className="header__profile">{elements}</Col>
    </>
  )
}

export default BlogHeader
