$env:NODE_OPTIONS = "--dns-result-order=ipv4first"
npx vercel --prod --yes --archive tgz
