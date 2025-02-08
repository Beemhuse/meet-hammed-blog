import { cn } from "@/lib/utils";

export function Card({ className, children }) {
  return (
    <div className={cn("rounded-2xl border bg-white shadow-sm p-4", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

export function CardContent({ className, children }) {
  return <div className={cn("text-gray-600", className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return (
    <div className={cn("mt-4 flex justify-end", className)}>{children}</div>
  );
}

export function Badge({ variant = "default", className, children }) {
  const variants = {
    default: "bg-blue-500 text-white",
    secondary: "bg-green-300 text-gray-700",
  };
  return (
    <span
      className={cn(
        "px-2 py-1 rounded text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
