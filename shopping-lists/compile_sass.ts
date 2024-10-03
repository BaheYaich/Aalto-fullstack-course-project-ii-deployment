// compile_sass.ts
const process = Deno.run({
  cmd: [
    "sass",
    "assets/scss/main.scss:assets/css/main.min.css",
    "--style",
    "compressed",
  ],
  stdout: "piped",
  stderr: "piped",
});

// Capture output and errors
const { stdout, stderr } = await process.output();
const error = await process.stderrOutput();

if (error.length > 0) {
  console.error(new TextDecoder().decode(error));
} else {
  console.log(new TextDecoder().decode(stdout));
}
