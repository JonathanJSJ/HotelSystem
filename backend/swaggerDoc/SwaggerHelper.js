import fs from 'fs';
import path from 'path';

function loadSwaggerFiles(directory) {
  const swaggerFiles = fs.readdirSync(directory).filter(file => file.endsWith('.json'));
  
  let combinedPaths = {};
  let info = { title: "Hotel booking system API", version: "1.0.0" };

  swaggerFiles.forEach(file => {
    const filePath = path.join(directory, file);
    const swaggerData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    combinedPaths = { ...combinedPaths, ...swaggerData.paths };

    if (swaggerData.info) {
      info = { ...info, ...swaggerData.info };
    }
  });

  return {
    swagger: "2.0",
    info: info,
    paths: combinedPaths
  };
}

export const combinedSwagger = loadSwaggerFiles(path.join(process.cwd(), 'swaggerDoc'));