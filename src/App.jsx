import { Route, Routes} from "react-router-dom";
import Sign from "./Sign";
import AIPage from "./AIPage";

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<AIPage/>}> </Route>
        <Route path="/signlogin" element={<Sign/>}></Route>
      </Routes>
      
    </>
  )
}

export default App
