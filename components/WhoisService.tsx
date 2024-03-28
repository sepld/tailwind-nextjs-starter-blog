"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';


interface DomainInfo {
  // 根据WHOIS API的响应定义类型
  success: string;
  result: string;
}

const WhoisService = () => {
  const [domain, setDomain] = useState('');
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {

      const response = await fetch(`https://sapi.k780.com/?app=domain.whois&domain=${domain}&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json`, {
        method: 'GET',
        // 如果API需要认证，请在这里添加认证信息
      });

      const data = await response.json();
      setDomainInfo({ success: data.success, result: data.result.details});
    } catch (error) {
      console.error('Error fetching domain information:', error);
      // setDomainInfo({ success:"1", result:JSON});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex columns-3'>
      <div className='w-full border-1'>
        <form onSubmit={handleFormSubmit}>
          <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
            <button
              className="!absolute right-1 top-1 z-10 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
              type="submit"
              disabled={loading}
              data-ripple-light="true"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <input
              type="text"
              value={domain}
              onChange={handleInputChange}
              placeholder="Lookup Domain/IP address"
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </form>
      </div>
      <div className='w-full border-1 '>
        {domainInfo && (
          <div>
            <h1>{domain}</h1>
            <p>
            {domainInfo.result}
            </p>
            {/* {Object.keys(domainInfo.result).map((key) => (
              domainInfo.result[key]
              <div key={info.title} className="px-12 py-4">
                <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
              </div>
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default WhoisService
