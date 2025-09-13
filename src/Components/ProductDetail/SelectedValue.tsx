import { ProdNav, type Reviews } from "../../type";
import { RatingContainer } from "../Shop/RatingContainer";
import defaultAvatar from "../../../public/default-avatar.jpg";
import { useState } from "react";

interface SelectedValueProps {
  title: string;
  value: ProdNav;
  description: string;
  reviews: Reviews[];
}

export const SelectedValue = ({
  title,
  description,
  reviews,
  value,
}: SelectedValueProps) => {
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
  };

  switch (value) {
    case ProdNav.Description:
      return (
        <>
          <h6 className="text-2xl font-medium">{ProdNav.Description}</h6>
          <p className="mt-4">{description}</p>
        </>
      );
    case ProdNav.Reviews:
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
          <div>
            <h5>Add a review </h5>
            <p>
              Your email adress will not be published. Required fields are
              marked *
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
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
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
                  onChange={(e) =>
                    setReview({ ...review, author: e.target.value })
                  }
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
                  onChange={(e) =>
                    setReview({ ...review, email: e.target.value })
                  }
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
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </label>
              </p>
              <button className="bg-black text-white font-bold px-8 py-4 rounded-2xl" type="submit">Submit</button>
            </form>
          </div>
        </>
      );

    default:
      null;
  }
};
