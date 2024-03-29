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
      <header className="flex items-center justify-between py-5 relative">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            {/* <div className="mr-3">
              <Logo />
            </div> */}
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
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
        {/* <ThemeSwitch /> */}
        <MobileNav />
      </div>
    </header>
        {/* <!-- 使用 w-full 类使线条宽度为父容器的 100% --> */}
        <hr className="w-full border-t border-gray-200 absolute inset-0" />
    </div>
    
  )
}

export default Header
