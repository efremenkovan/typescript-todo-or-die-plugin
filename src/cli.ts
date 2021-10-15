#!/usr/bin/env node

import { program } from "commander";

program
  .description("An application to lint your TODO comments")
  .version("0.3.0")
  .parse(process.argv);
