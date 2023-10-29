import HeaderButtons from './header-buttons';
import Logo from './logo';

export default function Header() {
  return (
    <header className="fixed  left-0 top-0 z-10 border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] lg:static lg:overflow-y-visible">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex shrink-0 items-center">
            <a href="#">
              <Logo />
            </a>
          </div>
          <div className="min-w-0 max-w-2xl flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>
          <HeaderButtons />
        </div>
      </div>
    </header>
  );
}
