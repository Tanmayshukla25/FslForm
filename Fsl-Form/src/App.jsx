
import './App.css'
import { createBrowserRouter, Form, RouterProvider } from 'react-router-dom'
import First from './Components/First'

import FormData from './Components/Form'

const router=createBrowserRouter([ {
    path:"/",
    element:<First/>,
    children:[
      {
        index:true,
        element:<FormData/>
      }
    ]
  }])






function App() {


  return <RouterProvider router={router}/>
}

export default App
