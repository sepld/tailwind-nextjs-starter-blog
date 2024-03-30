import { genPageMetadata } from 'app/seo'
import WhoisService from '@/components/WhoisService'

export const metadata = genPageMetadata({ title: 'Whois', description: 'name servcies'} )

export default function Page() {
  return (
    <>
      <WhoisService />
    </>
  )
}
