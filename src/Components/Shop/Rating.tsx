import starsRating from "../../../public/5-stars-rating.svg"


export const Rating = () => {
  return (
    <div className="flex justify-center">
      <img className="w-32" src={starsRating} alt="stars-rating" />
    </div>
  );
};

