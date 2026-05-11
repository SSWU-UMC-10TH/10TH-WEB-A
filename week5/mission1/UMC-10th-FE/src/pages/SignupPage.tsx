import React from 'react';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import type { ResponseSigninDto } from '../types/auth';
import { postSignup } from '../../apis/auth';

const schema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
  passwordCheck: z
    .string()
    .min(8, { message: "비밀번호 확인은 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호 확인은 20자 이하이어야 합니다." }),
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async(data) => {
    const { passwordCheck : string, ...rest} = data;
    const response :ResponseSigninDto = await postSignup(rest)
    console.log(response)
  };

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4 bg-black min-h-screen'>
      <div className='flex items-center gap-24 mr-26 font-bold'>
        <Link to="/">
          <div className='text-xl text-white'> 〈 </div>
        </Link>
        <h1 className='text-2xl text-white'>회원가입</h1>
      </div>

      <div className='mt-6'>
        <button type="button" className="border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white">
          구글 로그인
        </button>
      </div>

      <div className='mt-5 flex items-center gap-12 text-white'>
        <div className='w-20 h-0.5 bg-white'></div>
        <h1>OR</h1>
        <div className='w-20 h-0.5 bg-white'></div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5 flex flex-col gap-3'>
        <input 
          {...register('name')} 
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white bg-transparent
          ${errors.name ? "border-red-500" : "border-gray-300"}`}
          type="text" 
          placeholder="이름"
        />
        {errors.name && (
          <div className='text-red-500 text-sm'>{errors.name.message}</div>
        )}

        <input 
          {...register('email')} 
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white bg-transparent
          ${errors.email ? "border-red-500" : "border-gray-300"}`}
          type="email"
          placeholder="이메일"
        />
        {errors.email && (
          <div className='text-red-500 text-sm'>{errors.email.message}</div>
        )}

        <input 
          {...register('password')} 
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white bg-transparent
          ${errors.password ? "border-red-500" : "border-gray-300"}`}
          type="password" 
          placeholder="비밀번호"
        />
        {errors.password && (
          <div className='text-red-500 text-sm'>{errors.password.message}</div>
        )}

        <input 
          {...register('passwordCheck')} 
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white bg-transparent
          ${errors.passwordCheck ? "border-red-500" : "border-gray-300"}`}
          type="password" 
          placeholder="비밀번호 확인"
        />
        {errors.passwordCheck && (
          <div className='text-red-500 text-sm'>{errors.passwordCheck.message}</div>
        )}

        <button 
          type='submit' 
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors disabled:bg-gray-400'
        >   
          {isSubmitting ? "처리 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;