#!/usr/bin/env node

import { program } from "commander";

type PackageJSON = {
  version: `${number}.${number}.${number}`;
};

const { version }: PackageJSON = require("../package.json");

program
  .description("An application to lint your TODO comments")
  .version(version)
  .argument("[dir]", "Folder to check for comments")
  .action((dir) => {
    console.log(dir);
  })
  .parse(process.argv);
