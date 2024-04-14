const fs = require("fs-extra");
const inquirer = require("inquirer");
const { jsonrepair } = require("jsonrepair");
function createDirectoryIfNotExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}
// Prompt for mode selection
inquirer
  .prompt([
    {
      type: "list",
      name: "mode",
      message: "Select generator mode:",
      choices: ["single", "multi"],
    },
  ])
  .then(async (answers) => {
    const { mode } = answers;
    if (mode === "single") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "abiPath",
            message: "Enter the path to the ABI file:",
          },
          {
            type: "input",
            name: "outputPath",
            message: "Enter the path to the output TypeScript interface file:",
          },
        ])
        .then(async (answers) => {
          // Handle single mode
          const { abiPath, outputPath } = answers;
          const contractABI = await readABI(abiPath);
          const interfaceName =
            abiPath.split("/").pop().split(".")[0] 

          generateInterface(contractABI, interfaceName, outputPath);
        });
    } else if (mode === "multi") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "abiFolder",
            message: "Enter the path to the folder containing ABI files:",
          },
          {
            type: "input",
            name: "outputFolder",
            message:
              "Enter the path to the output folder for TypeScript interface files:",
          },
        ])
        .then(async (answers) => {
          // Handle multi mode
          const { abiFolder, outputFolder } = answers;
          const abiFiles = await fs.readdir(abiFolder);
          abiFiles.forEach(async (abiFile) => {
            const fullPath = `${abiFolder}/${abiFile}`;
            const contractABI = await readABI(fullPath);
          });
        });
    }
  });

// Read the ABI JSON file
const readABI = async (abiPath) => {
  try {
    const data = await fs.readFile(abiPath, "utf8");
    const abiRegex = /=\s*{([\s\S]*?)\s*};/;
    const match = data
      .replaceAll("\n", "")
      .replaceAll("\r", "")
      .match(abiRegex);
    const preprocessedJSON = match[1];
    let fixedJSON = jsonrepair(`{${preprocessedJSON}`);
    const object = JSON.parse(fixedJSON);
    return object?.ABI;
  } catch (error) {
    console.error("Error reading ABI file:", error);
    process.exit(1);
  }
};

// Generate TypeScript interface from ABI
const generateInterface = async (abi, interfaceName, outputPath) => {
  // Change this as needed
  const interfaceContent = `export enum ${interfaceName}ContractMethodEnum  {\n${abi
    .map(({ name, inputs, outputs, stateMutability }) => {
      if (name != "undefined") return ` ${name}="${name}" , \n`;
    })
    .join("\n")}\n}
    
    export interface  ${interfaceName}AbiInterface {\n
      ${abi
        .map(({ name, inputs, outputs, stateMutability }) => {
          if (name != "undefined") return ` ${name}="${name}" , \n`;
        })
        .join("\n")}\n
    }
    `;



  const fileName = interfaceName + ".ts";
  // Write the interface to the output file
 
  createDirectoryIfNotExists(outputPath);
  fs.writeFile(outputPath + "/" + fileName, interfaceContent, (err) => {
    if (err) {
      console.error("Error writing interface file:", err);
      process.exit(1);
    }
    console.log(`TypeScript interface generated and saved to ${outputPath}`);
  });
};
