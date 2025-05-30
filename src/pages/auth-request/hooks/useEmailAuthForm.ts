import { useForm } from 'react-hook-form';

export const useEmailAuthForm = () => {
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    watch: watchEmail,
    formState: { errors: errorsEmail, isValid: isValidEmail },
  } = useForm<{ userEmail: string }>({ mode: 'onChange' });

  const {
    register: registerAuth,
    handleSubmit: handleSubmitAuth,
    watch: watchAuth,
    formState: { errors: errorsAuth },
  } = useForm<{ authNumber: number }>({ mode: 'onChange' });

  const userEmail = watchEmail('userEmail');
  const authNumber = watchAuth('authNumber');

  return {
    registerEmail,
    handleSubmitEmail,
    errorsEmail,
    isValidEmail,

    registerAuth,
    handleSubmitAuth,
    errorsAuth,

    userEmail,
    authNumber,
  };
};
