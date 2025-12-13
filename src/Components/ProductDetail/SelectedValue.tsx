import { ProdNav, type Reviews } from "../../type";
import { ReviewContainer } from "./ReviewContainer";
import { ReviewsViews } from "./ReviewsViews";

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
            3. If not empty, use ReviewsViews component to display reviews
            4. Always show ReviewContainer so users can add reviews
            
            LEARN MORE:
            - Empty states in UX: https://www.nngroup.com/articles/empty-state-ux/
            - Conditional rendering: https://react.dev/learn/conditional-rendering
            - User engagement patterns: https://www.interaction-design.org/literature/topics/user-engagement
            - Component composition: https://react.dev/learn/passing-props-to-a-component
          */}
          {reviews.length === 0 ? (
            <>
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center border-b border-gray-200">
                <p className="text-lg font-medium text-gray-700 mb-2">
                  No reviews yet
                </p>
                <p className="text-sm text-gray-500">
                  Be the first to review this product!
                </p>
              </div>
            </>
          ) : (
            <ReviewsViews reviews={reviews} title={title} />
          )}

          <ReviewContainer id={id} />
        </>
      );

    default:
      return null;
  }
};
