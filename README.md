# My boilerplate, based from [Next.js SaaS Starter](https://github.com/leerob/next-saas-starter) by leerob

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)

## Roadmap/To-do

- [ ] Add a forgot password flow
- [ ] Add the ability to create a password for an account created with a Provider
- [ ] Add more Activity Logs
- [ ] Add "type" to the feedback
- [ ] Personnalize the pricing page based on the active Stripe products
- [ ] Add the privacy policy
- [ ] Stylize the Terms of Service page
- [ ] Personnalize the landing page to : ($100M Offers, Alez Hormozi)
    - Maximize the dream outcome (big claim/promise) and the perceived likelihood of achievement (show, prove, demonstrate)
    - Minimize the time delay (make it instant) and effort & sacrifice (make it easy)

### Admin
- [ ] Add a product in the pricing section
- [ ] Add a price in the pricing section
- [ ] Add the ability to answer to a ticket
- [ ] Add the ability to change the stauts of a ticket
- [ ] Add the ability to filter/sort tickets


## Getting Started

```bash
git clone https://github.com/leerob/next-saas-starter
cd next-saas-starter
pnpm install
```

## Running Locally

Use the included setup script to create your `.env` file:

```bash
pnpm db:setup
```

Then, run the database migrations and seed the database with a default user and team:

```bash
pnpm db:migrate
pnpm db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can, of course, create new users as well through `/sign-up`.

Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

Optionally, you can listen for Stripe webhooks locally through their CLI to handle subscription change events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Set up a production Stripe webhook

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://yourdomain.com/api/stripe/webhook`).
3. Select the events you want to listen for (e.g., `checkout.session.completed`, `customer.subscription.updated`).

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel and deploy it.
3. Follow the Vercel deployment process, which will guide you through setting up your project.

### Add environment variables

In your Vercel project settings (or during deployment), add all the necessary environment variables. Make sure to update the values for the production environment, including:

1. `BASE_URL`: Set this to your production domain.
2. `STRIPE_SECRET_KEY`: Use your Stripe secret key for the production environment.
3. `STRIPE_WEBHOOK_SECRET`: Use the webhook secret from the production webhook you created in step 1.
4. `POSTGRES_URL`: Set this to your production database URL.
5. `AUTH_SECRET`: Set this to a random string. `openssl rand -base64 32` will generate one.
6. `AUTH_GOOGLE_ID`: Set this to your Google OAuth client ID.
7. `AUTH_GOOGLE_SECRET`: Set this to your Google OAuth client secret.
8. `RESEND_API_KEY`: Set this to the API key for the Resend service.
9. `RESEND_API_ENDPOINT`: Set this to a custom endpoint for the Resend Service.
10. `APP_NAME`: Set this to the name of your application.
11. `COMPANY_NAME`: Set this to the name of your company.