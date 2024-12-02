FROM denoland/deno:1.46.3

EXPOSE 7777

WORKDIR /app

COPY . .

CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "--watch", "app.js"]