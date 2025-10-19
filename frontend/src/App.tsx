import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import HomePage from "./pages/Home"
import { ProtectedRoute, PublicRoute } from './middleware/RoutingManager'
import LoginPage from './pages/Login'
import SignUpPage from './pages/Signup'
import HamburgerMenu from './components/hamburgerMenu'
import TasksPage from './pages/Tasks'
function App() {
  

  return (
    <Router>
      <Header/>
      <HamburgerMenu/>
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/tasks' element={<TasksPage/>}/>
        </Route>
        <Route element={<ProtectedRoute/>}>

        </Route>
      </Routes>
    </Router>
  )
}

export default App
