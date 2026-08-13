These city landing pages and the notify function were added to the seo/city-landing-pages branch as part of an SEO and lead-notification update.

Files included:
- /cities/*.html (Laguna Niguel, Dana Point, San Clemente, Mission Viejo, Ladera Ranch, Laguna Hills)
- /sitemap.xml (adds city pages)
- /assets/js/notify.js (client-side click notifier)
- /netlify/functions/notify-sms.js (serverless Twilio SMS sender)

Next steps:
1. Set Twilio environment variables in your Netlify/Vercel/host: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, NOTIFY_TO_NUMBER.
2. Review page copy and provide local photos/testimonial approvals if you want them included.
3. After your review I will open a PR from seo/city-landing-pages to the default branch for your approval.

Notes:
- I used the site domain https://straightflushplumbingoc.com to match the existing repo files.
- Yelp review excerpts will be added next after you confirm which excerpts you prefer and how you want attribution displayed.
