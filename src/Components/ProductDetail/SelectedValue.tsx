import { ProdNav, type Reviews } from "../../type";
import { RatingContainer } from "../Shop/RatingContainer";
import defaultAvatar from "../../../public/default-avatar.jpg";

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
  switch (value) {
    case ProdNav.Description:
      return (
        <div>
          <h6 className="text-2xl font-medium">{ProdNav.Description}</h6>
          <p className="mt-4">{description}</p>
        </div>
      );
    case ProdNav.Reviews:
      return (
        <div>
          <h6 className="text-2xl font-medium">
            {reviews.length} {ProdNav.Reviews} -   {title}
          </h6>
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
        </div>
      );

    default:
      null;
  }
};
