export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
        Loading employees...
      </p>
    </div>
  );
};
