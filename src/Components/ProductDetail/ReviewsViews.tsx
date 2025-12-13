import React from "react";

const ReviewsViews = () => {
  return (
    <>
      <h6 className="text-2xl font-medium">
        {reviews.length} {ProdNav.Reviews} - {title}
      </h6>
      <ul>
        {reviews.map((item) => {
          const { date, reviewerName, comment, rating, reviewerEmail } = item;
          // ✅ FIXED: Changed from key={index} to key={uniqueKey} (composite key)
          //
          // WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
          // The original code used: key={index}
          //
          // PROBLEM: Same issue as in SelectedValue.tsx - using index as key breaks when
          // reviews are filtered, sorted, or removed. React can't track which review is which,
          // causing incorrect rendering and potential state bugs.
          //
          // WHY COMPOSITE KEY IS CORRECT:
          // Reviews don't have unique IDs, so we use reviewerEmail + date as a composite key.
          // This creates a stable identifier that doesn't change when the list is reordered.
          //
          // NOTE: This component appears to have other issues (undefined variables:
          // reviews, ProdNav, title, defaultAvatar, RatingContainer). Consider fixing
          // those or removing this component if it's unused.
          //
          // LEARN MORE:
          // - React keys: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
          // - Component best practices: https://react.dev/learn/thinking-in-react
          const uniqueKey = `${reviewerEmail}-${date}`;
          return (
            <>
              <li className="mt-5 flex  gap-6" key={uniqueKey}>
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
