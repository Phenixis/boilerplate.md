import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || 'Next.js Portfolio Starter'
  let appName = process.env.APP_NAME || "App Name"
  let companyName = process.env.COMPANY_NAME || "App Name"

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-start justify-start bg-white p-4">
        <div tw="flex">
          <img src="https://boilerplate.maximeduhamel.com/icon.svg" alt={appName} />
          <h1 tw="text-4xl font-bold text-primary">
            {appName}
          </h1>
        </div>
        <h2>
          Brought to you by {companyName}
        </h2>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
