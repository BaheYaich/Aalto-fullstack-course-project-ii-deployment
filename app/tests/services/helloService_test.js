import { assertEquals } from "https://deno.land/std@0.222.1/testing/asserts.ts";
import { getHello } from "../../services/helloService.js";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../../app.js";


Deno.test("Calling 'getHello('')' returns 'Oh, hello there!'", async () => {
  assertEquals("Oh, hello there!", getHello(""));
});

Deno.test("Calling 'getHello()' returns 'Oh, hello there!'", async () => {
  assertEquals("Oh, hello there!", getHello());
});

Deno.test("Calling 'getHello('General Kenobi')' returns 'Oh, hello there! General Kenobi'", async () => {
  assertEquals("Oh, hello there!", getHello("General Kenobi"));
});

Deno.test("GET / returns status code 200", async () => {
  const testClient = await superoak(app);
  await testClient.get("/")
    .expect(200)
});

Deno.test("GET /api/hello displays the default message", async () => {
  const testClient = await superoak(app);
  await testClient.get("/api/hello")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect((response) => {
      if (response.body.message !== "Oh, hello there!") {
        throw new Error("Response body does not match");
      }
    });
});

Deno.test("Calling 'setHello('General Kenobi')' returns status code 200", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/hello")
    .send({ message: "General Kenobi" })
    .expect(200)
});

Deno.test("Calling 'setHello()' returns null", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/hello")
    .send(null)
    .expect(null)
});

Deno.test("Calling 'setHello('')' returns null", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/hello")
    .send({ message: "" })
    .expect(null)
});


Deno.test("Calling 'setHello('onetwothreefourfivesix')' returns null", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/hello")
    .send({ message: "onetwothreefourfivesix" })
    .expect(null)
});

Deno.test("Calling 'setHello('1')' returns null", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/hello")
    .send({ message: "1" })
    .expect(null)
});

Deno.test("Calling 'setHello('1')' returns null", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/hello")
    .send({ message: "1" })
    .expect(null)
});

Deno.test("Calling 'setHello('Hello')' updates the message and returns status code 200", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/hello")
    .send({ message: "Hello" })
    .expect("Content-Type", /json/)
    .expect(200)
    .expect((response) => {
      if (!response.body || response.body.message !== "Hello") {
        throw new Error("Message was not updated correctly or response is malformed");
      }
    });
});