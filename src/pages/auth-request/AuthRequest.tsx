// 건국대학교 학생 인증
import { useForm, type SubmitHandler } from 'react-hook-form';
import UserInput from '../../shared/components/UserInput';
import { useState } from 'react';
import { requestAuthCode } from '../../shared/apis/auth/auth';
// import { useNavigate } from 'react-router-dom';

type AuthRequestProps = {
  userEmail: string;
  authNumber: string;
};

const AuthRequest = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthRequestProps>({
    mode: 'onChange',
  });

  const [showEnterAuth, setShowEnterAuth] = useState(false);

  const onSubmit: SubmitHandler<AuthRequestProps> = async (data) => {
    console.log('폼 제출 성공!', data);
  };

  const userEmail = watch('userEmail');
  const authNumber = watch('authNumber');
  //   const navigate = useNavigate();

  const handleRequestAuthNum = async () => {
    console.log('인증번호 요청됨');
    try {
      const response = await requestAuthCode(userEmail);
      console.log(response);
      if (!response.data.isVerified) {
        // 인증정보 기억 안돼있으면
        setShowEnterAuth(true); // 인증번호 입력 필드 보여주기
      } else {
        // 인증정보 기억 돼있으면 바로 개방요청 보내기
      }
    } catch {
      alert('인증번호 요청 오류가 발생했습니다.');
    }
  };

  const handleVerifyAuthNum = () => {
    console.log('인증정보 확인 요청됨');
    try {
      //
    } catch {
      alert('인증정보 확인 오류가 발생했습니다.');
    }
  };

  const handleBack = () => {
    // 뒤로가기
  };

  return (
    <div className="w-full">
      <div className="form-wrapper">
        <h1 className="form-title">건국대학교 학생 인증</h1>

        <main className="mt-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-2"
          >
            <div className="flex gap-2">
              <UserInput
                registerName="userEmail"
                placeholder="건국대학교 이메일을 입력해주세요"
                register={register}
                error={errors.userEmail}
                rules={{
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: '올바른 이메일 형식이 아닙니다.',
                  },
                }}
                width="24rem"
              />

              <button
                type="button"
                className="form-button"
                disabled={!userEmail}
                onClick={handleRequestAuthNum}
              >
                학생 인증하기
              </button>
            </div>

            {showEnterAuth && (
              <div className="flex gap-2">
                <UserInput
                  registerName="authNumber"
                  type="number"
                  placeholder="인증번호를 입력해주세요"
                  register={register}
                  error={errors.authNumber}
                  rules={{
                    required: '인증번호를 입력해주세요.',
                  }}
                  width="24rem"
                />
                <button
                  type="button"
                  className="form-button"
                  disabled={!authNumber}
                  onClick={handleVerifyAuthNum}
                >
                  인증번호 입력
                </button>
              </div>
            )}
          </form>
        </main>

        <div className="mt-4 flex text-[1.2rem]">
          <button type="button" className="text-green-500 underline" onClick={handleBack}>
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthRequest;
