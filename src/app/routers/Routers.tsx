import { Layout } from "@app/layout/Layout"
import { PostsManagerPage } from "@pages/PostManager"
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
