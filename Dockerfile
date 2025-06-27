FROM node:latest

RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    apt-transport-https \
    chromium \
    chromium-driver \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

ENV CHROME_BIN=/usr/bin/chromium

WORKDIR /app

COPY package*.json ./

ENV acess_token="eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI5NTgzMSIsInV1aWQiOiJlZTIyYzYyZi01YmZlLTRmOWQtYjdmMC1iMzdjZTI3NzMxMGEiLCJ1c2VybmFtZSI6IjB4YTQ0ODRlNjA2NjA1YWRhOTk5Njg0NmU4NTJiMTUyZjk0ZmQ3M2IxZSIsImJhblVudGlsIjpudWxsLCJpc0FjdGl2ZSI6dHJ1ZSwicHJvZmlsZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNS0wNi0yN1QwNTo1MTowNy4wMDlaIiwidXBkYXRlZEF0IjoiMjAyNS0wNi0yN1QwNTo1MTowNy4wMDlaIiwic2lkIjoiMWJkODVlYmUtNmRiMS00MmVkLTlhOTAtNzgzNmUxNDkwZjAxIiwiZXhwIjoxNzUzNTk1NDY3fQ.JXJePGR_7sk9WXEMbKmujtKecZUFlIiafwfvL2GF810"


RUN npm install
COPY . .


CMD [ "node", "app" ]