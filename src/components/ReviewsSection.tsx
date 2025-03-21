import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { addReply, deleteReply, deleteReview, getReviewReplies, toggleLikeReply, toggleLikeReview } from "../store/slices/reviews";
import { Heart, Trash } from "iconsax-react";
import avatarImage from "./../assets/avatar.png";
import { formatDateTime } from "../utils/formatDateTime";
import { Review } from "../interfaces";

const ReviewsSection = ({ reviews }: { reviews?: Review[] }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { loading } = useSelector((state: RootState) => state.reviews);
    const { token, userId } = useSelector((state: RootState) => state.auth);

    const [replyTextState, setReplyTextState] = React.useState<{ [key: number]: string }>({});
    const [repliesState, setRepliesState] = React.useState<{ [key: number]: any[] }>({});
    const [visibleReplies, setVisibleReplies] = React.useState<{ [key: number]: boolean }>({});
    const [likedReviews, setLikedReviews] = React.useState<{ [key: number]: boolean }>({});
    const [likedReplies, setLikedReplies] = React.useState<{ [key: number]: boolean }>({});

    // Toggle Like
    const toggleLike = (id: number) => {
        setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
        dispatch(toggleLikeReview({ reviewId: id, token: token! })).then((res) => {
            if ((res.payload as { statusCode: number }).statusCode !== 200) {
                setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
            }
        })
    };

    // Fetch replies for a specific review
    const fetchReplies = (id: number) => {
        setVisibleReplies((prev) => ({ ...prev, [id]: !prev[id] }));

        if (!repliesState[id]) {
            dispatch(getReviewReplies({ token: token!, reviewId: id })).then((response) => {
                const data = response.payload as { data: any[] };
                setRepliesState((prev) => ({ ...prev, [id]: data.data }));
            });
        }
    };

    // Add a reply to a specific review
    const handleAddReply = (reviewId: number) => {
        if (!replyTextState[reviewId]?.trim()) return;

        dispatch(addReply({ token: token!, body: replyTextState[reviewId], reviewId })).then(() => {
            setReplyTextState((prev) => ({ ...prev, [reviewId]: "" }));
            fetchReplies(reviewId);
        });
    };

    // Delete a specific reply
    const handleDeleteReply = (replyId: number, reviewId: number) => {
        dispatch(deleteReply({ token: token!, replyId })).then(() => {
            setRepliesState((prev) => ({
                ...prev,
                [reviewId]: prev[reviewId].filter((r) => r.id !== replyId),
            }));
        });
    };

    // Toggle Like
    const toggleLikeRepl = (id: number) => {
        setLikedReplies((prev) => ({ ...prev, [id]: !prev[id] }));
        dispatch(toggleLikeReply({ replyId: id, token: token! })).then((res) => {
            if ((res.payload as { statusCode: number }).statusCode !== 200) {
                setLikedReplies((prev) => ({ ...prev, [id]: !prev[id] }));
            }
        })
    };

    // Delete a review
    const handleDeleteReview = (reviewId: number) => {
        dispatch(deleteReview({ token: token!, reviewId }));
    };

    return (
        <div className="mt-5 bg-white dark:bg-dark-light rounded-xl p-5">
            <h3 className="text-2xl font-bold text-primary dark:text-primary-light mb-6">التقييمات</h3>

            {/* No Reviews Message */}
            {reviews?.length === 0 && (
                <p className="text-center text-muted-dark dark:text-muted">لا توجد تقييمات حتى الآن.</p>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews?.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-dark-lighter rounded-lg p-4 border border-muted dark:border-muted-dark">
                        {/* Review Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={review.imageUrl || avatarImage}
                                    alt={review.displayName}
                                    onError={(e) => {
                                        e.currentTarget.src = avatarImage;
                                    }}
                                    className="w-10 h-10 rounded-full object-cover border border-muted"
                                />
                                <div>
                                    <p className="font-semibold text-dark dark:text-light">{review.displayName}</p>
                                    <p className="text-xs text-muted-dark dark:text-muted">
                                        {formatDateTime(review?.createdAt || "", { isArabic: true, showDate: true, showTime: true })}
                                    </p>
                                </div>
                            </div>

                            {/* Delete Review Button */}
                            {review.appUserId === userId &&
                                <button
                                    onClick={() => handleDeleteReview(review.id)}
                                    className="text-danger hover:text-white border border-danger p-2 rounded-lg hover:bg-danger"
                                >
                                    <Trash color="currentColor" size="20" />
                                </button>
                            }
                        </div>

                        {/* Review Content */}
                        <p className="text-sm text-dark dark:text-light mt-2">{review.text}</p>

                        <div className="flex gap-2 items-center">

                            {/* Like Button */}
                            <button
                                onClick={() => toggleLike(review.id)}
                                className={`mt-2 flex items-center gap-1 text-sm ${likedReviews[review.id] ? "text-red-500" : "text-muted-dark dark:text-muted"} transition-colors`}
                            >
                                <Heart size="20" color={likedReviews[review.id] ? "red" : "currentColor"} variant={likedReviews[review.id] ? "Bold" : "Outline"} />
                                {likedReviews[review.id] ? "إلغاء الإعجاب" : "أعجبني"} ({review.likesCount})
                            </button>

                            {/* View Replies Button */}
                            <button
                                onClick={() => fetchReplies(review.id)}
                                className="text-primary dark:text-primary-light hover:underline mt-2 inline-block"
                            >
                                {visibleReplies[review.id] ? "إخفاء الردود" : `عرض الردود (${review.repliesCount})`}
                            </button>
                        </div>

                        {/* Replies Section */}
                        {visibleReplies[review.id] && (
                            <div className="mt-4 ml-4 space-y-3">
                                {loading ? (
                                    <p className="text-sm text-muted-dark dark:text-muted">جاري تحميل الردود...</p>
                                ) : !review.hasReplies ? (
                                    <p className="text-sm text-muted-dark dark:text-muted">لا توجد ردود حتى الآن.</p>
                                ) : (
                                    repliesState[review.id]?.map((reply) => (
                                        <div
                                            key={reply.id}
                                            className="flex justify-between items-center p-2 bg-gray-100 dark:bg-dark-lighter rounded-lg"
                                        >
                                            <div className="flex gap-2">
                                                <img
                                                    src={reply.imageUrl || avatarImage}
                                                    alt={reply.displayName}
                                                    onError={(e) => {
                                                        e.currentTarget.src = avatarImage;
                                                    }}
                                                    className="w-10 h-10 rounded-full object-cover border border-muted"
                                                />
                                                <div>
                                                    <p className="font-medium text-dark dark:text-light">{reply.displayName}</p>
                                                    <p className="text-sm text-muted-dark dark:text-muted">{reply.text}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {/* Like Button for Reply */}
                                                <button
                                                    onClick={() => toggleLikeRepl(reply.id)}
                                                    className={`flex items-center gap-1 text-sm ${likedReplies[reply.id] ? "text-red-500" : "text-muted-dark dark:text-muted"
                                                        } transition-colors`}
                                                >
                                                    <Heart
                                                        size="20"
                                                        color={likedReplies[reply.id] ? "red" : "currentColor"}
                                                        variant={likedReplies[reply.id] ? "Bold" : "Outline"}
                                                    />
                                                    {likedReplies[reply.id] ? "إلغاء الإعجاب" : "أعجبني"} ({reply.likesCount || 0})
                                                </button>
                                                {/* Delete Reply Button */}
                                                {reply.appUserId === userId && (
                                                    <button
                                                        onClick={() => handleDeleteReply(reply.id, review.id)}
                                                        className="text-danger hover:text-danger-dark text-xs flex items-center gap-1"
                                                    >
                                                        <Trash color="currentColor" size="20" />
                                                        حذف
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Add Reply Input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                value={replyTextState[review.id] || ""}
                                onChange={(e) =>
                                    setReplyTextState((prev) => ({ ...prev, [review.id]: e.target.value }))
                                }
                                placeholder="أضف رد..."
                                className="w-full p-2 border border-muted rounded-md focus:outline-none focus:border-primary dark:bg-dark-lighter dark:text-light"
                            />
                            <button
                                onClick={() => handleAddReply(review.id)}
                                className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                            >
                                إضافة رد
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsSection;
