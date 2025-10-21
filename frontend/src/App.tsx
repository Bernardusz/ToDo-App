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
// import myToken from './context/TokenState' 
// import { useEffect } from 'react'
function App() {
//   const useTokenInitialization = () => {
//     // Get the initialization function and the initialized state flag
//     const initializeToken = myToken((state) => state.initializeToken);
//     const isInitialized = myToken((state) => state.isInitialized);

//     useEffect(() => {
//         // Call the initialization function only once on mount
//         initializeToken(); 
//     }, [initializeToken]);

//     return isInitialized;
// };
//   const isInitialized = useTokenInitialization();
//   if (isInitialized){
//     return (
//       <div className="h-[80vh] w-screen flex items-center justify-center">
//             <div className="border-2 border-blue-400 w-100 p-5">
//               Loading...
//             </div>
//       </div>
//     )
//   }
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
        </Route>
      </Routes>
    </Router>
  )
}

export default App
