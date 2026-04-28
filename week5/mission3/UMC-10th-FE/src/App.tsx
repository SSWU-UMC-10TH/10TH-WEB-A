import './App.css';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import HomeLayout from './layout/HomeLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage'

 // publicRoutes: 모든 사용자가 접근 가능한 페이지
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: "v1/login/google/callback", element: <GoogleLoginRedirectPage />}
    ]
  }
];


 // protectedRoutes: 인증된 사용자만 접근 가능한 페이지
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout/>,
    children: [
      {
        path: "mypage",
        element: <MyPage />,
      }
    ]
  }
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;