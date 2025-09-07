import { Cover } from "../Cover";
import { RatingIcon } from "../RatingIcon";

type RatingProps = { rating: number; className?: string };

export const RatingContainer = ({ rating, className }: RatingProps) => {
  const percentage = 100 - Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div className={`w-full flex ${className} `}>
      <div className="relative  whitespace-nowrap">
        <RatingIcon />
        <Cover percentage={percentage} />
      </div>
    </div>
  );
};
