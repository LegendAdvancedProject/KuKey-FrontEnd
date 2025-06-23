import UserInput from '../../shared/components/UserInput';
import { useLocation } from 'react-router';
import { useEmailAuthForm } from './hooks/useEmailAuthForm';
import { useEmailAuthRequest } from './hooks/useEmailAuthRequest';
import { useState } from 'react';
import CustomModal from '../../shared/components/CustomModal';
import Header2 from '../../shared/components/Header2';

const KonkukStudentAuth = () => {
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

  const {
    isModalOpen,
    modalContent,
    modalCloseHandler,
    modalConfirmHandler,
    showCancelButton,
    requestAuthCodeMutation,
    verifyAuthMutation,
  } = useEmailAuthRequest();

  const onSubmitEmail = () => {
    requestAuthCodeMutation({ userEmail, spaceId, setShowEnterAuth });
  };

  const onSubmitAuth = () => {
    verifyAuthMutation({ userEmail, authNumber, spaceId, setShowEnterAuth });
  };

  return (
    <div className="w-full">
      <Header2 headerContent="예약하기" />

      <div className="flex flex-col items-start px-[16px] pt-[50px] pb-[24px]">
        <span className="text-[22px] font-[600] text-black">건국대학교 학생인증</span>
        <span className="text-[14px] font-[500] text-[#7D7D7D]">
          건국대학교 이메일로 전송된 인증번호를 입력해주세요.
        </span>
      </div>

      <div className="w-full px-[16px] pt-[16px] pb-[50px]">
        <form
          onSubmit={handleSubmitEmail(onSubmitEmail)}
          className="flex w-full flex-col items-start gap-2"
        >
          <span className="mb-[4px] text-[14px] font-[700] text-[#464A4D]">이메일</span>
          {/* UserInput과 '인증번호 요청' 버튼 absolute 정렬을 위해 위 label만 별도로 선언... */}

          <div className="relative w-full">
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
            />
            <button
              type="submit"
              className={`absolute top-1/2 right-[13px] -translate-y-1/2 text-[12px] font-[600] ${
                !isValidEmail ? 'text-[#7D7D7D]' : 'text-[#217446]'
              }`}
              disabled={!isValidEmail}
            >
              인증번호 요청
            </button>
          </div>
        </form>

        {/* 인증번호 입력 폼 */}
        {showEnterAuth && (
          <form
            onSubmit={handleSubmitAuth(onSubmitAuth)}
            className="mt-[20px] flex w-full flex-col items-start gap-2"
          >
            <span className="mb-[4px] text-[14px] font-[700] text-[#464A4D]">인증번호</span>
            <div className="flex w-full gap-2">
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
            </div>

            <button
              type="submit"
              className={`mt-[49px] w-full rounded-[10px] py-[12px] text-center text-[16px] font-[600] text-white ${!authNumber ? 'bg-[#E6E6E6]' : 'bg-[#217446]'}`}
              disabled={!authNumber}
            >
              개방요청하기
            </button>
          </form>
        )}
      </div>

      <CustomModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={modalCloseHandler}
        onConfirm={modalConfirmHandler}
        showCancelButton={showCancelButton}
      />
    </div>
  );
};

export default KonkukStudentAuth;
