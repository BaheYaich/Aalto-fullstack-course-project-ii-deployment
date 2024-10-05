# Aalto-fullstack

## Chapter 20

A branch to track progress on the first course project from Aalto fullstack web
development course.

## To do

1. ~~Add connection pools to database~~
2. ~~Add styles / add a sass compiler and integrate it with Github actions~~
3. ~~Add at least 5 unit tests~~
4. Add documentation and guidelines
5. Deploy on Render and add environment variables
6. Submit project

## In a nutshell

In the first course project, we build a web application that is used as a shared
shopping list. The application must use a three-tier architecture (client,
server, database) and a layered architecture with four layers (views,
controllers, services, database). This project is run with Deno and a PostgreSQL
DB in a Docker container. As a bonus and in the name of experimentation and
learning, I have decided to try building a SCSS compiler in CI/CD Pipeline which
something I always wanted to make. This was achieved through a bash script using
SASS CLI.

1. [Styling](#styling)
2. [Running project locally](#running-project-locally)

# Running project locally

## Pre-requisites

1. Install [Docker Desktop](https://www.docker.com) on your machine to
   initialize and manage the container instances.
2. Install [Deno](https://deno.com).
3. Optional: Install [Git](https://git-scm.com/downloads) to clone the repo.
4. Optional: Install [PSQL CLI](https://www.postgresql.org/download/) to manage
   the database.

## Environment variables

The configurations for the database, flyway and the app itself are stored in a
project.env at the root of the repository. This is a starter template showing
the variables used, you have to insert your own credentials :

```text
# Database configuration for PostgreSQL (running in container called "database-server")
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# Database configuration for Flyway (used for database migrations)
FLYWAY_USER=
FLYWAY_PASSWORD=
FLYWAY_URL=

# Database configuration for PostgreSQL driver
PGUSER=
PGPASSWORD=
PGHOST=
PGPORT=
PGDATABASE=

# Deno cache location (avoid reloading depedencies over and over)
DENO_DIR=/app-cache
```

## Usage

By default, running `docker compose up --build` launches the Deno application
that starts on port 7777, a PostgreSQL server, and a database migration process
(Flyway). The Playwright process is ignored, we will tackle
[tests](#e2e-tests-with-playwright) later on.

### Starting and shutting down

We rely on Docker Compose, all of the following command lines need to run in the
same folder as the `docker-compose.yml` file.

- To start it up, open up the terminal & type `docker compose up`.
- To stop all containers, press `CTRL+C` (on Mac keyboards use CTRL and not CMD)
  in the same terminal where you wrote the command `docker compose up`. Another
  option is to launch a second terminal and then write `docker compose stop`.
- To delete all the containers, in the same terminal you can type
  `docker compose down`. This command also erases all the data from the
  database.

## Styling

A portion of the styling rules used to style forms and buttons in this small
project are from [Puppertino](https://github.com/codedgar/Puppertino) CDN link
by [Codedgar](https://github.com/codedgar). To edit the styles, navigate to
`shopping-lists/assets/scss`, and make sure to run the bash script located under
`/shopping-lists` to compile the scss files and output them as a single file
under `shopping-lists/assets/css`.

## Database and migrations

When the docker containers are up and running, you can access the PostgreSQL
database from the terminal using the following command:

```text
docker exec -it database-server psql -U username database
```

This opens up `psql` console, where you can write SQL commands.

When the docker containers are started, Flyway is used to run the SQL commands
in the database migration files that reside in the `flyway/sql`-folder. If a
database exists, Flyway checks that the schema corresponds to the contents of
the database migration files.

If you need new database tables or need to alter the schema, the correct
approach is to create a new migration file and start the walking skeleton.
Another approach is to modify the existing migration file -- if you do this, the
migrations fail, however.

If you end up altering the migration files (or the schema in the database), you
can clean up the database (remove the existing database tables) by stopping the
containers and the related volumes -- with the database data -- with the command
`docker compose down`. When you launch the app again after this, the database is
newly created based on the migration files.

A good approach to naming the files is to prefix them in the following manner :

```text
V1__schema_1
V2__schema_2
...
```

## Deno cache

When we launch a Deno application, Deno loads any dependencies that the
application uses. These dependencies are then stored to the local file system
for future use. The app uses the `app-cache`-folder for storing the
dependencies. If you need to clear the cache, empty the contents of the folder.

## E2E Tests with playwright

The app comes also with simple [Playwright](https://playwright.dev/)
configuration that provides an easy approach for building end-to-end tests.
Check out the folder `tests` within `e2e-playwright` to get started.

To run E2E tests, launch the project using the following command:

```text
docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf
```

Note! Once finished, this will also remove any changes to the database of your
local project.

What the e2e tests effectively do is that they start up a browser within the
docker container and examine the application programmatically based on the
tests.
