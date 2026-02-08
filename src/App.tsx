import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Route, Routes } from "react-router"
import Home from "@/components/pages/home"
import ProductListing from "@/components/pages/product-listing"
import ProductDetailPage from "@/components/pages/product-detail-page"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dapsgarage-ui-theme">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections/:slug" element={<ProductListing />} />
            <Route path="/collections/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
