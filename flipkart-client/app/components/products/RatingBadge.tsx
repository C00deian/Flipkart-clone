import { FaStar } from "react-icons/fa";

interface RatingBadgeProps {
    rating: number;
    reviewCount: number;
}

const RatingBadge = ({ rating, reviewCount }: RatingBadgeProps) => {
    if (!rating) return null;

    return (
        <div className="flex items-center gap-2 text-sm">
            {/* Rating badge */}
            <div className="
        flex items-center gap-1
        bg-green-600 text-white
        px-2 py-0.5
        rounded-sm
        text-xs font-semibold
      ">
                <span>{rating.toFixed(1)}</span>
                <FaStar size={10} fill="white" stroke="white" />
            </div>

            {/* Review count */}
            <span className="text-xs text-gray-500">
                ({reviewCount})
            </span>
        </div>
    );
};

export default RatingBadge;
