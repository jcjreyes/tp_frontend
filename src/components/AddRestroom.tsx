import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { Restrooms } from '../api/requests/Restrooms';

export default function AddRestroom({ building }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { building: building?.id } });

  useEffect(
    function changeFormBuilding() {
      reset({
        building: building?.id || '',
      });
    },
    [building, reset],
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await Restrooms.create(data);
      console.log('Bathroom created: ', response.data);
      reset();
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' {...register('name')} />
          {errors.name && (
            <p className='error-message'>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='restroom-desc'>Description:</label>
          <textarea id='restroom-desc' {...register('description')} />
          {errors.description && (
            <p className='error-message'>{errors.description.message}</p>
          )}
        </div>

        <button type='submit'>Add Restroom</button>
      </form>
    </>
  );
}
