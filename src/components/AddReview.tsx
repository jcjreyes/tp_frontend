import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function AddReview({ selectedRestroom }) {
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
      // const response = await Reviews.create(data);
      // console.log('Review created: ', response.data);
      // reset();
      console.log(data);
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
