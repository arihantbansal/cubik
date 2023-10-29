export default function BreadCrumb({
  pages,
}: {
  pages: { name: string; href: string; current: boolean }[];
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div>
            <a
              href={''}
              className="text-md text-[var(--color-fg-secondary)] hover:text-[var(--color-purple-500)]"
            >
              Home
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 shrink-0 text-[var(--color-fg-tertiary)]"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <a
                href={page.href}
                className={`text-md ml-4 hover:text-[var(--color-purple-500)] ${
                  page.current
                    ? 'text-[var(--color-purple-500)]'
                    : 'text-[var(--color-fg-secondary)]'
                }`}
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
