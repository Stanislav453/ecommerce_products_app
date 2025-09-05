import { Cover } from "../Cover";
import { RatingIcon } from "../RatingIcon";

type RatingProps = { rating: number };

export const RatingContainer = ({ rating }: RatingProps) => {
  const percentage = 100 - Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div className=" w-full flex justify-center  ">
      <div className="relative  whitespace-nowrap">
        <RatingIcon />
        <Cover percentage={percentage} />
      </div>
    </div>
  );
};
