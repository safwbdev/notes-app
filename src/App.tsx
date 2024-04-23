import { MainProvider } from './contexts/MainProvider'
import Home from './Home'

function App() {

  return (
    <MainProvider>
      <Home />
    </MainProvider>
  )
}

export default App
