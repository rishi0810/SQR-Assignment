import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
const App = ()=>{
  return (
    <div className="min-h-screen flex items-center justify-center font-jakarta">
      <Toaster />
      <Login/>
    </div>
  )
}

export default App