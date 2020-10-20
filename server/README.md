# server

## Setting up and running
_Note: Requires that [poetry](https://python-poetry.org/) be installed._

- `poetry install` to download all required dependencies and set up a virtual environment
- `poetry run task run` to start the Flask server


#### Migrations

We're using [Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/), a wrapper library around Alembic to handle
database migrations.

Adding a DB migration:
- `poetry run task add-migration -m "<A Useful Message>"`

Applying a DB migration:
- `poetry run task apply-migrations`
