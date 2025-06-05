import { useForm } from 'react-hook-form';

type AdminLoginFormInputs = {
  id: string;
  password: string;
};

export const useEmailAuthForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<AdminLoginFormInputs>({ mode: 'onChange' });

  const id = watch('id');
  const password = watch('password');

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    id,
    password,
  };
};
