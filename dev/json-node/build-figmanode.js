import axios from "axios";
import fs from "fs";

// === CONFIG =======================================
const FIGMA_TOKEN = process.env.FIGMA_TOKEN; 
const FILE_KEY = "PASTE_YOUR_FILE_KEY_HERE";   
const NODE_PATH = "./card.json"; // JSON from above
// ===================================================

// Read JSON node
const node = JSON.parse(fs.readFileSync(NODE_PATH, "utf8"));

// Figma API endpoint to PUT nodes into file
const url = `https://api.figma.com/v1/files/${FILE_KEY}/nodes`;

async function run() {
  try {
    const res = await axios.put(
      url,
      {
        nodes: {
          "0:1": node
        }
      },
      {
        headers: {
          "X-Figma-Token": FIGMA_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Success! Check your Figma file.");
    console.log(res.data);

  } catch (err) {
    console.error("Error:", err.response?.data || err);
  }
}

run();