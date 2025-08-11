import { ProdNav, type ProdDesc } from "../../type";

interface SelectedValueProps {
  prodDesc: ProdDesc[];
  value: ProdNav;
}

const SelectedValue = ({ prodDesc, value }: SelectedValueProps) => {
  const { description, reviews } = prodDesc[0];

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

export default SelectedValue;
