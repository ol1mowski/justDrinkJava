export const PostContentSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>

      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>

      <div className="h-6 bg-gray-200 rounded-lg w-2/3 mt-8"></div>

      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      <div className="space-y-2 ml-4">
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-3/5"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg space-y-2">
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      <div className="border-l-4 border-gray-300 bg-gray-50 px-4 py-3 rounded-r-lg">
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>

      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};
