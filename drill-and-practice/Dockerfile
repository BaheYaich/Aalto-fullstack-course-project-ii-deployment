FROM denoland/deno:1.46.3

EXPOSE 7777

WORKDIR /drill-and-practice

COPY deps.js .

RUN deno cache deps.js

COPY . .

CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "--watch", "run-locally.js"]