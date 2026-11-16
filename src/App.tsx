import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProgressProvider } from './context/AuthProgressContext'
import { Home } from './pages/Home'
import { Scene } from './pages/Scene'
import { WhyFlow } from './pages/WhyFlow'
import { Courage } from './pages/Courage'
import { StickerBook } from './pages/StickerBook'
import './App.css'

export default function App() {
  return (
    <AuthProgressProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scene/:themeId" element={<Scene />} />
            <Route path="/why/:themeId/:spotId" element={<WhyFlow />} />
            <Route path="/courage/:themeId" element={<Courage />} />
            <Route path="/book" element={<StickerBook />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProgressProvider>
  )
}
