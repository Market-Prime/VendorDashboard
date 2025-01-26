import React from "react";

const SidebarSkeleton = () => {
    return (
        <div className="w-64 h-[90%] bottom-0 fixed left-0 bg-gray-100 p-4">
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-6 py-2">
                    {Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        ))}
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarSkeleton;
