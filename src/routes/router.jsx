import { Suspense } from 'react'
import { Spin } from 'antd'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import BlogLayout from '../components/blogLayout'
import ArticleList from '../pages/articleListPage'
import { blogLoader } from '../pages/articleListPage/articleList'
import ErrorComponent from '../components/errorComponent'
import Article from '../pages/articlePage'
import { postLoader } from '../pages/articlePage/articlePage'
import LoginPage from '../pages/loginPage'
import SignUpPage from '../pages/SignUpPage'
import EditProfilePage from '../pages/editProfilePage'
import CreateArticlePage from '../pages/createArticlePage'
import EditArticlePage, { articleLoader } from '../pages/editArticlePage/editArticlePage'

import PublicRoute from './publicRoute'
import PrivateRoute from './privateRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BlogLayout />} errorElement={<ErrorComponent />}>
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <EditProfilePage />
          </PrivateRoute>
        }
        errorElement={<ErrorComponent />}
      />
      <Route
        path="new-article"
        element={
          <PrivateRoute>
            <CreateArticlePage />
          </PrivateRoute>
        }
        errorElement={<ErrorComponent />}
      />
      <Route
        path="sign-in"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
        errorElement={<ErrorComponent />}
      />

      <Route
        path="sign-up"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
        errorElement={<ErrorComponent />}
      />
      <Route index element={<ArticleList />} loader={blogLoader} errorElement={<ErrorComponent />} />
      <Route path=":page" element={<ArticleList />} loader={blogLoader} errorElement={<ErrorComponent />} />
      <Route path="articles" element={<ArticleList />} loader={blogLoader} errorElement={<ErrorComponent />} />
      <Route path="articles/:slug" element={<Article />} loader={postLoader} errorElement={<ErrorComponent />} />
      <Route
        path="articles/:slug/edit"
        element={
          <Suspense fallback={<Spin size="large" />}>
            <PrivateRoute>
              <EditArticlePage />
            </PrivateRoute>
          </Suspense>
        }
        loader={articleLoader}
        errorElement={<ErrorComponent />}
      />
      <Route path="*" element={<ErrorComponent />} />
    </Route>
  )
)

export default router
