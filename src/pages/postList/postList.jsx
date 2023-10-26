import { Pagination, Row, Spin } from 'antd'
import React, { Suspense } from 'react'
import { Await, defer, useAsyncValue, useLoaderData, useNavigate, useParams } from 'react-router-dom'

import './postList.scss'
import PostCard from '../../components/postCard'

const PostList = () => {
  const { posts } = useLoaderData()
  const navigate = useNavigate()
  const params = useParams()
  return (
    <Row className="posts">
      <Suspense fallback={<Spin size="large" />}>
        <Await resolve={posts}>
          {(resolvedPosts) => (
            <>
              {resolvedPosts.articles.map((post) => (
                <Row key={post.slug} style={{ height: '140px', width: '100%' }}>
                  <PostCard post={post} />
                </Row>
              ))}

              <PaginationPosts navigate={navigate} params={params} />
            </>
          )}
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
      pageSize={10}
      total={posts.articlesCount}
      onChange={(page) => navigate(`/${page}`)}
    />
  )
}

async function getPosts(page = 1) {
  const offset = page * 10 - 10
  const res = await fetch(`https://blog.kata.academy/api/articles?limit=10&offset=${offset}`)
  if (!res.ok) {
    throw new Response('', { status: res.status, statusText: 'Not found!!!' })
  }

  return res.json()
}

const blogLoader = async ({ params }) => {
  const page = params.page

  return defer({
    posts: getPosts(page),
  })
}

export { blogLoader }
export default PostList
