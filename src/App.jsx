import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import { Toaster } from 'sonner';

const App = () => {
  return (
    <>
      <Toaster position="top-center"
      toastOptions={{
        style: {
          background: 'crimson',
          border: 'none'
        },
        className: 'class',
      }}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App