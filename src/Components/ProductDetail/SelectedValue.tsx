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
          
          {/* ✅ IMPLEMENTED: Empty state for no reviews */}
          {/*
            WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
            The original code always showed <ul>{reviews.map(...)}</ul> even when reviews.length === 0.
            This would show "0 Reviews" with an empty list, which is:
            - Confusing for users (they see "0 Reviews" but no explanation)
            - Poor UX (no feedback about why there are no reviews)
            - Unprofessional appearance
            
            WHY THE NEW IMPLEMENTATION WORKS:
            - Shows a clear, friendly message when no reviews exist
            - Provides helpful context (encourages users to be the first to review)
            - Better user experience with proper feedback
            - Still shows the review form so users can add the first review
            
            HOW IT WORKS:
            1. Check if reviews.length === 0
            2. If empty, show empty state message
            3. If not empty, show reviews list as before
            4. Always show ReviewContainer so users can add reviews
            
            LEARN MORE:
            - Empty states in UX: https://www.nngroup.com/articles/empty-state-ux/
            - Conditional rendering: https://react.dev/learn/conditional-rendering
            - User engagement patterns: https://www.interaction-design.org/literature/topics/user-engagement
          */}
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center border-b border-gray-200">
              <p className="text-lg font-medium text-gray-700 mb-2">No reviews yet</p>
              <p className="text-sm text-gray-500">Be the first to review this product!</p>
            </div>
          ) : (
            <ul>
              {reviews.map((item) => {
                const { date, reviewerName, comment, rating, reviewerEmail } = item;
                // ✅ FIXED: Changed from key={index} to key={uniqueKey} (composite key)
                //
                // WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
                // The original code used: key={index}
                //
                // PROBLEM: Same as with cart items - if reviews are filtered, sorted, or a review
                // is deleted, the indices change but the actual review data doesn't. React can't
                // tell which review is which, leading to:
                // - Wrong review data showing in wrong positions after filtering/sorting
                // - Unnecessary re-renders when only order changes
                // - Potential bugs if reviews have interactive elements (like "like" buttons)
                //
                // Example bug scenario:
                // 1. Reviews displayed: [Review A (index 0), Review B (index 1), Review C (index 2)]
                // 2. User filters to show only 5-star reviews, removing Review B
                // 3. React sees: "Item at index 1 changed from Review B to Review C"
                // 4. Review C gets re-rendered with Review B's data/state (if it had any)
                //
                // WHY COMPOSITE KEY IS CORRECT:
                // Since Reviews interface doesn't have a unique 'id' field, we create a composite
                // key from reviewerEmail + date. This combination is unique enough because:
                // - Same person (email) won't post multiple reviews at the exact same timestamp
                // - Even if they post multiple reviews, timestamps will differ
                // - This key stays stable even when reviews are filtered/sorted/reordered
                //
                // ALTERNATIVE APPROACHES (if this isn't unique enough):
                // 1. Add an 'id' field to the Reviews interface (BEST - do this if possible)
                // 2. Use a hash function: key={hash(reviewerEmail + date + comment)}
                // 3. Generate IDs on the backend when reviews are created
                //
                // LEARN MORE:
                // - React keys: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
                // - When you don't have IDs: https://react.dev/learn/rendering-lists#where-to-get-your-key
                const uniqueKey = `${reviewerEmail}-${date}`;
                return (
                  <li key={uniqueKey} className="mt-5 flex  gap-6">
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
          )}
          
          <ReviewContainer id={id} />
        </>
      );

    default:
      return null;
  }
};
