FROM denoland/deno:1.35.1

EXPOSE 7777

WORKDIR /app

COPY . .

CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "--allow-write", "app.js"]