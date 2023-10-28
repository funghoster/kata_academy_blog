import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import BlogLayout from '../components/blogLayout'
import PostList from '../pages/postList'
import { blogLoader } from '../pages/postList/postList'
import ErrorComponent from '../components/errorComponent'
import Post from '../pages/post'
import { postLoader } from '../pages/post/post'
import LoginPage from '../pages/loginPage'
import RegistrationPage from '../pages/registrationPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BlogLayout />} errorElement={<ErrorComponent />}>
      <Route index element={<PostList />} loader={blogLoader} errorElement={<ErrorComponent />} />
      <Route path="/:page" element={<PostList />} loader={blogLoader} errorElement={<ErrorComponent />} />
      <Route path="/articles" element={<PostList />} loader={blogLoader} errorElement={<ErrorComponent />} />
      <Route path="/articles/:slug" element={<Post />} loader={postLoader} errorElement={<ErrorComponent />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/sign-up" element={<RegistrationPage />} />
    </Route>
  )
)

export default router
