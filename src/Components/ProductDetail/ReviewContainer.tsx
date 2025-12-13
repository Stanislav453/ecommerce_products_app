import { useState } from "react";
import { useUpdateProductReview } from "../../queries/useUpdateProductReview";

type ReviewContainerProps = {
  id: string;
};

export const ReviewContainer = ({ id }: ReviewContainerProps) => {
  const [review, setReview] = useState({
    id: id,
    comment: "",
    author: "",
    email: "",
    saveUserInfo: false,
    rating: 5,
  });

  const { mutate, isPending, isError, isSuccess, error } =
    useUpdateProductReview(id);

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(review, {
      onSuccess: () => {
        // Reset form on success
        setReview({
          id: id,
          comment: "",
          author: "",
          email: "",
          saveUserInfo: false,
          rating: 5,
        });
      },
    });
  };

  return (
    <div>
      <h5>Add a review </h5>
      <p>
        Your email address will not be published. Required fields are marked *
      </p>
      {isSuccess && (
        <p className="text-green-600 mb-4">Review submitted successfully!</p>
      )}
      {isError && (
        <p className="text-red-600 mb-4">
          Failed to submit review: {error?.message || "Unknown error"}
        </p>
      )}
      <p>Your rating *</p>
      {/* ✅ IMPLEMENTED: Interactive star rating component (replaced "PLACEFOR RATING" placeholder) */}
      {/*
        WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
        The original code had: <div>PLACEFOR RATING</div>
        
        PROBLEMS:
        1. Placeholder text in production code - unprofessional
        2. No functionality - users couldn't actually rate products
        3. Incomplete feature - review submission would fail without rating
        4. Poor UX - confusing for users
        
        WHY THE NEW IMPLEMENTATION WORKS:
        - Interactive: Users can click stars to select rating (1-5)
        - Visual feedback: Selected stars are yellow, unselected are gray
        - Accessible: aria-label for screen readers
        - State management: Updates review.rating in component state
        - User-friendly: Shows current rating (e.g., "3 / 5")
        - Type-safe: Rating is stored as number in state
        
        HOW IT WORKS:
        1. Maps over [1,2,3,4,5] to create 5 star buttons
        2. Each star's color depends on if star <= review.rating
        3. Clicking a star updates review.rating via setReview
        4. Rating is included when form is submitted
        
        LEARN MORE:
        - React state updates: https://react.dev/learn/updating-objects-in-state
        - Event handlers: https://react.dev/learn/responding-to-events
        - Accessibility: https://react.dev/learn/accessibility
        - Controlled components: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
      */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setReview({ ...review, rating: star })}
            className={`text-2xl focus:outline-none transition-colors ${
              star <= review.rating ? "text-yellow-400" : "text-gray-300"
            }`}
            aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">{review.rating} / 5</span>
      </div>
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
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
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
            onChange={(e) => setReview({ ...review, author: e.target.value })}
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
            onChange={(e) => setReview({ ...review, email: e.target.value })}
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
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </p>
        <button
          className="bg-black text-white font-bold px-8 py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
