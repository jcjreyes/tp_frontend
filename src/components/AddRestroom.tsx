import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { Restrooms } from '../api/requests/Restrooms';

export default function AddRestroom({ building }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { building: building?.id } });

  const { fields, append, remove } = useFieldArray({ name: 'images', control });

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
      // console.log(data);
      const formData = new FormData();
      const images = data?.images;

      if (images) {
        images.forEach((image, index) => {
          formData.append(`images[${index}]image`, image[0]);
          console.log(image[0]);
        });
      }

      formData.append('name', data?.name);
      formData.append('description', data?.description);
      formData.append('building', data?.building);
      console.log(formData);
      const response = await Restrooms.create(formData);
      console.log(response);
      reset();
    } catch (e) {
      console.error('Error: ', e.response);
    }
  };

  return (
    <>
      {building && <span>Add a restroom to {building.name}:</span>}
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

        <div>
          <label htmlFor='images'>Images:</label>
          <li>
            {fields.map((field, index) => {
              return (
                <div className='form-control' key={field.id}>
                  <input
                    type='file'
                    {...register(`images.${index}` as const)}
                  />
                  {index >= 0 && (
                    <button type='button' onClick={() => remove(index)}>
                      Remove Photo
                    </button>
                  )}
                </div>
              );
            })}
            <button type='button' onClick={() => append({ image: '' })}>
              Add Photo
            </button>
          </li>
        </div>
        <button type='submit'>Add Restroom</button>
      </form>
    </>
  );
}
