import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { Reviews } from '../api/requests/Reviews';
import { Box, Button, Fab, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

      // here because I'm blind and can't find where the data in the formData is
      //   const formDataObj = {};
      //   for (let [key, value] of formData.entries()) {
      //       formDataObj[key] = value;
      //   }
      //   console.log(formDataObj);

      reset();
      handleClose();

      if (onAdd) {
        onAdd();
      }
    } catch (e) {
      console.error('Error: ', e.response);
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 16,
  };

  return (
    <>
      <Button onClick={handleOpen} variant={'contained'}>
        Leave Review
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div>
          <Box sx={style}>
            <h2>Post Review</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ marginBottom: '20px' }}>
                {/*<label htmlFor='content'>Content:</label>*/}
                {/*<textarea id='content' {...register('content')} />*/}
                {/*{errors.content && (*/}
                {/*    <p className='error-message'>{errors.content.message}</p>*/}
                {/*)}*/}
                <TextField
                  id='content'
                  label='What do you think about this restroom?'
                  multiline
                  rows={4}
                  sx={{ width: '100%' }}
                  {...register('content')}
                />
                {errors.content && (
                  <p className='error-message'>{errors.content.message}</p>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                {/*<label htmlFor='rating'>Rating:</label>*/}
                <Typography component='legend'>Rating</Typography>
                <Rating transition={true} onClick={handleStar} />
                {errors.rating?.rating && (
                  <p className='error-message'>
                    {errors.rating.rating.message}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                {/*<label htmlFor='images'>Images:</label>*/}
                {/*<li>*/}
                <Typography component='legend'>Images</Typography>

                <div style={{ position: 'relative', marginTop: '20px' }}>
                  <Fab
                    size='small'
                    color='primary'
                    aria-label='add'
                    onClick={() => append({ image: '' })}
                    style={{
                      position: 'absolute',
                      right: '0',
                      bottom: '0',
                      marginRight: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </div>

                {fields.map((field, index) => {
                  return (
                    <div className='form-control' key={field.id}>
                      <input
                        type='file'
                        {...register(`images.${index}` as const)}
                      />
                      {index >= 0 && (
                        // <button type='button' onClick={() => remove(index)}>
                        //     Remove Photo
                        // </button>
                        <Button variant='text' onClick={() => remove(index)}>
                          Remove Photo
                        </Button>
                      )}
                    </div>
                  );
                })}
                {/*<div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>*/}
                {/*<button type='button' onClick={() => append({image: ''})}>*/}
                {/*    Add Photo*/}
                {/*</button>*/}
                {/*<Button variant="text" onClick={() => append({image: ''})}>*/}
                {/*    Add Photo*/}
                {/*</Button>*/}
                {/*</div>*/}
                {/*</li>*/}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '40px',
                }}
              >
                {/*<button type='submit'>Submit Review</button>*/}
                <Button type='submit' variant='contained'>
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </div>
      </Modal>
    </>
  );
}
