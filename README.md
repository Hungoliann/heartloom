# heartloom

## Local development

Use Corepack to run pnpm without installing pnpm globally:

```powershell
corepack pnpm install
corepack pnpm dev
```

To run only the frontend:

```powershell
corepack pnpm dev:frontend
```

To build for production:

```powershell
corepack pnpm build
```

## Contact form email

The contact form posts to `/api/contact` and sends email through Resend. Configure these environment variables before deploying:

```powershell
RESEND_API_KEY=...
CONTACT_TO_EMAIL=heartloomllc@gmail.com
CONTACT_FROM_EMAIL="Heartloom <hello@your-domain.com>"
```