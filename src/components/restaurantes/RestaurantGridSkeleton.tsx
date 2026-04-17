export default function RestaurantGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-white animate-pulse">
          <div className="aspect-video bg-adobe/20" />
          <div className="p-4 space-y-2">
            <div className="h-5 bg-adobe/20 rounded w-3/4" />
            <div className="h-4 bg-adobe/10 rounded w-1/2" />
            <div className="h-6 bg-adobe/10 rounded-full w-1/3 mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}
