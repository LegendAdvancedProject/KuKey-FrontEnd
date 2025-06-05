import { useNavigate } from 'react-router';
import UserInput from '../../shared/components/UserInput';
import { useEmailAuthForm } from './hooks/useAdminLoginForm';
import { useAdminLoginRequest } from './hooks/useAdminLoginRequest';

const AdminLogin = () => {
  const { register, handleSubmit, isValid, errors, id, password } = useEmailAuthForm();
  const { adminLoginMutation } = useAdminLoginRequest();

  const navigate = useNavigate();

  const onSubmitAdminLoginForm = () => {
    adminLoginMutation({ id, password });
  };

  return (
    <div className="w-full">
      <div className="form-wrapper">
        <h1 className="form-title">관리자 로그인</h1>

        <main className="mt-6">
          {/* 이메일 입력 폼 */}
          <form
            onSubmit={handleSubmit(onSubmitAdminLoginForm)}
            className="mb-[6px] flex w-full flex-col items-center gap-2"
          >
            <div className="flex gap-2">
              <UserInput
                registerName="id"
                placeholder="아이디를 입력해주세요"
                register={register}
                error={errors.id} // 각 필드(id, password)별로 유효성 검사(rules에 적용한 규칙)를 따로따로 적용 가능
                rules={{
                  required: '아이디를 입력해주세요.',
                }}
                width="370px"
              />
            </div>

            <div className="flex gap-2">
              <UserInput
                registerName="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                register={register}
                error={errors.password}
                rules={{
                  required: '비밀번호를 입력해주세요.',
                }}
                width="370px"
              />
            </div>

            <button type="submit" className="form-button w-[100px]" disabled={!isValid}>
              로그인
            </button>
          </form>
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

export default AdminLogin;
