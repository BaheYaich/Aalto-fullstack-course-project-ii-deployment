FROM denoland/deno:1.35.1

EXPOSE 7777

WORKDIR /app

COPY . .

CMD ["deno", "test", "--allow-net"]