import Link from "next/link";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <div className="bg-aces-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-3xl text-lg text-gray-300">{subtitle}</p>}
        <div className="mt-6 h-1 w-16 rounded bg-aces-red-bright" />
      </div>
    </div>
  );
}
