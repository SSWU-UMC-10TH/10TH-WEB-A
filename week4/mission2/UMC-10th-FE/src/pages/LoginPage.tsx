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
import { Link } from 'react-router-dom'

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
    <div className='flex flex-col items-center justify-center h-full gap-4 bg-black'>
        <div className='flex items-center gap-24 mr-26 font-bold'>
            <Link to="/">
                <div className=' text-xl text-white'> 〈 </div>
            </Link>
            <h1 className=' text-2xl text-white'>로그인</h1>
        </div>
        <div className='mt-6'>
            <button className= "border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white">구글 로그인</button>
        </div>
        <div className='mt-5 flex items-center gap-12 text-white'>
            <div className='w-20 h-0.5 bg-white'></div>
            <h1>OR</h1>
            <div className='w-20 h-0.5 bg-white'></div>
        </div>
        <div className='mt-5 flex flex-col gap-3'>
            <input 
            {...getInputProps('email')} 
            className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white
            ${errors?.email && touched?.email ? "" : "border-gray-300"}`}
            type="email" // {email} 대신 "email" 문자열로 수정
            placeholder={"이메일"}
            />
            {errors?.email && touched?.email && (
                <div className='bg-black text-red-500 text-sm'>{errors.email}</div>
            )}
            
            <input 
            {...getInputProps('password')} 
            className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white
            ${errors?.password && touched?.password ? "" : "border-gray-300"}`}
            type="password" 
            placeholder={"비밀번호"}
            />
            {errors?.password && touched?.password && (
                <div className='bg-black text-red-500 text-sm'>{errors.password}</div>
            )}

            <button 
            type='button' 
            onClick={handleSubmit} 
            disabled={false}
            className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors disabled:bg-gray-400'
            >   
                로그인
            </button>
        </div>
    </div>
  )
}

export default LoginPage