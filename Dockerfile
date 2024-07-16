FROM ruby:3.3.3

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
# RUN apk add --no-cache nodejs postgresql-client
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN gem install bundler -v 2.5.11
RUN bundle install
# RUN rails db:environment:set RAILS_ENV=development
# RUN rails db:setup

EXPOSE 3000

CMD ["scripts/run.sh"]
# CMD ["rails", "server", "-b", "0.0.0.0"]
