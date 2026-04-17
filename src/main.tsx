import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './useTheme'
import { MahjongDataProvider } from './useMahjongData'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <MahjongDataProvider>
        <App />
      </MahjongDataProvider>
    </ThemeProvider>
  </StrictMode>,
)
