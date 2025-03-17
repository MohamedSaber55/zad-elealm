import { useState } from "react";
import { Rnd } from "react-rnd";
import { Star1 } from "iconsax-react";

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { rating: number; }) => void;
}

const RatingModal = ({ isOpen, onClose, onSubmit }: RatingModalProps) => {
    const [rating, setRating] = useState(0);
    const [size, setSize] = useState({ width: 400, height: 250 });
    // Mapping for star descriptions
    const starDescriptions = {
        1: "ضعيف - غير راضٍ تمامًا",
        2: "مقبول - غير راضٍ إلى حد ما",
        3: "جيد - محايد",
        4: "جيد جدًا - راضٍ",
        5: "ممتاز - راضٍ جدًا",
    };

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
                    <div className="flex justify-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <Star1
                                key={num}
                                size={28}
                                color="currentColor"
                                className={num <= rating ? "text-warning" : "text-muted"}
                                variant={num <= rating ? "Bold" : "Linear"}
                                onClick={() => setRating(num)}
                            />
                        ))}
                    </div>
                    {/* Star Description */}
                    {rating > 0 ? (
                        <p className="text-center text-muted-dark mt-2">
                            {starDescriptions[rating as keyof typeof starDescriptions]}
                        </p>
                    ) :
                        <p className="text-center text-muted-dark mt-2">
                            أضف تقييمك
                        </p>}
                </div>
                {/* Buttons */}
                <div className="flex justify-end gap-4 p-3">
                    <button onClick={onClose} className="px-4 py-2 border border-muted-dark rounded-md text-muted-dark hover:bg-    ">إلغاء</button>
                    <button onClick={handleSubmit} className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">إرسال</button>
                </div>
            </Rnd >
        </div >
    ) : null;
};

export default RatingModal;
