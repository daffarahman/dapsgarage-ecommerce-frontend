import Navbar from "@/components/navbar"
import { Route, Routes } from "react-router"
import Home from "@/components/pages/home"
import ShopAll from "@/components/pages/shop_all"
import ProductDetailPage from "@/components/pages/product_detail_page"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dapsgarage-ui-theme">
      <main className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/shop-all" element={<ShopAll />} />
          <Route path="/collections/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </ThemeProvider>
  )
}

export default App
