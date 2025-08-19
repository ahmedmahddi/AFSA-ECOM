"use cient"

import { useState } from "react"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface StarPickerProps {
    value?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    className?: string;
}

export const StarPicker = ({
    value = 0,
    onChange,
    disabled,
    className
}: StarPickerProps) => {
    const [hoveredStar, setHoveredStar] = useState(0);

    return (
        <div className={cn("flex items-center", disabled && "opacity-50 cursor-not-allowed", className)}>
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={disabled}
                    className={cn("p-0.5 hover:scale-110 transition", !disabled && "cursor-pointer")}
                    onClick={() => onChange?.(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                >
                    <StarIcon className={cn(
                        "size-5",
                        (hoveredStar || value || 0) >= star ? "fill-yellow-400  stroke-black" : "stroke-black fill-muted ",
                    )} />

                </button>
            ))}
        </div>
    );
};