import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import Dashboard from './pages/User/Dashboard.jsx'
import AllUsers from './pages/Authority/AllUsers.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import AuthorityRoute from './pages/Authority/AuthorityRoute.jsx'
import Assignments from './pages/User/Assignments.jsx'
import Announcement from './pages/User/Announcement.jsx'
import AddAssignments from './pages/Authority/AddAssignments.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element={<App/>}>
      <Route index element={<Dashboard />} />
      <Route path = 'login' element={<Login/>}/>
      <Route path = 'register' element={<Register/>}/>
      <Route path = 'announcement' element={<Announcement/>}/>
      <Route path = 'assignments' element={<Assignments/>}/>
      <Route path='/admin' element={<AdminRoute/>}>
        {/* <Route path='all-users' element={<AllUsers/>}/> */}
      </Route>
      <Route path='/authority' element={<AuthorityRoute/>}>
        <Route path='all-users' element={<AllUsers/>}/>
        <Route path='add-assignments' element={<AddAssignments/>}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
