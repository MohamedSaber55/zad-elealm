import { useState } from "react";
import { Rnd } from "react-rnd";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { rating: number; reviewText: string }) => void;
}

const ReviewModal = ({ isOpen, onClose, onSubmit }: ReviewModalProps) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [size, setSize] = useState({ width: 400, height: 250 });

    const handleSubmit = () => {
        if (rating > 0 && reviewText.trim()) {
            onSubmit({ rating, reviewText });
            setRating(0);
            setReviewText("");
            onClose();
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <Rnd
                default={{ x: 500, y: 150, width: size.width, height: size.height }}
                minWidth={350}
                minHeight={250}
                maxWidth={600}
                maxHeight={450}
                bounds="window"
                enableResizing={{ bottomRight: true }}
                onResizeStop={(_e, _direction, ref) => setSize({ width: ref.offsetWidth, height: ref.offsetHeight })}
                className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center flex-col border border-muted-green"
            >
                {/* Drag Header */}
                <div className="cursor-move p-3 bg-greenish-gray rounded-t-lg">
                    <h3 className="text-xl font-bold text-primary-dark font-cairo">أضف تقييمك</h3>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col p-3">
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="اكتب رأيك عن الدورة..."
                        className="w-full border border-muted-green p-2 rounded-md bg-light focus:ring-2 focus:ring-primary-light"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 p-3">
                    <button onClick={onClose} className="px-4 py-2 border border-muted-dark rounded-md text-muted-dark hover:bg-    ">إلغاء</button>
                    <button onClick={handleSubmit} className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">إرسال</button>
                </div>
            </Rnd>
        </div>
    ) : null;
};

export default ReviewModal;
