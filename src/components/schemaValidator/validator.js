let validator = require('jsonschema').Validator;
let monicaSchema = require('./schema.json');

const fs = require('fs');
const path = require('path');

let v = new validator();

const inputPath = './src/components/schemaValidator/inputs';

fs.readdir(inputPath, (err, files) => {
    if (err) {
        console.error("Error reading path: ", err);
        return
    }

    files.forEach(file => {

        let jsonfile = require(`./inputs/${file}`);
        let result = v.validate(jsonfile, monicaSchema);

        let errors = result.errors;

        if (errors.length > 0) {
            let data = JSON.stringify(result.errors, null, 2);
            fs.writeFileSync(`./src/components/schemaValidator/outputs/output_${path.parse(file).name}.json`, data);
        } else {
            console.log(`${path.parse(file).name} passed!`)
        }


    })
})


