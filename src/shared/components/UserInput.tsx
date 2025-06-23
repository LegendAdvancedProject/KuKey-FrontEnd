import type { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

type InputProps = {
  registerName: string; // register(name)에 사용
  label?: string;
  type?: string; // input 타입
  placeholder: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  rules?: RegisterOptions;
  width?: string;
};

const UserInput = ({
  registerName,
  label,
  type = 'text',
  placeholder,
  register,
  // error,
  rules,
}: InputProps) => {
  return (
    <div className="flex w-full flex-col items-start">
      {label && <label className="mb-[4px] text-[14px] font-[700] text-[#464A4D]">{label}</label>}
      <div className="w-full">
        <input
          type={type}
          placeholder={placeholder}
          {...register(registerName, rules)}
          className="w-full rounded-[8px] bg-white p-[13px] text-[14px] font-[400]"
        />
      </div>
      {/* {error && <p className="form-error mt-[4px]">{error.message}</p>} */}
    </div>
  );
};

export default UserInput;
