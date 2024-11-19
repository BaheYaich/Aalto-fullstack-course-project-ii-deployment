import { hash, compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { sql } from "../../database/database.js";
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts";

const storeFile = async ({ request, response }) => {
    try {
        // Parse multipart form data
        const body = request.body({ type: "form-data" });
        const reader = await body.value;
        const data = await reader.read();

        console.log("Parsed form-data:", data);

        if (!data.files || data.files.length === 0) {
            response.status = 400;
            response.body = "No files uploaded";
            return;
        }

        const fileDetails = data.files[0];
        console.log("File details:", fileDetails);

        if (!fileDetails.filename) {
            response.status = 400;
            response.body = "File content is missing";
            return;
        }

        const filePath = fileDetails.filename; // Path to the uploaded file
        console.log("Temporary file path:", filePath);

        // Read raw file bytes
        const fileContent = await Deno.readFile(filePath);

        // Encode the file content in Base64
        const base64Encoded = base64.fromUint8Array(fileContent);

        // Generate a random plaintext password
        const plaintextPassword = createPassword();

        // Encrypt the password using BCrypt
        const encryptedPassword = await hash(plaintextPassword);

        // Store the file details in the `miniupload_files` table
        await sql`INSERT INTO miniupload_files (name, type, password, data, created_at)
          VALUES (${fileDetails.originalName}, ${fileDetails.contentType}, ${encryptedPassword}, ${base64Encoded}, NOW())`;

        // Send the plaintext password as the response
        response.body = plaintextPassword;
    } catch (err) {
        console.error("Error storing file:", err);
        response.status = 500;
        response.body = "Internal Server Error";
    }
};

const createPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

const retrieveFile = async ({ request, response }) => {
    try {
        // Parse the form data
        const body = await request.body({ type: "form" }).value;

        // Extract ID and password from the form data
        const id = body.get("id");
        const password = body.get("password");

        console.log("Extracted ID:", id);
        console.log("Extracted Password:", password);

        if (!id || !password) {
            response.status = 401;
            response.body = "ID and password are required.";
            return;
        }

        // Query the database for the file
        const files = await sql`SELECT * FROM miniupload_files WHERE id = ${id}`;
        if (files.length === 0) {
            response.status = 401;
            response.body = "File not found.";
            return;
        }

        const fileRecord = files[0];

        // Validate password
        const isPasswordValid = await compare(password, fileRecord.password);
        if (!isPasswordValid) {
            response.status = 401;
            response.body = "Invalid password.";
            return;
        }

        // Decode the Base64 file content
        const fileContent = base64.toUint8Array(fileRecord.data);

        // Set content type and send decoded file data
        response.headers.set("Content-Type", fileRecord.type);
        response.body = fileContent; // Send the decoded file content
    } catch (err) {
        console.error("Error retrieving file:", err);
        response.status = 500;
        response.body = "Internal Server Error";
    }
};

export { storeFile, retrieveFile };