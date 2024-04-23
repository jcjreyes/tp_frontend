import { Rating } from 'react-simple-star-rating';

export default function Review({ author, score, text, restroom, images }) {
  return (
    <>
      <div className='review review-container'>
        <span className='review-author'>{author}</span>
        <Rating readonly={true} initialValue={score} allowFraction={true} />
        <span className='review-main'>{text}</span>
        {images?.map((image) => (
          <div>
            <img src={image.image}></img>
          </div>
        ))}
        {console.log(images)}
        {restroom && <span className='review-restroom'>{restroom}</span>}
      </div>
    </>
  );
}
