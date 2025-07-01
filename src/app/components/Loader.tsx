const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-gray-200 border-t-blue-600 h-10 w-10 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Loader;
