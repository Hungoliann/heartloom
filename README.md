# Heartloom

Single Next.js app for the Heartloom website.

## Local Development

```powershell
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:3000`.

## Production Build

```powershell
corepack pnpm build
```

## Contact Form Email

The contact form posts to `/api/contact` and sends email through Resend. Configure these environment variables before deploying:

```env
RESEND_API_KEY=...
CONTACT_TO_EMAIL=heartloomllc@gmail.com
CONTACT_FROM_EMAIL="Heartloom <hello@your-domain.com>"
```
