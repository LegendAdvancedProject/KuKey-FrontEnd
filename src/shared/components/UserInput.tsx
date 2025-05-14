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
  error,
  rules,
  width,
}: InputProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      {label && <label className="text-[1.3rem]">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        {...register(registerName, rules)}
        className="form-input"
        style={{ width: `${width}` }}
      />
      {error && <p className="form-error">{error.message}</p>}
    </div>
  );
};

export default UserInput;
