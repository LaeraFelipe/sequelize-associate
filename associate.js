const fs = require('fs');
const path = require('path');
const sequelize = require('sequelize');

function getModelsToAssociate(path) {
  let result = [];

  const requiredValue = require(path);

  if (requiredValue === undefined) {
    return result;
  }

  if (requiredValue instanceof sequelize.Model) {
    result.push(requiredValue);
  } else if (requiredValue.default && requiredValue.default instanceof sequelize.Model) {
    result.push(requiredValue.default);
  } else if (Object.keys(requiredValue).length) {
    for (const subRequiredValue of Object.values(requiredValue)) {
      if (subRequiredValue instanceof sequelize.Model) {
      result.push(subRequiredValue);
      }
    }
  }

  return result;
}

function loadModelsRecursively(directory, { recursive = true, pattern = undefined }, models = {}) {
  const paths = fs.readdirSync(directory);
  for (const filename of paths) {
    const fullFilename = path.resolve(directory, filename);
    const stat = fs.statSync(fullFilename);
    if (recursive && stat.isDirectory()) {
      loadModelsRecursively(fullFilename, { recursive, pattern }, models);
    } else {
      if (path.extname(filename) === '.js') {
        if (pattern === undefined || (pattern && pattern.test(filename))) {
          const modelsToAssociate = getModelsToAssociate(fullFilename);
          if (modelsToAssociate.length) {
            for (const modelToAssociate of modelsToAssociate) {
              models[modelToAssociate.name] = modelToAssociate;
            }
          }
        }
      }
    }
  }
  return models;
}

function associate(directory, options = {}) {
  let models = loadModelsRecursively(directory, options);
  for (const modelName in models) {
    const model = models[modelName];
    if (model.associate && typeof model.associate === 'function') {
      model.associate(models);
    }
  }
  return models;
}

module.exports = associate;