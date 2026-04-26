import React, { useEffect } from 'react';
import useForm from '../hooks/useForm';
import { validateSignin, type UserSigninInformation } from '../utils/validate';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate(); // 오타 수정: naviagte -> navigate

    useEffect(() => {
        if (accessToken) {
            navigate('/'); // 오타 수정
        }
    }, [navigate, accessToken]);

    // useForm에서 values를 반드시 가져와야 합니다.
    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateSignin
    });

    const handleSubmit = async () => {
        try {
            // values를 login 함수에 전달합니다.
            await login(values);
            // 로그인이 성공한 뒤 이동하도록 await 다음에 배치
            navigate("/mypage"); 
        } catch (error) {
            // 에러 처리는 AuthContext에서 하므로 여기서는 필요 시 추가 로직만 작성
        }
    };

    // 버튼 활성화 로직 주석 해제 및 수정
    const isDisabled: boolean =
        Object.values(errors || {}).some((error) => error && error.length > 0) || 
        Object.values(values).some((value) => value === "");

    return (
        <div className='flex flex-col items-center justify-center h-full gap-4 bg-black text-white'>
            <div className='flex items-center gap-24 mr-26 font-bold'>
                <Link to="/">
                    <div className='text-xl text-white'> 〈 </div>
                </Link>
                <h1 className='text-2xl'>로그인</h1>
            </div>

            <div className='mt-6'>
                <button className="border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white">
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
                    />
                    {errors?.password && touched?.password && (
                        <span className='text-red-500 text-sm'>{errors.password}</span>
                    )}
                </div>

                <button 
                    type='button' 
                    onClick={handleSubmit} 
                    disabled={isDisabled} // isDisabled 적용
                    className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed'
                >   
                    로그인
                </button>
            </div>
        </div>
    );
};

export default LoginPage;