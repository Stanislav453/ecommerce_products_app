import React from "react";

const ReviewsViews = () => {
  return (
    <>
      <h6 className="text-2xl font-medium">
        {reviews.length} {ProdNav.Reviews} - {title}
      </h6>
      <ul>
        {reviews.map((item, index) => {
          const { date, reviewerName, comment, rating } = item;
          return (
            <>
              <li className="mt-5 flex  gap-6" key={index}>
                <div>
                  <img
                    className="w-10 rounded-full"
                    src={defaultAvatar}
                    alt="avatar"
                  />
                </div>
                <div>
                  <RatingContainer rating={rating} />
                  <p className="my-1">
                    {reviewerName} - {date}
                  </p>
                  <p>{comment}</p>
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default ReviewsViews;
