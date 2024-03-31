'use client'
import React, { useState } from 'react'

export default function Page() {
  const [domain, setDomain] = useState('')
  const [domainInfo, setDomainInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [domainDisplay, setDomainDisplay] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/whois?domain=${domain}`)
      const data = await res.json()
      if (data.status == 'succ') {
        setDomainInfo(data.data)
        setDomainDisplay(domain)
        setErrorMessage('')
      } else if (data.status == 'invalid') {
        setErrorMessage('请输入一个合法的域名 / IP 地址 / ASN')
      }
    } catch (error) {
      console.error('Error fetching domain information:', error)
      setDomainInfo(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col md:flex-row">
      <nav className="flex-shrink-0 basis-1/3 md:mr-2">
        <form onSubmit={handleFormSubmit}>
          <div className="relative mb-5 w-full">
            {/* 显示错误信息 */}
            <input
              type="text"
              value={domain}
              onChange={handleInputChange}
              placeholder="Lookup Domain"
              disabled={loading}
              className="focus:shadow-outline dark:text-white-200 w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none dark:bg-gray-800"
              required
            />
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <button
              className="peer-placeholder-shown:bg-blue-gray-500 absolute right-1 top-1 select-none rounded bg-pink-500 px-4 py-2 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
              type="submit"
              disabled={loading}
              data-ripple-light="true"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </nav>

      <div className="basis-2/3 md:ml-2">
        <div className="mb-5 flex items-center">
          <h1 className="ml-1 text-2xl font-extrabold leading-9 tracking-tight text-gray-900  dark:text-gray-100 sm:text-2xl md:text-4xl">
            {domainDisplay ? domainDisplay : 'Whois Query Service'}
          </h1>
        </div>

        {domainInfo && (
          <div className="overflow-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800 dark:text-gray-100">
            <div className="whitespace-pre-wrap">{domainInfo}</div>
          </div>
        )}

        {!domainInfo && (
          <div className="bg-gray-40 overflow-auto rounded-lg">
            <div className="whitespace-pre-wrap">
              <h1 className="text-3xl  font-extrabold">What is Whois Query Service?</h1>
              <hr className="mt-1" />

              <div className="mb-5 mt-5 overflow-auto">
                <div className="text-1xl whitespace-pre-wrap">
                  Whois (pronounced as 'who is') is a widely used internet service protocol used to
                  query databases and obtain information about domain name registrations and IP
                  address assignments. The Whois Query Service provides a way to retrieve
                  information about registered domain names, including details about the domain
                  owner, registration and expiration dates, domain name servers (DNS), and other
                  relevant information.
                </div>
              </div>

              <h1 className="text-3xl  font-extrabold">How Does WHOIS Work?</h1>
              <hr className="mt-1" />
              <div className="mb-5 mt-5 overflow-auto">
                <div className="text-1xl whitespace-pre-wrap">
                  The WHOIS service operates by maintaining a database of information related to
                  domain name registrations and IP address allocations. This information typically
                  includes:
                </div>
                <li>
                  Domain Name Owner's Details: The name, address, phone number, and email address of
                  the person or organization that owns the domain.
                </li>
                <li>
                  Registrar Information: The name and contact information of the domain registrar
                  through which the domain was registered.
                </li>
                <li>Domain Registration Date: The date when the domain was registered.</li>
                <li>
                  Expiration Date: The date on which the domain registration is set to expire.
                </li>
                <li>
                  Name Servers: The server(s) that the domain uses for its DNS (Domain Name System)
                  entries.
                </li>
              </div>

              <h1 className="text-3xl  font-extrabold">Purpose and Uses of WHOIS</h1>
              <hr className="mt-1" />
              <div className="mb-5 mt-5 overflow-auto">
                <div className="text-1xl whitespace-pre-wrap">
                  The WHOIS service is used for a variety of purposes, including but not limited to:
                </div>
              </div>
              <li>
                Domain Availability: Users can check if a domain name is available for registration
                or if it has been registered and by whom.
              </li>
              <li>
                Contacting the Domain Owner: It provides a way for individuals or organizations to
                get in touch with the domain owner for various reasons, such as business inquiries,
                legal matters, or reporting issues.
              </li>
              <li>
                Technical Troubleshooting: Network administrators use WHOIS to resolve technical
                issues related to DNS, routing problems, and other network-related concerns.
              </li>
              <li>
                Legal and Law Enforcement: Authorities use WHOIS data to track down individuals
                involved in illegal activities, such as spamming or cybercrimes.
              </li>
              <li>
                Marketing and Research: Companies may use WHOIS information for market research,
                identifying potential business partners, or competitors in the domain name space.
              </li>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
