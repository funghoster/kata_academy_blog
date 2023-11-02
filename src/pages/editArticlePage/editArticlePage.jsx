import React from 'react'
import { Await, defer, json, useLoaderData } from 'react-router-dom'

import ArticleComponent from '../../components/articleComponent'

const EditArticlePage = () => {
  const { article } = useLoaderData()
  return <Await resolve={article}>{(resolvedArticle) => <ArticleComponent article={resolvedArticle.article} />}</Await>
}

async function getArticleData(slug) {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
  if (!res.ok) {
    throw json(
      {
        statusText: 'Not found!!!',
      },
      { status: res.status }
    )
  }

  return res.json()
}

const articleLoader = async ({ params }) => {
  return defer({
    article: getArticleData(params.slug),
  })
}

export { articleLoader }
export default EditArticlePage
