import fs from "fs";
import path from "path";
import translate from "translate";

// Set the translation engine
translate.engine = "libre"; // Using a free engine
translate.key = ""; // No key needed for libre

async function translateText(text) {
  return await translate(text, { to: "en" });
}

async function translateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const translatedContent = await translateText(content);
  fs.writeFileSync(filePath, translatedContent);
}

async function translateProject(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      await translateProject(filePath); // Recursively translate subdirectories
    } else if (
      file.endsWith(".js") ||
      file.endsWith(".jsx") ||
      file.endsWith(".html")
    ) {
      await translateFile(filePath);
    }
  }
}

// Start translation
translateProject("/Users/aditya/Documents/Coding/HackATL/hackATL/cliente")
  .then(() => console.log("Translation completed!"))
  .catch((err) => console.error("Error translating:", err));
