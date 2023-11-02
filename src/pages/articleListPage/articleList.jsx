import { Pagination, Row, Spin } from 'antd'
import React, { Suspense } from 'react'
import { Await, defer, json, useAsyncValue, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import './articleList.scss'
import PostCard from '../../components/articleCard'

const ArticleList = () => {
  const { posts } = useLoaderData()
  const navigate = useNavigate()
  const params = useParams()
  return (
    <Row className="posts">
      <Suspense fallback={<Spin size="large" />}>
        <Await resolve={posts}>
          {(resolvedPosts) => {
            if (resolvedPosts.articles.length === 0) throw new Response('', { status: 404, statusText: 'Not found!!!' })
            return (
              <>
                {resolvedPosts.articles.map((post) => (
                  <Row key={post.slug} style={{ height: '140px', width: '100%' }}>
                    <PostCard post={post} />
                  </Row>
                ))}

                <PaginationPosts navigate={navigate} params={params} />
              </>
            )
          }}
        </Await>
      </Suspense>
    </Row>
  )
}

const PaginationPosts = ({ navigate, params }) => {
  const posts = useAsyncValue()

  if (Object.keys(params).length === 0) {
    params.page = 1
  } else {
    params.page = Number(params.page) || 1
  }
  return (
    <Pagination
      showSizeChanger={false}
      defaultCurrent={params.page}
      pageSize={5}
      total={posts.articlesCount}
      onChange={(page) => navigate(`/${page}`)}
    />
  )
}

async function getPosts(page = 1) {
  const offset = page * 5 - 5
  const config = {
    headers: localStorage.getItem('token') ? { Authorization: `Token ${localStorage.getItem('token')}` } : null,
    'Content-Type': 'application/json',
  }
  try {
    const response = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`, config)
    return response.data
  } catch (error) {
    throw json(
      {
        statusText: 'Not found!!!',
      },
      { status: error }
    )
  }
}

const blogLoader = async ({ params: { page = 1 } }) => {
  if (isNaN(Number(page)))
    throw json(
      {
        statusText: `Page '/${page}' Not found!!!`,
      },
      { status: 404 }
    )

  return defer({
    posts: getPosts(page),
  })
}

export { blogLoader }
export default ArticleList
