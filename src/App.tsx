import Navbar from "@/components/Navbar"
import { Route, Routes } from "react-router"
import Home from "@/components/pages/Home"
import ShopAll from "@/components/pages/ShopAll"
import ProductDetailPage from "@/components/pages/ProductDetailPage"

function App() {
  return (
    <>
      <main className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/shop-all" element={<ShopAll />} />
          <Route path="/collections/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
