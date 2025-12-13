import { Reviews } from "../type";

export interface ReviewSubmission {
  id: string;
  comment: string;
  author: string;
  email: string;
  saveUserInfo: boolean;
  rating?: number;
}

/**
 * Adds a review to a product
 * Note: dummyjson.com doesn't support review updates via API,
 * so this is a mock implementation that simulates the behavior.
 *
 * In a real app, this would use:
 * import axios from "axios";
 * import { API_URL } from "./apiUrl";
 * and POST to: `${API_URL}/${productId}/reviews`
 */
export const addProductReview = async (
  _productId: string,
  review: ReviewSubmission
): Promise<Reviews> => {
  // Since dummyjson doesn't support review updates, we'll simulate it
  // In a real app, this would POST/PUT to an endpoint like:
  // const response = await axios.post(`${API_URL}/${productId}/reviews`, review);
  // return response.data;

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return a formatted review matching the Reviews interface
  const newReview: Reviews = {
    rating: review.rating || 5,
    comment: review.comment,
    date: new Date().toISOString(),
    reviewerName: review.author,
    reviewerEmail: review.email,
  };

  // In a real implementation, this would be the API response
  // For now, we'll just return the formatted review
  // The actual persistence would happen on the backend
  return newReview;
};
