import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2> welcome</h2>
      <h1 class="text-3xl font-bold underline">
          Hello world!
        </h1>
        <Button>Subscribe</Button>
        
    </>
  )
}

export default App
