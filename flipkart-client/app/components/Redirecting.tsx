"use client";

interface RedirectingProps {
    message?: string;
}

const Redirecting: React.FC<RedirectingProps> = ({ message = "Redirecting..." }) => {
    return (
        <div className="
            fixed
            inset-0
            z-50
            flex 
            flex-col 
            items-center 
            justify-center 
            bg-white/80 
            backdrop-blur-sm
        ">
            {/* Spinner Animation */}
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="
                    w-16 
                    h-16 
                    border-4 
                    border-slate-200 
                    rounded-full
                "></div>
                {/* Inner Spinning Ring */}
                <div className="
                    absolute 
                    w-16 
                    h-16 
                    border-4 
                    border-slate-800 
                    border-t-transparent 
                    rounded-full 
                    animate-spin
                "></div>
            </div>

            {/* Message Text */}
            <p className="mt-4 text-lg font-medium text-slate-700 animate-pulse">
                {message}
            </p>
        </div>
    );
};

export default Redirecting;