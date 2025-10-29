import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import HomePage from "./pages/Home"
import { ProtectedRoute, PublicRoute } from './middleware/RoutingManager'
import LoginPage from './pages/Login'
import SignUpPage from './pages/Signup'
import HamburgerMenu from './components/hamburgerMenu'
import TasksPage from './pages/Tasks'
import TaskPage from './pages/Task'
import AddTaskPage from './pages/AddTask'
import EditTaskPage from './pages/EditTask'
import myToken from './context/TokenState'
import { useEffect } from 'react'
import LoggingOut from './pages/logOut'
import hamburgerState from './context/HamburgerState'
function App() {
  const initializeToken = myToken((state) => state.initializeToken);
  const setToggle = hamburgerState((state) => state.toggleIsOpen);

  useEffect(() =>{
    initializeToken();
  }, [initializeToken]);

  // Close hamburger on any click except when clicking inside
  // the hamburger menu itself or the menu icon in the header.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Adjust these selectors to match your markup:
      // .hamburger-menu -> wrapper for <HamburgerMenu />
      // .menu-icon -> the icon inside <Header /> that toggles the menu
      if (target.closest('#hamburgerMenu')) return;
      if (target.closest('#hamburgerButton')) return;

      setToggle(false);
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [setToggle]);

  return (
    <Router>
      <Header/>
      <HamburgerMenu/>
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>}/>
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/tasks' element={<TasksPage/>}/>
          <Route path='/tasks/:id' element={<TaskPage/>}/>
          <Route path='/tasks/creation' element={<AddTaskPage/>}/>
          <Route path='/tasks/:id/edit' element={<EditTaskPage/>}/>
          <Route path='/logout' element={<LoggingOut/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
