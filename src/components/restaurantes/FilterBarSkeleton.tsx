export default function FilterBarSkeleton() {
  return (
    <div className="flex gap-2 flex-wrap animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-9 rounded-full bg-adobe/20"
          style={{ width: `${[90, 100, 115, 110, 105][i]}px` }}
        />
      ))}
    </div>
  );
}
