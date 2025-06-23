import { useForm } from 'react-hook-form';

type SpaceReserveFormInputs = {
  studentId: number;
  name: string;
  group: string;
  purpose: string;
};

export const useSpaceReserveForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SpaceReserveFormInputs>({ mode: 'onChange' });

  const studentId = watch('studentId');
  const name = watch('name');
  const group = watch('group');
  const purpose = watch('purpose');

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    studentId,
    name,
    group,
    purpose
  };
};
