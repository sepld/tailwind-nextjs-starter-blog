import { NextRequest, NextResponse } from 'next/server';
import { queryWhois } from './queryWhois';
import preDomain from './preDomain';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const domain = searchParams.get('domain') as string
  const server = preDomain(domain);
  if (server.host) {
    const whoisData = await queryWhois(server);
    // console.log('WHOIS data for', domain, ':\n', whoisData);
    return NextResponse.json({
      data: whoisData,
      status: "succ"
    })
  }
  else {
    return NextResponse.json({
      status: "invalid"
    })
  }


}

