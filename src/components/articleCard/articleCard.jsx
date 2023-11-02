import { Avatar, Button, Col, ConfigProvider, Image, Popconfirm, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { useDispatch, useSelector } from 'react-redux'
const { Paragraph, Title } = Typography

import defaultImg from '../../assets/Rectangle.png'
import { fetchDeleteArticle, fetchFavoriteArticle } from '../../stores/authSlice'

const ArticleCard = ({ post }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const { slug, title, favorited, favoritesCount, tagList, description, author, createdAt, body } = post
  const [isFavorited, setFavorited] = useState(favorited)
  const [count, setCount] = useState(favoritesCount)
  const { username, image } = author
  const thisAuthor = username === user?.username
  const hasParams = params.slug

  const tags = tagList.map((tag, index) => (
    <Col key={index} className="tag">
      {tag}
    </Col>
  ))

  const bodyElement = hasParams ? (
    <Row className="card__body">
      <Markdown>{body ? body : ''}</Markdown>
    </Row>
  ) : null

  const hearts = isFavorited ? (
    <HeartFilled className="like__img" style={{ color: '#FF0707' }} />
  ) : (
    <HeartOutlined className="like__img" />
  )

  const date = format(new Date(createdAt), 'PP')

  const onDelete = async (slug) => {
    const result = await dispatch(fetchDeleteArticle(slug))
    if (result.meta.requestStatus === 'fulfilled') navigate('/')
  }

  const onLike = async (slug, setFavorite) => {
    const result = await dispatch(fetchFavoriteArticle({ slug, setFavorite }))
    if (result.meta.requestStatus === 'fulfilled') {
      setFavorited(result.payload.article.favorited)
      setCount(result.payload.article.favoritesCount)
    }
  }

  return (
    <Col className="card">
      <Row className="card__wrapper-header">
        <Col className="card__info">
          <Row className="card__header">
            <Link className="card__title" to={`/articles/${slug}`}>
              {title}
            </Link>

            <Col>
              <label className="like">
                {hearts}
                <input
                  className={'likebox'}
                  type="checkbox"
                  id="likebox"
                  name="likebox"
                  checked={isFavorited}
                  onChange={() => onLike(slug, !isFavorited)}
                />
                {count}
              </label>
            </Col>
          </Row>
          <Row className="card__tags">{tags}</Row>
          <Row className="card__descr">
            <ConfigProvider
              theme={{
                components: {
                  Typography: {
                    titleMarginBottom: '0rem',
                    titleMarginTop: '0px',
                    margin: 0,
                  },
                },
                token: {
                  fontFamily: 'Inter, sans-serif',
                  colorTextHeading: 'rgba(0, 0, 0, 0.50)',
                  fontSizeHeading5: '12px',
                  fontWeightStrong: 400,
                },
              }}
            >
              <Title className="card__paragraph" level={5}>
                {description}
              </Title>
            </ConfigProvider>
          </Row>
        </Col>
        <Col className="card__author">
          <Row className="card__author-header">
            <Col className="card__author-wrapper">
              <Row className="card__author-name">{username}</Row>
              <Row className="card__author-date">{date} </Row>
            </Col>
            <Col className="card__author-avatar">
              <Avatar src={<Image src={image} fallback={defaultImg} height={46} width={46} />} size={46} />
            </Col>
          </Row>
          {thisAuthor && hasParams ? (
            <Row className="card__author-btns">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => onDelete(hasParams)}
                okText="Yes"
                cancelText="No"
              >
                <Button className="btn" danger>
                  Delete
                </Button>
              </Popconfirm>

              <Button className="btn btn--green" onClick={() => navigate('edit')}>
                Edit
              </Button>
            </Row>
          ) : null}
        </Col>
      </Row>

      <Col className="card__warapper-body">
        {hasParams ? (
          <Row className="card__descr">
            <Paragraph className="card__paragraph">{bodyElement}</Paragraph>
          </Row>
        ) : null}
      </Col>
    </Col>
  )
}

export default ArticleCard
