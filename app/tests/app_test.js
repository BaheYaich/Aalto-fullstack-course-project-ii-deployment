import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../app.js";

Deno.test("POST to / should return a JSON document", async () => {
    const testClient = await superoak(app);

    await testClient.post("/")
        .send({ name: "Jane" })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect({ name: "Jane" });
});

Deno.test("POST to /name should return a name from a JSON document", async () => {
    const testClient = await superoak(app);

    await testClient.post("/name")
        .send({ name: "Jane" })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((response) => {
            if (response.body.name !== "Jane") {
                throw new Error("Response body does not match the sent name.");
            }
        });
});

Deno.test("POST to /name should return a name from a JSON document that has multiple attributes", async () => {
    const testClient = await superoak(app);

    await testClient.post("/name")
        .send({ name: "Jane", age: "22", address: "Baker Street 21" })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((response) => {
            if (response.body.name !== "Jane") {
                throw new Error("Response body does not match the sent name.");
            }
        });
});

Deno.test("GET to / should return a list of all the JSON documents", async () => {
    const testClient = await superoak(app);

    await testClient.get("/")
        .send()
        .expect(200)
});

Deno.test("GET to / should return a list of all the names", async () => {
    const testClient = await superoak(app);

    await testClient.get("/name")
        .send()
        .expect(200)
});

