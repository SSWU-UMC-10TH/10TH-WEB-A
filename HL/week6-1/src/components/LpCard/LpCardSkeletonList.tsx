import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletonListProps {
  count?: number;
}

const LpCardSkeletonList = ({ count = 8 }: LpCardSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <LpCardSkeleton key={i} />
      ))}
    </>
  );
};

export default LpCardSkeletonList;