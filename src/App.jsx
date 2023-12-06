import { useState } from 'react'
import './styles/App.css'
import TheForm from './components/TheForm'
import TheHeader from './components/TheHeader'
import TheFooter from './components/TheFooter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <TheHeader/>
    <main>
       <TheForm/>
    
   </main>
    <TheFooter/>
    
  
    </>
  )
}

export default App
