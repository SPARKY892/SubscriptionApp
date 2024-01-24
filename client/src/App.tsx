import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio/Portfolio";
import Nav from "./components/Nav/Nav";
import LandingPage from "./pages/LandingPage";
import Articles from "./pages/Articles";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import ArticlesPlan from "./pages/ArticlesPlan";

function App() {
  return (
    <BrowserRouter>
      <Portfolio />
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
        <Route path="/article-plans" element={<ProtectedRoute />}>
          <Route path="/article-plans" element={<ArticlesPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
