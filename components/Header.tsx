import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <div>
      <header className="mb-5 flex items-center justify-between py-5">
        <div>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              {/* <div className="mr-3">
              <Logo />
            </div> */}
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="h-6 text-2xl font-semibold">{siteMetadata.headerTitle}</div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
              >
                {link.title}
              </Link>
            ))}
          {/* 搜索框，不启用 */}
          {/* <SearchButton /> */}
          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>
    </div>
  )
}

export default Header
