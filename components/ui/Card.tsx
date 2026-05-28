import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
        hover &&
          "transition-all duration-200 hover:-translate-y-1 hover:border-aces-red/30 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
