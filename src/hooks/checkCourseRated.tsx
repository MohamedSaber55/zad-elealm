import { AppDispatch } from '../store/store';
import { checkIfUserMakeReviewBefore } from '../store/slices/reviews';

// Define the type for the arguments
interface CheckCourseRatedArgs {
    courseId: number;
    token: string | null;
    dispatch: AppDispatch;
}

/**
 * Service to check if a user has rated a course.
 * @param args - Object containing courseId, token, and dispatch.
 * @returns A promise that resolves to a boolean indicating if the course is rated.
 */
export const checkCourseRated = async ({ courseId, token, dispatch }: CheckCourseRatedArgs): Promise<boolean> => {
    if (!token) {
        // If no token is provided, the user is not authenticated, so return false
        return false;
    }

    try {
        // Dispatch the action to check if the user has made a review before
        const result = await dispatch(checkIfUserMakeReviewBefore({ reviewId: courseId, token })).unwrap();
        console.log(result);
        
        // Assuming the result contains a property indicating whether the course is rated
        // return !!result?.rated; // Adjust this based on your actual API response structure
        return result; // Adjust this based on your actual API response structure
    } catch (error) {
        console.error('Error while checking if the course is rated:', error);
        return false; // Return false in case of an error
    }
};