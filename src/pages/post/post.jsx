import { Row, Spin } from 'antd'
import React, { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'

import PostCard from '../../components/postCard'

const Post = () => {
  const { post } = useLoaderData()
  return (
    <Row className="post">
      <Suspense fallback={<Spin size="large" />}>
        <Await resolve={post}>
          {(resolvedPosts) => (
            <>
              <PostCard post={resolvedPosts.article} hasBody={true} />
            </>
          )}
        </Await>
      </Suspense>
    </Row>
  )
}

async function getPosts(slug) {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
  if (!res.ok) {
    throw new Response('', { status: res.status, statusText: 'Not found!!!' })
  }
  console.log('res', res)
  return res.json()
}

const postLoader = async ({ params }) => {
  return defer({
    post: getPosts(params.slug),
  })
}

export { postLoader }
export default Post
