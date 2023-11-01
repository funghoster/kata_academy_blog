import { Row, Spin } from 'antd'
import React, { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import axios from 'axios'

import PostCard from '../../components/articleCard'

const ArticlePage = () => {
  const { post } = useLoaderData()
  console.log('tuta')
  return (
    <Row className="post">
      <Suspense fallback={<Spin size="large" />}>
        <Await resolve={post}>
          {(resolvedPosts) => {
            console.log('resolvedPosts', resolvedPosts)
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
  console.log('localStorage.key(token)', localStorage.getItem('token'))
  const config = {
    headers: localStorage.getItem('token') ? { Authorization: `Token ${localStorage.getItem('token')}` } : null,
    'Content-Type': 'application/json',
  }
  try {
    const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}`, config)
    return response.data
  } catch (error) {
    throw new Response('', { status: error, statusText: 'Not found!!!' })
  }
}

const postLoader = async ({ params }) => {
  console.log('params', params)
  return defer({
    post: getPosts(params.slug),
  })
}

export { postLoader }
export default ArticlePage
