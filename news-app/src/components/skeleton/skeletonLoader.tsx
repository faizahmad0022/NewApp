"use client";

export default function CardSkeleton() {
  const lines = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
        {lines.map((index) => (
          <div
            key={index}
            className="flex flex-col w-full p-4 border border-gray-300 rounded-lg shadow-md animate-pulse bg-white"
          >
            <div className="h-48 w-full bg-gray-200 rounded-md mb-4"></div>

            <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>  
            <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
