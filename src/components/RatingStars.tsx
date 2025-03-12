// import { useState } from "react";
// import { Star1 } from "iconsax-react";

// interface RatingStarsProps {
//     totalStars?: number;
//     onRatingSelect?: (rating: number) => void;
// }

// const RatingStars: React.FC<RatingStarsProps> = ({ totalStars = 5, onRatingSelect }) => {
//     const [rating, setRating] = useState<number>(0);
//     const [hover, setHover] = useState<number>(0);

//     return (
//         <div className="flex space-x-1">
//             {[...Array(totalStars)].map((_, index) => {
//                 const starValue = index + 1;
//                 return (
//                     <button
//                         key={index}
//                         onClick={() => {
//                             setRating(starValue);
//                             onRatingSelect?.(starValue);
//                         }}
//                         onMouseEnter={() => setHover(starValue)}
//                         onMouseLeave={() => setHover(0)}
//                         className="focus:outline-none"
//                     >
//                         <Star1
//                             size="32"
//                             color={starValue <= (hover || rating) ? "#facc15" : "#d1d5db"}
//                             variant="Bulk"
//                         />
//                     </button>
//                 );
//             })}
//         </div>
//     );
// };

// export default RatingStars;


import { useState } from "react";
import { Star1 } from "iconsax-react";

interface RatingStarsProps {
    totalStars?: number;
    initialRating?: number;
    allowSelection?: boolean;
    onRatingSelect?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
    totalStars = 5,
    initialRating = 5,
    allowSelection = false,
    onRatingSelect,
}) => {
    const [rating, setRating] = useState<number>(initialRating);
    const [hover, setHover] = useState<number>(0);

    return (
        <div className="flex space-x-1">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        key={index}
                        onClick={() => {
                            if (!allowSelection) return;
                            setRating(starValue);
                            onRatingSelect?.(starValue);
                        }}
                        onMouseEnter={() => allowSelection && setHover(starValue)}
                        onMouseLeave={() => allowSelection && setHover(0)}
                        className="focus:outline-none"
                        disabled={!allowSelection} // Disable button in read-only mode
                    >
                        <Star1
                            size="24"
                            color="currentColor"
                            className={starValue <= (hover || rating) ? "text-warning" : "text-muted"}
                            variant="Bulk"
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default RatingStars;
