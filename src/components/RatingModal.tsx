import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { Star1 } from "iconsax-react";

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { rating: number }) => void;
}

const RatingModal = ({ isOpen, onClose, onSubmit }: RatingModalProps) => {
    const [rating, setRating] = useState(0);
    const [size, setSize] = useState({ width: 350, height: 250 });
    const [position, setPosition] = useState({ x: 0, y: 150 });

    // Mapping for star descriptions
    const starDescriptions = {
        1: "ضعيف - غير راضٍ تمامًا",
        2: "مقبول - غير راضٍ إلى حد ما",
        3: "جيد - محايد",
        4: "جيد جدًا - راضٍ",
        5: "ممتاز - راضٍ جدًا",
    };

    useEffect(() => {
        if (isOpen) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            setPosition({
                x: Math.max((screenWidth - size.width) / 2, 10),
                y: Math.max((screenHeight - size.height) / 3, 10),
            });
        }
    }, [isOpen, size.width, size.height]);

    const handleSubmit = () => {
        if (rating > 0) {
            onSubmit({ rating });
            setRating(0);
            onClose();
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <Rnd
                position={position}
                default={{ x: position.x, y: position.y, width: size.width, height: size.height }}
                minWidth={300}
                minHeight={250}
                maxWidth={600}
                maxHeight={450}
                bounds="window"
                enableResizing={{ bottomRight: true }}
                onResizeStop={(_e, _direction, ref) => setSize({ width: ref.offsetWidth, height: ref.offsetHeight })}
                className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg flex justify-center items-center flex-col border border-muted-green dark:border-muted-dark"
            >
                {/* Drag Header */}
                <div className="cursor-move p-3 bg-greenish-gray dark:bg-primary/50 rounded-t-lg">
                    <h3 className="text-xl font-bold text-primary-dark dark:text-greenish-gray font-cairo">أضف تقييمك</h3>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col my-3">
                    <div className="flex justify-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <Star1
                                key={num}
                                size={28}
                                color="currentColor"
                                className={num <= rating ? "text-warning" : "text-muted-dark dark:text-muted"}
                                variant={num <= rating ? "Bold" : "Linear"}
                                onClick={() => setRating(num)}
                            />
                        ))}
                    </div>
                    {/* Star Description */}
                    <p className="text-center text-muted-dark dark:text-muted mt-2">
                        {rating > 0 ? starDescriptions[rating as keyof typeof starDescriptions] : "أضف تقييمك"}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-muted-dark dark:border-muted dark:text-muted rounded-md text-muted-dark"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2 bg-primary dark:bg-primary-light text-white rounded-md hover:bg-primary-dark"
                        disabled={rating === 0}
                    >
                        إرسال
                    </button>
                </div>
            </Rnd>
        </div>
    ) : null;
};

export default RatingModal;
