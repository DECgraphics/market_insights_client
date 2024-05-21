import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import {
  ProtectedRoute,
  AuthRoute,
} from './components /ProtectedRoute/ProtectedRoute'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { useAuth } from './hooks/useAuth'



function App() {
  useAuth()
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
      errorElement: <NotFoundPage />,
    },
    {
      path: '/sign_in',
      element: (
        <AuthRoute>
          <SignIn />
        </AuthRoute>
      ),
    },
    {
      path: '/sign_up',
      element: (
        <AuthRoute>
          <SignUp />
        </AuthRoute>
      ),
    },
  ])

  return <RouterProvider router={router} />
}

export default App
