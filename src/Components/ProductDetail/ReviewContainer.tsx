import React, { useState } from "react";
import { putData } from "../../api/PutAction/putData";

export const ReviewContainer = () => {
    
  const [review, setReview] = useState({
    comment: "",
    author: "",
    email: "",
    saveUserInfo: false,
  });

  const handlerSubmit = (e: any) => {
    e.preventDefault();

    console.log("submit review");

    console.log(review);

    putData();
  };

  return (
    <div>
      <h5>Add a review </h5>
      <p>
        Your email adress will not be published. Required fields are marked *
      </p>
      <p>Your rating</p>
      <div>PLACEFOR RATING</div>
      <form className="mt-12" onSubmit={handlerSubmit}>
        <p className="flex flex-col">
          <label className="mb-3" htmlFor="comment">
            Your review *
          </label>
          <textarea
            className="p-5 bg-page-sections rounded-lg border border-theme-gray-border "
            name="comment"
            value={review.comment}
            cols={45}
            rows={8}
            minLength={5}
            maxLength={500}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            required
          />
        </p>
        <p className="flex flex-col mt-5">
          <label className="mb-3" htmlFor="author">
            Name *
          </label>
          <input
            className="w-full p-5 bg-page-sections rounded-lg border border-theme-gray-border "
            name="author"
            value={review.author}
            onChange={(e) => setReview({ ...review, author: e.target.value })}
            type="text"
            required
            size={30}
            minLength={3}
            maxLength={15}
          />
        </p>
        <p className="flex flex-col mt-5">
          <label className="mb-3" htmlFor="email">
            Email *
          </label>
          <input
            className="w-full p-5 bg-page-sections rounded-lg border border-theme-gray-border "
            name="email"
            value={review.email}
            onChange={(e) => setReview({ ...review, email: e.target.value })}
            type="email"
            required
            size={30}
            minLength={3}
            maxLength={15}
          />
        </p>
        <p className="flex gap-4 my-5 ">
          <input
            type="checkbox"
            checked={review.saveUserInfo}
            onChange={() =>
              setReview({ ...review, saveUserInfo: !review.saveUserInfo })
            }
          />
          <label htmlFor="">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </p>
        <button
          className="bg-black text-white font-bold px-8 py-4 rounded-2xl"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

