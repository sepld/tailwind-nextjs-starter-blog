import servers from './servers.json'
import * as net from 'net'
import * as punycode from 'punycode'

export default function preDomain(domain: string) {
    var parts, tld, server_tld, server_ip
    var server = {
        follow: 2,
        timeout: 10000, // 60 seconds in ms
        query: '$addr\r\n',
        punycode: false,
        domain: domain,
        host: null,
    }

    switch (true) {
        case net.isIP(domain) !== 0:
            server_ip = servers['_']['ip']
            break
        default:
            tld = punycode.toASCII(domain)
            while (true) {
                server_tld = servers[tld]
                if (!tld || server_tld) {
                    break
                }
                tld = tld.replace(/^.+?(\.|$)/, '')
            }
    }
    if (typeof server_tld === 'string') {
        parts = server_tld.split(':')
        server_tld = {
            host: parts[0],
            port: parts[1],
        }
    }

    if (server.punycode !== false) {
        server.domain = punycode.toASCII(domain)
    }
    server = {
        ...server,
        ...server_ip,
        ...server_tld,
    }
    return server
}
