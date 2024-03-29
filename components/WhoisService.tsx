"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { MDXLayoutRenderer } from "pliny/mdx-components"

interface DomainInfo {
  // 根据WHOIS API的响应定义类型
  success: boolean;
  result: string;
}

const WhoisService = () => {
  const [domain, setDomain] = useState("");
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [domainDisplay, setDomainDisplay] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };
  const whoisMdxSource = `data/whois/whois.mdx`; // 相对于 pages 目录的路径

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://sapi.k780.com/?app=domain.whois&domain=${domain}&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json`, {
        method: "GET",
        // 如果API需要认证，请在这里添加认证信息
      });

      const data = await response.json();
      if (data.success == "1") {
        if (data.result.status == "ALREADY_WHOIS") {
          setDomainInfo({ success: true, result: data.result.details });
        }
        else if (data.result.status == "WAIT_PROCESS") {
          setDomainInfo({ success: true, result: data.msg });
        }
        else if (data.result.status == "NOT_REGISTER") {
          setDomainInfo({ success: true, result: "The domain name has not been registered yet" });
        }
        else if (data.result.status == "BE_RETAINED") {
          setDomainInfo({ success: true, result: "Domain name is reserved" });
        }
      }
      else {
        setDomainInfo({ success: false, result: data.msg });
      }
      setDomainDisplay(domain);
    } catch (error) {
      console.error("Error fetching domain information:", error);
      setDomainInfo({ success: false, result: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col  md:flex-row w-full">
      <nav className="basis-1/3 mr-2 flex-shrink-0">
        <form onSubmit={handleFormSubmit}>
          <div className="relative w-full">
            <input
              type="text"
              value={domain}
              onChange={handleInputChange}
              placeholder="Lookup Domain/IP address"
              disabled={loading}
              className="w-full px-3 py-2 mb-5 rounded-lg border-gray-300 focus:outline-none focus:shadow-outline"
              required
            />
            <button
              className="absolute right-1 top-1 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
              type="submit"
              disabled={loading}
              data-ripple-light="true"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </nav>

      <div className="basis-2/3 ml-2">
        <div className="flex items-center mb-5" >
          <h1 className="text-2xl ml-5 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl md:text-4xl">
            {domainDisplay ? (domainDisplay) : (
              "Whois Query Service"
            )}
          </h1>
        </div>

        {domainInfo && (
          <div className="overflow-auto p-4 bg-gray-100 rounded-lg">
            <div className="whitespace-pre-wrap">
              {ReactHtmlParser(domainInfo.result)}
            </div>
          </div>
        )}

        {
          !domainInfo && (
            <div className="overflow-auto p-4 bg-gray-40 rounded-lg">
              <div className="whitespace-pre-wrap">
                <h1 className="text-3xl  font-extrabold">
                  What is Whois Query Service?
                </h1>
                <hr className="mt-1" />

                <div className="overflow-auto mt-5 mb-5">
                  <div className="whitespace-pre-wrap text-1xl">
                    Whois (pronounced as "who is") is a widely used internet service protocol used to query databases and obtain information about domain name registrations and IP address assignments. The Whois Query Service provides a way to retrieve information about registered domain names, including details about the domain owner, registration and expiration dates, domain name servers (DNS), and other relevant information.
                  </div>
                </div>

                <h1 className="text-3xl  font-extrabold">
                  How Does WHOIS Work?
                </h1>
                <hr className="mt-1" />
                <div className="overflow-auto mt-5 mb-5">
                  <div className="whitespace-pre-wrap text-1xl">
                    The WHOIS service operates by maintaining a database of information related to domain name registrations and IP address allocations. This information typically includes:
                  </div>
                  <li>
                    Domain Name Owner"s Details: The name, address, phone number, and email address of the person or organization that owns the domain.
                  </li>
                  <li>
                    Registrar Information: The name and contact information of the domain registrar through which the domain was registered.
                  </li>
                  <li>
                    Domain Registration Date: The date when the domain was registered.
                  </li>
                  <li>
                    Expiration Date: The date on which the domain registration is set to expire.
                  </li>
                  <li>
                    Name Servers: The server(s) that the domain uses for its DNS (Domain Name System) entries.
                  </li>
                </div>


                <h1 className="text-3xl  font-extrabold">
                  Purpose and Uses of WHOIS
                </h1>
                <hr className="mt-1" />
                <div className="overflow-auto mt-5 mb-5">
                  <div className="whitespace-pre-wrap text-1xl">
                    The WHOIS service is used for a variety of purposes, including but not limited to:
                  </div>
                </div>
                <li>
                  Domain Availability: Users can check if a domain name is available for registration or if it has been registered and by whom.
                </li>
                <li>
                  Contacting the Domain Owner: It provides a way for individuals or organizations to get in touch with the domain owner for various reasons, such as business inquiries, legal matters, or reporting issues.
                </li>
                <li>
                  Technical Troubleshooting: Network administrators use WHOIS to resolve technical issues related to DNS, routing problems, and other network-related concerns.
                </li>
                <li>
                  Legal and Law Enforcement: Authorities use WHOIS data to track down individuals involved in illegal activities, such as spamming or cybercrimes.
                </li>
                <li>
                  Marketing and Research: Companies may use WHOIS information for market research, identifying potential business partners, or competitors in the domain name space.
                </li>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default WhoisService
