type BudgetsSkeletonProps = {
  lines: number;
  height: number;
};

const BudgetsSkeleton: React.FC<BudgetsSkeletonProps> = ({ lines, height }) => {
  return (
    <>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className='animate-pulse bg-gray-300 rounded-lg mb-2 w-1/4 max-sm:w-[80vw]'
          style={{ height: `${height}px` }}
        ></div>
      ))}
    </>
  );
};

export default BudgetsSkeleton;
