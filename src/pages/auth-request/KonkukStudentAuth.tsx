import UserInput from '../../shared/components/UserInput';
import { useLocation, useNavigate } from 'react-router';
import { useEmailAuthForm } from './hooks/useEmailAuthForm';
import { useEmailAuthRequest } from './hooks/useEmailAuthRequest';
import { useState } from 'react';

const KonkukStudentAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const spaceId = location.state?.spaceId;
  const [showEnterAuth, setShowEnterAuth] = useState(false);

  const {
    registerEmail,
    handleSubmitEmail,
    errorsEmail,
    isValidEmail,
    registerAuth,
    handleSubmitAuth,
    errorsAuth,
    userEmail,
    authNumber,
  } = useEmailAuthForm();

  const { requestAuthCodeMutation, verifyAuthMutation } = useEmailAuthRequest();

  const onSubmitEmail = () => {
    requestAuthCodeMutation({ userEmail, spaceId, setShowEnterAuth });
  };

  const onSubmitAuth = () => {
    verifyAuthMutation({ userEmail, authNumber, spaceId, setShowEnterAuth });
  };

  return (
    <div className="w-full">
      <div className="form-wrapper">
        <h1 className="form-title">건국대학교 학생 인증</h1>

        <main className="mt-6">
          {/* 이메일 입력 폼 */}
          <form
            onSubmit={handleSubmitEmail(onSubmitEmail)}
            className="mb-[6px] flex w-full flex-col items-center gap-2"
          >
            <div className="flex gap-2">
              <UserInput
                registerName="userEmail"
                placeholder="건국대학교 이메일을 입력해주세요"
                register={registerEmail}
                error={errorsEmail.userEmail}
                // rules={{
                //   required: '이메일을 입력해주세요.',
                //   pattern: {
                //     value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                //     message: '올바른 이메일 형식이 아닙니다.',
                //   },
                // }}
                width="24rem"
              />
              <button type="submit" className="form-button" disabled={!isValidEmail}>
                인증요청
              </button>
            </div>
          </form>

          {/* 인증번호 입력 폼 */}
          {showEnterAuth && (
            <form
              onSubmit={handleSubmitAuth(onSubmitAuth)}
              className="flex w-full flex-col items-center gap-2"
            >
              <div className="flex gap-2">
                <UserInput
                  registerName="authNumber"
                  type="number"
                  placeholder="인증번호를 입력해주세요"
                  register={registerAuth}
                  error={errorsAuth.authNumber}
                  rules={{
                    required: '인증번호를 입력해주세요.',
                  }}
                  width="24rem"
                />
                <button type="submit" className="form-button" disabled={!authNumber}>
                  인증확인
                </button>
              </div>
            </form>
          )}
        </main>

        <div className="mt-4 flex text-[1.2rem]">
          <button type="button" className="text-green-500 underline" onClick={() => navigate(-1)}>
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default KonkukStudentAuth;
