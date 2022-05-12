// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler (req, res) {
  res.status(200).json({ name: process.env.NODE_ENV, url: process.env.VERCEL_URL, NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL })
}
