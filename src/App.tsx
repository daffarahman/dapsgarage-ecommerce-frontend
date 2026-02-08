import Navbar from "@/components/Navbar"
import { Route, Routes } from "react-router"
import Home from "@/components/pages/Home"
import ShopAll from "@/components/pages/ShopAll"

function App() {
  return (
    <>
      <main className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/shop-all" element={<ShopAll />} />
        </Routes>
      </main>
    </>
  )
}

export default App
