import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import { type RouteObject } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/LpDetailPage";

//route 두가지
//1. public route: 인증x 접근 가능
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> }, // path가 /기준으로 /시 해당 페이지 등장
      { path: "login", element: <LoginPage /> }, // path가 /기준으로 /login시 해당 페이지 등장
      { path: "signup", element: <SignupPage /> }, // path가 /기준으로 /signup시 해당 페이지 등장
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> }, //구글 로그인 페이지 등장
      { path: "lps/:lpId", element: <LpDetailPage /> }, //LP 상세 페이지 등장
    ],
  },
];

//2. protected route: 인증o 접근 가능
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />, //인증 여부에 따라 자식 컴포넌트 접근 허용 여부 결정
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;