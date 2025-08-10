import { BrowserRouter as Router } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

import "./styles/globals.css"
import { QueryClinetProvider } from "@app/provider"
import { PostsManagerPage } from "@pages/PostManager"

const App = () => {
  return (
    <QueryClinetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClinetProvider>
  )
}

export default App
