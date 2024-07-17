#!/bin/bash
bundle install
bin/rake db:environment:set RAILS_ENV=development
bin/rake db:create
bin/rake db:migrate
bin/rails s -p 3000 -b '0.0.0.0'
