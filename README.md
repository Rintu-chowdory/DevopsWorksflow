# DevopsWorksflow — Rintu Chowdory · DevOps Portfolio

[![Deploy to GitHub Pages](https://github.com/Rintu-chowdory/DevopsWorksflow/actions/workflows/pages.yml/badge.svg)](https://github.com/Rintu-chowdory/DevopsWorksflow/actions/workflows/pages.yml)
[![Docker Build & Push](https://github.com/Rintu-chowdory/DevopsWorksflow/actions/workflows/docker-build.yml/badge.svg)](https://github.com/Rintu-chowdory/DevopsWorksflow/actions/workflows/docker-build.yml)
[![Live Site](https://img.shields.io/badge/live-rintu--chowdory.github.io-38bdf8)](https://rintu-chowdory.github.io/DevopsWorksflow/)

My personal DevOps portfolio site — and a working reference implementation of a
modern CI/CD pipeline. The site itself is plain HTML & CSS (no build step), but
everything around it is automated:

**Every push to `main` triggers:**
1. **Lint** — HTML validation with `html-validate` (no broken markup ships)
2. **Build** — multi-platform Docker image (amd64 + arm64) with GHA layer caching
3. **Push** — image published to Docker Hub *and* GitHub Container Registry,
   tagged `latest` + commit SHA
4. **Deploy** — site published to GitHub Pages automatically after lint passes

## Live projects

| Project | Stack | URL |
|---|---|---|
| GitVerse | React · Vite · TiDB Cloud | https://gitverse-zeta.vercel.app |
| Rintu Shop | Rails 8 · PostgreSQL · Render | https://rintu.onrender.com |
| InvoiceFlow | React 18 · Vite · Groq AI | https://invoiceflow-nine-flax.vercel.app |
| GrundgesetzGPT | Flask · Groq AI · Render | https://rintuchowdory.github.io/grundgesetz-gpt/ |
| Lumora | Vite · Serverless · Vercel | https://lumora-navy-tau.vercel.app |

## Repository structure

```
site/                    # the portfolio site (served by Pages + the Docker image)
  index.html
  assets/css/styles.css
  assets/images/         # logo + favicon
Dockerfile               # nginx:alpine image serving the site, with healthcheck
config.json / config.yaml# repo metadata
.github/workflows/
  pages.yml              # lint -> deploy to GitHub Pages
  docker-build.yml       # multi-arch build -> Docker Hub + GHCR
```

## Run it locally

```bash
# Static — just open site/index.html, or:
python3 -m http.server -d site 8080

# Containerized:
docker build -t devops-portfolio .
docker run -p 8080:80 devops-portfolio
```

## Contact

- **Email:** chowdorydevops@gmail.com
- **GitHub:** https://github.com/Rintu-chowdory

MIT License © Rintu Chowdory
