import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { Reviews } from '../api/requests/Reviews';

export default function AddReview({ selectedRestroom, onAdd }) {
  const [ratingVal, setRatingVal] = useState(0);

  const form = useForm<Inputs>({
    defaultValues: {
      restroom: selectedRestroom?.id,
      rating: { rating: ratingVal },
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({ name: 'images', control });

  useEffect(
    function changeFormRestroom() {
      reset({
        restroom: selectedRestroom?.id || '',
        rating: { rating: ratingVal || 0 },
      });
    },
    [selectedRestroom, ratingVal, reset],
  );

  const handleStar = (val) => {
    setRatingVal(val);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const formData = new FormData();
      const images = data?.images;
      if (images) {
        images.forEach((image, index) => {
          formData.append(`images[${index}]image`, image[0]);
          console.log(image[0]);
        });
      }

      formData.append('restroom', data?.restroom);
      formData.append('rating.rating', parseFloat(ratingVal));
      formData.append('content', data?.content);

      console.log(formData);
      const response = await Reviews.create(formData);
      console.log('Review created: ', response.data);
      console.log(response);
      reset();

      if (onAdd) {
        onAdd();
      }
    } catch (e) {
      console.error('Error: ', e.response);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='content'>Content:</label>
          <textarea id='content' {...register('content')} />
          {errors.content && (
            <p className='error-message'>{errors.content.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='rating'>Rating:</label>
          <Rating transition={true} onClick={handleStar} />
          {errors.rating?.rating && (
            <p className='error-message'>{errors.rating.rating.message}</p>
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
        <button type='submit'>Submit Review</button>
      </form>
    </>
  );
}
