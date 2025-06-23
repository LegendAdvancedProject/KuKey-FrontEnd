import UserInput from '../../shared/components/UserInput';
import { useEmailAuthForm } from './hooks/useAdminLoginForm';
import { useAdminLoginRequest } from './hooks/useAdminLoginRequest';
import Header2 from '../../shared/components/Header2';
import CustomModal from '../../shared/components/CustomModal';

const AdminLogin = () => {
  const { register, handleSubmit, isValid, errors, id, password } = useEmailAuthForm();
  const { isModalOpen, setIsModalOpen, adminLoginMutation } = useAdminLoginRequest();

  const onSubmitAdminLoginForm = () => {
    adminLoginMutation({ id, password });
  };

  return (
    <div className="w-full">
      <Header2 headerContent="관리자 로그인" />

      <div className="flex flex-col items-start px-[16px] pt-[50px] pb-[24px]">
        <span className="text-[22px] font-[600] text-black">관리자 로그인</span>
        <span className="text-[14px] font-[500] text-[#7D7D7D]">
          관리자 아이디와 비밀번호를 입력해주세요.
        </span>
      </div>

      <div className="w-full px-[16px] pt-[16px] pb-[50px]">
        <form
          onSubmit={handleSubmit(onSubmitAdminLoginForm)}
          className="flex w-full flex-col items-start gap-[20px]"
        >
          <div className="w-full">
            <UserInput
              registerName="id"
              placeholder="아이디를 입력해주세요"
              label="아이디"
              register={register}
              error={errors.id} // 각 필드(id, password)별로 유효성 검사(rules에 적용한 규칙)를 따로따로 적용 가능
              rules={{
                required: '아이디를 입력해주세요.',
              }}
            />
          </div>

          <div className="w-full">
            <UserInput
              registerName="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              register={register}
              error={errors.password}
              rules={{
                required: '비밀번호를 입력해주세요.',
              }}
            />
          </div>

          <button
            type="submit"
            className={`mt-[49px] w-full rounded-[10px] py-[12px] text-center text-[16px] font-[600] text-white ${!isValid ? 'bg-[#E6E6E6]' : 'bg-[#217446]'}`}
            disabled={!isValid}
          >
            로그인
          </button>
        </form>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        content="인증정보를 찾을 수 없습니다."
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        showCancelButton={false}
      />
    </div>
  );
};

export default AdminLogin;
