import { ProdNav, type Reviews } from "../../type";
import { RatingContainer } from "../shop/RatingContainer";
import defaultAvatar from "../../../public/default-avatar.jpg";
import { ReviewContainer } from "./ReviewContainer";

interface SelectedValueProps {
  id: string;
  title: string;
  value: ProdNav;
  description: string;
  reviews: Reviews[];
}

export const SelectedValue = ({
  id,
  title,
  description,
  reviews,
  value,
}: SelectedValueProps) => {
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
                <li key={index} className="mt-5 flex  gap-6">
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
              );
            })}
          </ul>
          <ReviewContainer id={id} />
        </>
      );

    default:
      return null;
  }
};
