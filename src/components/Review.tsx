import { Rating } from 'react-simple-star-rating';

export default function Review({ author, score, text }) {
  return (
    <>
      <div className='review review-container'>
        <span className='review-author'>{author}</span>
        <Rating readonly={true} initialValue={score} allowFraction={true} />
        <span className='review-main'>{text}</span>
      </div>
    </>
  );
}
