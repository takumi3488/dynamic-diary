FROM mcr.microsoft.com/playwright:v1.22.0-focal

WORKDIR /app

COPY . .
RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash && yarn

CMD ["yarn", "test"]
