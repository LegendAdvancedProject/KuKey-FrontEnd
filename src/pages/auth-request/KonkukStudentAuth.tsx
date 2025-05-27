import { useEmailAuthForm } from './hooks/useEmailAuthForm';
import UserInput from '../../shared/components/UserInput';

const KonkukStudentAuth = () => {
  const {
    registerEmail,
    handleSubmitEmail,
    errorsEmail,
    isValidEmail,
    // userEmail,
    registerAuth,
    handleSubmitAuth,
    errorsAuth,
    authNumber,
    showEnterAuth,
    onSubmitEmail,
    onSubmitAuth,
    handleBack,
  } = useEmailAuthForm();

  return (
    <div className="w-full">
      <div className="form-wrapper">
        <h1 className="form-title">건국대학교 학생 인증</h1>

        <main className="mt-6">
          {/* 이메일 입력 폼 */}
          {!showEnterAuth && (
            <form
              onSubmit={handleSubmitEmail(onSubmitEmail)}
              className="flex w-full flex-col items-center gap-2"
            >
              <div className="flex gap-2">
                <UserInput
                  registerName="userEmail"
                  placeholder="건국대학교 이메일을 입력해주세요"
                  register={registerEmail}
                  error={errorsEmail.userEmail}
                  rules={{
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: '올바른 이메일 형식이 아닙니다.',
                    },
                  }}
                  width="24rem"
                />
                <button type="submit" className="form-button" disabled={!isValidEmail}>
                  학생 인증하기
                </button>
              </div>
            </form>
          )}

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
                  인증번호 입력
                </button>
              </div>
            </form>
          )}
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

export default KonkukStudentAuth;
