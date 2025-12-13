import { ProdNav, type Reviews } from "../../type";
import { RatingContainer } from "../shop/RatingContainer";
import defaultAvatar from "../../../public/default-avatar.jpg";

/**
 * ✅ FIXED: ReviewsViews component with proper props and imports
 * 
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original component had:
 * - No props interface - undefined variables (reviews, ProdNav, title, defaultAvatar, RatingContainer)
 * - Not imported anywhere - component was unused
 * - Broken code that would cause runtime errors
 * 
 * PROBLEMS:
 * 1. Undefined variables: Component tried to use variables that didn't exist
 * 2. No props: Component couldn't receive data from parent
 * 3. Missing imports: Required dependencies weren't imported
 * 4. Unused: Component was never integrated into the app
 * 
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Proper props interface: Component receives all needed data as props
 * - All imports included: ProdNav, Reviews type, RatingContainer, defaultAvatar
 * - Separation of concerns: Handles review list rendering, parent handles conditional logic
 * - Reusable: Can be used anywhere reviews need to be displayed
 * 
 * HOW IT WORKS:
 * 1. Receives reviews array, title, and ProdNav as props
 * 2. Displays review count and title in header
 * 3. Maps through reviews and displays each with avatar, rating, name, date, and comment
 * 4. Uses composite key (reviewerEmail + date) for stable React keys
 * 
 * LEARN MORE:
 * - React component props: https://react.dev/learn/passing-props-to-a-component
 * - Component composition: https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
 * - React keys: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
 */

interface ReviewsViewsProps {
  reviews: Reviews[];
  title: string;
}

export const ReviewsViews = ({ reviews, title }: ReviewsViewsProps) => {
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
          // LEARN MORE:
          // - React keys: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
          // - Component best practices: https://react.dev/learn/thinking-in-react
          const uniqueKey = `${reviewerEmail}-${date}`;
          return (
            <li key={uniqueKey} className="mt-5 flex gap-6">
              <div>
                <img
                  className="w-10 rounded-full"
                  src={defaultAvatar}
                  alt={`${reviewerName}'s avatar`}
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
    </>
  );
};
