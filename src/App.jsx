import {ToastContainer} from 'react-toastify'
import {Outlet} from 'react-router-dom'
import Navigation from './pages/Auth/Navigation.jsx'
import './index.css'

function App() {
  return (
    <>
      <ToastContainer/>
      <Navigation/>
      <main className='flex flex-row'>
        <Outlet/>
      </main>
    </>
  )
}

export default App
