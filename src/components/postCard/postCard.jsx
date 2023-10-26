import { Avatar, Col, Row } from 'antd'
import React from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'

const PostCard = ({ post, hasBody = false }) => {
  const { slug, title, favorited, favoritesCount, tagList, description, author, createdAt, body } = post
  const { username, image } = author
  const tags = tagList.map((tag, index) => (
    <Col key={index} className="tag">
      {tag}
    </Col>
  ))
  console.log(body)
  const bodyElement = hasBody ? (
    <Row className="card__body">
      <Markdown>{body}</Markdown>
    </Row>
  ) : null
  const date = format(new Date(createdAt), 'PP')
  return (
    <Col className="card">
      <Row className="card__row">
        <Col className="card__info" flex={'auto'}>
          <Row className="card__header">
            <Link className="card__title" to={`/articles/${slug}`}>
              {title}
            </Link>

            <Col className="like">
              {favorited ? (
                <HeartFilled className="like__img" style={{ color: '#FF0707' }} />
              ) : (
                <HeartOutlined className="like__img" />
              )}
              <input className={'likebox'} type="checkbox" id="likebox" name="likebox" />
              <label htmlFor="likebox">{favoritesCount}</label>
            </Col>
          </Row>
          <Row className="card__tags">{tags}</Row>
          <Row className="card__descr">{description}</Row>
        </Col>
        <Col className="card__author">
          <Col className="card__author-wrapper">
            <Row className="card__author-name">{username}</Row>
            <Row className="card__author-date">{date} </Row>
          </Col>
          <Col className="card__author-avatar">
            <Avatar src={image} size={46} />
          </Col>
        </Col>
      </Row>
      {bodyElement}
    </Col>
  )
}

export default PostCard
