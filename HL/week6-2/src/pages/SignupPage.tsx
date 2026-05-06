import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm, useWatch, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { postSignup } from "../apis/auth"

const schema = z
  .object({
    email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "닉네임을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  })

type FormField = z.infer<typeof schema>

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M3 3l18 18" />
    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
    <path d="M9.2 5.3A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17.3 17.3 0 0 1-4 4.8" />
    <path d="M6 6.2C3.3 8 2 12 2 12s3.5 6 10 6c1.3 0 2.6-.3 3.7-.8" />
  </svg>
)

const SignupPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordCheck, setShowPasswordCheck] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  })

  const email = useWatch({ control, name: "email" })
  const password = useWatch({ control, name: "password" })
  const passwordCheck = useWatch({ control, name: "passwordCheck" })
  const name = useWatch({ control, name: "name" })

  const handleNextStep = async () => {
    const isEmailValid = await trigger("email")

    if (isEmailValid) {
      setStep(2)
    }
  }

  const handleNextPasswordStep = async () => {
    const isPasswordValid = await trigger(["password", "passwordCheck"])

    if (isPasswordValid) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3)
      return
    }

    navigate(-1)
  }

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const { email, password, name } = data
    const submitData = {
      email,
      password,
      name,
    }

    try {
      const response = await postSignup(submitData)
      console.log(response)
      navigate("/")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        const readableMessage = Array.isArray(message) ? message.join("\n") : message
        alert(readableMessage ?? "회원가입에 실패했습니다. 입력값을 다시 확인해주세요.")
      } else {
        alert("회원가입에 실패했습니다. 입력값을 다시 확인해주세요.")
      }
      console.error(error)
    }
  }

  const canGoNext = Boolean(email) && !errors.email
  const canGoNextPassword = Boolean(password) && Boolean(passwordCheck) && !errors.password && !errors.passwordCheck
  const canSubmit = Boolean(name) && !errors.name && !isSubmitting

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(128,123,255,0.18),_transparent_45%),linear-gradient(180deg,_#0b0b12_0%,_#08080d_100%)] px-4 py-10">
      <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-white/5 px-6 py-8 shadow-2xl shadow-black/40 backdrop-blur-md">
        <div className="relative flex w-full items-center justify-center">
          <button
            type="button"
            aria-label="이전 페이지로 이동"
            onClick={handleBack}
            className="absolute left-0 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white transition hover:bg-white/20 hover:border-white/25"
          >
            &lt;
          </button>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-white">회원가입</h1>
            <p className="mt-1 text-sm text-white/55">
              {step === 1 && "이메일을 입력한 뒤 다음 단계로 넘어가세요."}
              {step === 2 && "비밀번호를 설정하고 확인해 주세요."}
              {step === 3 && "닉네임을 입력하고 회원가입을 완료하세요."}
            </p>
          </div>
        </div>

        {step === 1 ? (
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 transition focus-within:border-[#807bff] focus-within:bg-white/15">
              <span className="text-lg text-white/70">@</span>
              <input
                {...register("email")}
                className="w-full bg-transparent text-white outline-none placeholder:text-white/45"
                type="email"
                placeholder="이메일을 입력해주세요!"
              />
            </div>
            {errors.email && <div className="text-sm text-red-400">{errors.email.message}</div>}

            <button
              type="button"
              className="w-full rounded-xl bg-[#807bff] py-3 font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/45"
              onClick={handleNextStep}
              disabled={!canGoNext}
            >
              다음
            </button>
          </div>
        ) : step === 2 ? (
          <div className="mt-8 flex flex-col gap-3">
            <div className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white/70">
              {email}
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 transition focus-within:border-[#807bff] focus-within:bg-white/15">
              <span className="text-lg text-white/70">*</span>
              <input
                {...register("password")}
                className="w-full bg-transparent text-white outline-none placeholder:text-white/45"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요!"
              />
              <button
                type="button"
                className="text-white/65 transition hover:text-white"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.password && <div className="text-sm text-red-400">{errors.password.message}</div>}

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 transition focus-within:border-[#807bff] focus-within:bg-white/15">
              <span className="text-lg text-white/70">*</span>
              <input
                {...register("passwordCheck")}
                className="w-full bg-transparent text-white outline-none placeholder:text-white/45"
                type={showPasswordCheck ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해주세요!"
              />
              <button
                type="button"
                className="text-white/65 transition hover:text-white"
                aria-label={showPasswordCheck ? "비밀번호 확인 숨기기" : "비밀번호 확인 보기"}
                onClick={() => setShowPasswordCheck((prev) => !prev)}
              >
                {showPasswordCheck ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.passwordCheck && <div className="text-sm text-red-400">{errors.passwordCheck.message}</div>}

            <button
              type="button"
              className="w-full rounded-xl bg-[#807bff] py-3 font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/45"
              onClick={handleNextPasswordStep}
              disabled={!canGoNextPassword}
            >
              다음
            </button>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-3">
            <div className="rounded-2xl border border-dashed border-white/25 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">프로필 이미지</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white/75">
                  +
                </div>
                <div>
                  <p className="text-sm font-medium text-white">이미지 업로드 UI</p>
                  <p className="text-xs text-white/55">현재는 디자인만 제공됩니다.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 transition focus-within:border-[#807bff] focus-within:bg-white/15">
              <span className="text-lg text-white/70">#</span>
              <input
                {...register("name")}
                className="w-full bg-transparent text-white outline-none placeholder:text-white/45"
                type="text"
                placeholder="닉네임을 입력해주세요!"
              />
            </div>
            {errors.name && <div className="text-sm text-red-400">{errors.name.message}</div>}

            <button
              type="button"
              className="w-full rounded-xl bg-[#807bff] py-3 font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/45"
              onClick={handleSubmit(onSubmit)}
              disabled={!canSubmit}
            >
              회원가입
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignupPage