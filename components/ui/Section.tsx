import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
};

export function Section({ children, className, id, dark }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        dark ? "bg-aces-navy text-white" : "bg-white text-aces-navy",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
};

export function SectionHeader({ title, subtitle, centered, light }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center")}>
      <h2
        className={cn(
          "font-display text-3xl font-bold uppercase tracking-tight md:text-4xl",
          light ? "text-white" : "text-aces-navy"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg", light ? "text-gray-300" : "text-aces-muted")}>
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-16 rounded",
          centered && "mx-auto",
          light ? "bg-aces-red-bright" : "bg-aces-red"
        )}
      />
    </div>
  );
}
