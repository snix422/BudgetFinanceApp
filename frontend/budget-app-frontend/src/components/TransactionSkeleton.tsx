type TransactionSkeletonProps = {
  lines: number;
  height?: number;
};

const TransactionSkeleton: React.FC<TransactionSkeletonProps> = ({ lines, height }) => {
  return (
    <>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className='animate-pulse bg-gray-300 rounded-lg mb-2 w-full h-[5vh]'
          style={{ height: `${height} vw` }}
        ></div>
      ))}
    </>
  );
};

export default TransactionSkeleton;
