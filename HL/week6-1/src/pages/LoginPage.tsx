import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import type { UserSignInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSignInformation>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    await login(values);
  };

  const isDisabled = Object.values(errors || {}).some(
    (error) =>
      error.length > 0 || Object.values(values).some((value) => value === ""),
  );

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SETVER_API_URL + "/v1/auth/google/login";
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(128,123,255,0.18),_transparent_45%),linear-gradient(180deg,_#0b0b12_0%,_#08080d_100%)] px-4 py-10">
      <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-white/5 px-6 py-8 shadow-2xl shadow-black/40 backdrop-blur-md">
        <div className="relative flex w-full items-center justify-center">
          <button
            type="button"
            aria-label="이전 페이지로 이동"
            onClick={() => navigate(-1)}
            className="absolute left-0 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white transition hover:bg-white/20 hover:border-white/25"
          >
            &lt;
          </button>
          <h1 className="text-xl font-semibold text-white">로그인</h1>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white px-4 py-3 font-medium text-[#111827] transition hover:bg-[#f3f4f6] active:scale-[0.99]"
          >
            <img
              src={"./public/images/구글.png"}
              alt="구글 로그인"
              className="grid h-6 w-6 place-items-center rounded-full bg-white"
            />
            구글 로그인
          </button>
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
            <span className="h-px flex-1 bg-white/20" />
            <span>OR</span>
            <span className="h-px flex-1 bg-white/20" />
          </div>
          <input
            {...getInputProps("email")}
            className={`w-full rounded-xl border bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/45 focus:border-[#807bff] focus:bg-white/15 ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-500/10"
                : "border-white/15"
            }`}
            type={"email"}
            placeholder={"이메일을 입력해주세요!"}
          />
          {errors.email && touched.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <input
            {...getInputProps("password")}
            className={`w-full rounded-xl border bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/45 focus:border-[#807bff] focus:bg-white/15 ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-500/10"
                : "border-white/15"
            }`}
            type={"password"}
            placeholder={"비밀번호를 입력해주세요!"}
          />
          {errors.password && touched.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          <button
            type="button"
            className="w-full rounded-xl bg-[#807bff] py-3 font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/45"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;