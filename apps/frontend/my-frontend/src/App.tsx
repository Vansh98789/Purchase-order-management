import { Navigate, Route, Routes } from "react-router-dom"
import LandingPage from "./features/LandingPage"
import DashBoard from "./features/DashBoard"
import CreateProduct from "./features/CreateProducts"
import MyProduct from "./features/Products"
import Order from "./features/Order"


function App() {

  return (
    <>
      
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/dashboard" element={<DashBoard/>}>
              <Route index element={<Navigate to="myProduct" replace />} />
              <Route path="createProduct" element={<CreateProduct/>}/>
              <Route path="myProduct" element={<MyProduct/>}/>
              <Route path="order" element={<Order/>}/>
            </Route>

          </Routes>
    </>
  )
}

export default App
