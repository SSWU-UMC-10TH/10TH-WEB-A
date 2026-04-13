// import React from 'react'
// import { useState } from 'react'

// const LoginPage = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const handleLogin = async () => {
//         await login(email, password)
//     }

//   return (
//     <div>
//         <input type={email} onChange={ (e) => setEmail(e.target.value)} />
//         <input type={password} onChange={ (e) => setPassword(e.target.value)} />
//         <button onClick={handleLogin}>Login</button>
//     </div>
//   )
// }

// export default LoginPage


import React from 'react'
import useForm from '../hooks/useForm'
import { validateSignin, type UserSigninInformation } from '../utils/validate'

const LoginPage = () => {
    const { errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateSignin
    })

    const handleSubmit = () => {
        console.log(values)
    }

    // const isDisabled: boolean =
    // Object.values(errors || {}).some((error : string) => error.length > 0) || //오류가 있으면 true
    // Object.values(values).some((value : string) => value === "");// 입력값이 비어있으면 true

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
        <div className='flex flex-col gap-3'>
            <input 
            {...getInputProps('email')} 
            className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email && touched?.email ? "border-red-500 bg-red-100" : "border-gray-300"}`}
            type="email" // {email} 대신 "email" 문자열로 수정
            placeholder={"이메일"}
            />
            {errors?.email && touched?.email && (
                <div className='text-red-500 text-sm'>{errors.email}</div>
            )}
            
            <input 
            {...getInputProps('password')} 
            className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.password && touched?.password ? "border-red-500 bg-red-100" : "border-gray-300"}`}
            type="password" 
            placeholder={"비밀번호"}
            />
            {errors?.password && touched?.password && (
                <div className='text-red-500 text-sm'>{errors.password}</div>
            )}

            <button 
            type='button' 
            onClick={handleSubmit} 
            disabled={false}
            className='w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400'
            >   
                로그인
            </button>
        </div>
    </div>
  )
}

export default LoginPage