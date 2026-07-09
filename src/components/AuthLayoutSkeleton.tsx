import { Skeleton } from "./ui/skeleton";

export function AuthLayoutSkeleton() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar skeleton */}
      <div className="w-70 border-r border-border bg-background p-4 space-y-6">
        {/* Logo area */}
        <div className="flex items-center gap-3 px-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-5 w-32" />
        </div>

        {/* Nav items */}
        <div className="space-y-2 px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-auto space-y-3 px-2 pt-6 border-t">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 p-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
