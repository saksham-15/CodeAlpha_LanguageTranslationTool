# Vercel Language Translation Tool

This version keeps the Azure Translator key on the server, rather than exposing it in the browser.

## Deploy to Vercel

1. Upload this `vercel-translation-tool` folder to a new GitHub repository, or import the folder into Vercel.
2. In Vercel, open the project, then **Settings → Environment Variables**.
3. Add `TRANSLATOR_KEY` and paste Azure **KEY 1** as its value.
4. Add `TRANSLATOR_REGION` with the value `centralindia`.
5. Redeploy the project.

The key must not be placed in `index.html` or committed to GitHub. For local Vercel development only, copy `.env.example` to `.env.local`, fill in the values, and keep that file private.
