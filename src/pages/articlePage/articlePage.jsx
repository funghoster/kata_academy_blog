import { Row, Spin } from 'antd'
import React, { Suspense } from 'react'
import { Await, defer, json, useLoaderData } from 'react-router-dom'
import axios from 'axios'

import PostCard from '../../components/articleCard'

const ArticlePage = () => {
  const { post } = useLoaderData()
  return (
    <Row className="post">
      <Suspense fallback={<Spin size="large" />}>
        <Await resolve={post}>
          {(resolvedPosts) => {
            return (
              <>
                <PostCard post={resolvedPosts.article || resolvedPosts} />
              </>
            )
          }}
        </Await>
      </Suspense>
    </Row>
  )
}

async function getPosts(slug) {
  const config = {
    headers: localStorage.getItem('token') ? { Authorization: `Token ${localStorage.getItem('token')}` } : null,
    'Content-Type': 'application/json',
  }
  try {
    const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}`, config)
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

const postLoader = async ({ params }) => {
  return defer({
    post: getPosts(params.slug),
  })
}

export { postLoader }
export default ArticlePage
