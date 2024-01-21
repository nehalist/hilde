# Hilde 🏆

> [!CAUTION]
> WIP 1.0.0

![Build](https://img.shields.io/github/actions/workflow/status/nehalist/hilde/build.yml?branch=main)
![License](https://img.shields.io/github/license/nehalist/hilde)
![Docker Pulls](https://img.shields.io/docker/pulls/nehalist/hilde)

[//]: # (You've got a foosball table or similar in your office and want to track your matches, player progress and compare yourself to your)
[//]: # (colleagues and see who's the best? You've come to the right place.)
[//]: # (**Hilde** is a match tracking app for games like foosball, table tennis, air hockey, etc. with achievements, elo ratings, statistics and)
[//]: # (more. **Hilde** is easy to setup and can be used by everyone.)
[//]: # ()
[//]: # (A public **demo** is available at [demo.hilde.gg]&#40;https://demo.hilde.gg&#41;.)

![Hilde](hilde.png)

## Table of Contents

1. [Features](#features) - Hilde's features
2. [Getting Started](#getting-started) - How to get Hilde up and running
3. [Usage](#usage) - Command line utilities and configuration variables
4. [Contributing](#contributing) - How to contribute
5. [License](#license)

## ⚡️ Features

[//]: # (- Simple, intuitive interface)
[//]: # (- **Elo rating** for each team)
[//]: # (- **Seasons** &#40;managable via admin interface&#41;)
[//]: # (- Detailed team statistics &#40;winstreaks, winrate, elo history chart, ...&#41;)
[//]: # (- **Achievements** &#40;e.g. "Win 100 Matches", "Win 10 Matches in a row", ...&#41;)
[//]: # (- Compare teams against each other)
[//]: # (- Teams of any size, simply separated by a comma in the team name)
[//]: # (- **Light/Dark theme**)
[//]: # (- Match comments)
[//]: # (- **Leaderboards**)
[//]: # (- *Optional*: Deployable for free with Vercel & Planetscale)
[//]: # (- *Optional*: Fully dockerized)

## ⭐ Getting Started

[//]: # (Hilde can be installed in a few minutes, either by deploying it to Vercel, using Docker or setting it up manually.)

Requirements:

- Node 20
- PostgreSQL 13+

### Docker Compose

Example `docker-compose.yml`:

```yaml
version: '3'

services:
  hilde:
    depends_on:
      - database
    networks:
      - internal
    image: nehalist/hilde
    ports:
      - '127.0.0.1:3000:3000'
    environment:
      - DATABASE_URL=mysql://root:hildepw@database:3306/hilde

  db:
    image: postgres:13.3
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data/
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password

volumes:
  db:

networks:
  internal:
```

After running `docker-compose up -d` Hilde is running on `localhost:3000`.

### Manually (for development)

1. Clone/fork the repository
2. Run `npm ci` to install dependencies
3. Run `docker-compose up -d` in order to start the database container (or adjust the `.env` file to use a different db)
4. Run `npm run db:migrations:make` to execute all migrations
5. Run `npm run dev` to start the development server (at `localhost:3000`)
6. Add **awesome** features.

### Docker

The official Docker image of Hilde is available on [Docker Hub](https://hub.docker.com/repository/docker/nehalist/hilde). Run it locally
via:

1. Run `docker run -p 127.0.0.1:3000:3000 -e DATABASE_URL=mysql://<user>:<password>@<host>:<port>/<db> nehalist/hilde`
2. Open `http://localhost:3000`
3. Done.

## ⚙️ Usage

### Commands

Hilde provides a set of utility terminal commands:

| Command                         | Description                                                          |
|---------------------------------|----------------------------------------------------------------------|
| `npm run dev`                   | Starts the development server                                        |
| `npm run build`                 | Builds the app                                                       |
| `npm run start`                 | Starts the production server                                         |
| `npm run lint`                  | Lints files                                                          |
| `npm run db:migrations:make`    | Create migrations                                                    |
| `npm run db:migrations:execute` | Execute migrations                                                   |
| `npm run email:dev`             | Run [react-email dev server](https://react.email/docs/cli#email-dev) |

### Configuration

Hilde can be configured via environment variables in the `.env` file.

| Variable               | Description                | Default                                                            |
|------------------------|----------------------------|--------------------------------------------------------------------|
| `NEXT_PUBLIC_SITE_URL` | Site URL                   | `http://localhost:3000`                                            |
| `EMAIL_SERVER`         | Email server config        | `smtp://localhost:1025`                                            |
| `EMAIL_FROM`           | Default sender email       | `noreply@hilde.gg`                                                 |
| `NEXTAUTH_SECRET`      | Token secret               | `+Zrk5zW6fgog5k0LbN4bxL1YXKIhvb65Yln5ZKf+g3o=`                     |
| `NEXTAUTH_URL`         | Deployed URL of Hilde      | `http://localhost:3000`                                            |
| `DATABASE_URL`         | Database connection string | `postgresql://user:password@127.0.0.1:5432/app?search_path=public` |

## 👐 Contributing

Hilde was created for fun and to play around with technologies I don't use on a daily basis in my office job, hence can be improved by many ways.

It's built on:

- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle](https://orm.drizzle.team/)
- [NextAuth.js](https://next-auth.js.org/)
- and many more (see [package.json](package.json))

PRs are highly appreciated 🥳

If you like Hilde, please consider starring the repository. Thanks!

## License

Developed by [nehalist.io](https://nehalist.io). Licensed under the [MIT License](LICENSE).
