import { Layout } from "@app/layout"
import { PostsManagerPage } from "@pages/postsManager"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <PostsManagerPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
