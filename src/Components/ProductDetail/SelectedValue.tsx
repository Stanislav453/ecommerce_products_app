import { ProdNav, type Reviews } from "../../type";

interface SelectedValueProps {
  value: ProdNav;
  description: string;
  reviews: Reviews[];
}

export const SelectedValue = ({
  description,
  reviews,
  value,
}: SelectedValueProps) => {

  switch (value) {
    case ProdNav.Description:
      return <div>{description}</div>;
    case ProdNav.Reviews:
      return reviews.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.date}</p>
            <p>{item.reviewerName}</p>
            <p>{item.reviewerEmail}</p>
            <p>{item.comment}</p>
            <p>{item.rating}</p>
          </div>
        );
      });
    default:
      null;
  }
};
