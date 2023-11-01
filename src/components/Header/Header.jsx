import { Button, Col, Image } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import defaultImg from '../../assets/Rectangle.png'
import { logout } from '../../stores/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((state) => state.auth)
  const imageSrc = data?.user?.image
  console.log(data)
  let elements
  if (data.isAuthenticated) {
    elements = (
      <>
        <Button className="btn btn--green btn--sm" onClick={() => navigate('/new-article')}>
          Create article
        </Button>
        <Col>
          <Link className="header__user" to="/profile">
            <span className="header__username">{data.user.username}</span>
            <Image
              className="header__img"
              src={imageSrc}
              fallback={defaultImg}
              preview={false}
              height={46}
              width={46}
              style={{ verticalAlign: 'top' }}
            />
          </Link>
        </Col>
        <Button
          className="header__btn btn--black"
          type="text"
          onClick={() => {
            navigate('sign-in')
            dispatch(logout())
          }}
        >
          Log Out
        </Button>
      </>
    )
  } else
    elements = (
      <>
        <Button
          className="header__btn"
          type="text"
          onClick={() => {
            navigate('sign-in')
            return dispatch(logout())
          }}
        >
          Sign In
        </Button>
        <Button
          className="header__btn btn--green"
          onClick={() => {
            navigate('sign-up')
            return dispatch(logout())
          }}
        >
          Sign Up
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

export default Header
