export type UserSigninInformation = {
    email: string;
    password: string;
}

function validateUser(values: UserSigninInformation) {
    const errors: Record<keyof UserSigninInformation, string> = {
        email: '',
        password: '',
    }

    if(!values.email) {
        errors.email = '이메일을 입력해주세요!';
    } else if (!values.email.includes('@')) {
        errors.email = '올바른 이메일 형식이 아닙니다!';
    }

    if (values.password.length < 8 || values.password.length > 20) {
        errors.password = '비밀번호는 8자 이상 20자 이하로 입력해주세요!';
    }       
    
    return errors;
}

export function validateSignin(values: UserSigninInformation) {
   return validateUser(values);
}