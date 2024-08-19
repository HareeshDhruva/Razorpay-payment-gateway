import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Login from "./components/hero/hero"
import Home from "./components/Home/home"
import { userContexthook } from "./context/userContext"

function App() {
  const {token} = userContexthook();
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={token !== null ? <Home/> : <Login/>}/>
      <Route path="*" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
