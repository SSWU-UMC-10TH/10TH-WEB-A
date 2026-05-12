import React, { useEffect } from 'react';
import useForm from '../hooks/useForm';
import { validateSignin, type UserSigninInformation } from '../utils/validate';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@tanstack/react-query'; // useMutation 임포트
import google from '../assets/google.png'

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate(); 

    useEffect(() => {
        if (accessToken) {
            navigate('/'); 
        }
    }, [navigate, accessToken]);

    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateSignin
    });

    // [수정] useMutation을 이용한 로그인 로직 변경
    const { mutate: loginMutation, isPending } = useMutation({
        mutationFn: (loginData: UserSigninInformation) => login(loginData),
        onSuccess: () => {
            // 로그인 성공 시 홈("/") 화면으로 리다이렉션
            navigate('/');
        },
        onError: (error) => {
            // 에러 발생 시 처리 (필요에 따라 alert 등 추가)
            console.error("로그인 실패:", error);
        }
    });

    const handleSubmit = () => {
        // mutation 실행
        loginMutation(values);
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL + '/v1/auth/google/login'
    }

    const isDisabled: boolean =
        Object.values(errors || {}).some((error) => error && error.length > 0) || 
        Object.values(values).some((value) => value === "") ||
        isPending; // 로딩 중일 때도 버튼 비활성화

    return (
        <div className='flex flex-col items-center justify-center h-full gap-4 bg-black text-white'>
            <div className='flex items-center gap-24 mr-26 font-bold'>
                <Link to="/">
                    <div className='text-xl text-white'> 〈 </div>
                </Link>
                <h1 className='text-2xl'>로그인</h1>
            </div>

            <div className='mt-6'>
                <button className="flex justify-left items-center pl-20 border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white disabled:opacity-50"
                    type='button' 
                    onClick={handleGoogleLogin} 
                    disabled={isPending} // 구글 로그인 시에도 일반 로그인 로딩 중이면 차단
                    >
                    <img className='w-10' src={google} alt="" />
                    구글 로그인
                </button>
            </div>

            <div className='mt-5 flex items-center gap-12'>
                <div className='w-20 h-0.5 bg-white'></div>
                <h1>OR</h1>
                <div className='w-20 h-0.5 bg-white'></div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
                <div className="flex flex-col gap-1">
                    <input 
                        {...getInputProps('email')} 
                        className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm bg-transparent
                        ${errors?.email && touched?.email ? "border-red-500" : "border-gray-300"}`}
                        type="email" 
                        placeholder="이메일"
                        disabled={isPending}
                    />
                    {errors?.email && touched?.email && (
                        <span className='text-red-500 text-sm'>{errors.email}</span>
                    )}
                </div>
                
                <div className="flex flex-col gap-1">
                    <input 
                        {...getInputProps('password')} 
                        className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm bg-transparent
                        ${errors?.password && touched?.password ? "border-red-500" : "border-gray-300"}`}
                        type="password" 
                        placeholder="비밀번호"
                        disabled={isPending}
                    />
                    {errors?.password && touched?.password && (
                        <span className='text-red-500 text-sm'>{errors.password}</span>
                    )}
                </div>

                <button 
                    type='button' 
                    onClick={handleSubmit} 
                    disabled={isDisabled}
                    className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed'
                >   
                    {isPending ? '로그인 중...' : '로그인'}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;