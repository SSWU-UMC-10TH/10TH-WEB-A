import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './layout/HomeLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage/>,
    children: [
      {index: true, element: <HomePage/>},
      {path: 'login', element: <LoginPage/>},
      {path: 'signup', element: <SignupPage/>},
      {path: 'mypage', element: <MyPage/>}
    ]
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;