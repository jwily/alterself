FROM node:12 AS build-stage

WORKDIR /react-app
COPY react-app/. .

# You have to set this because it should be set during build time.
ENV REACT_APP_BASE_URL=http://127.0.0.1/5000

# Build our React App
RUN npm install
RUN npm run build

FROM python:3.9

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True
ENV SECRET_KEY=af5b42ac-f778-4491-a8fd-cd5149405e06
ENV DATABASE_URL=postgresql://alter_self_dev:magicmissle@localhost/alter_self
ENV S3_BUCKET=alterself
ENV S3_KEY=AKIATULQN3CAEEHJ7OVC
ENV S3_SECRET=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

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD gunicorn app:app
