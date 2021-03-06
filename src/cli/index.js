/* eslint no-process-exit:0 */
"use strict";

const program        = require("commander");
const validations    = require("./validations");
const actions        = require("./actions");

function presentError(e) {
    process.stderr.write(actions.formatError(e));
    process.exit(1);
}

try {
    program
        .version(require("../../package.json").version)
        .option(
            "-T --output-type <type>",
            validations.validOutputTypeRE + ". Default: svg",
            validations.validOutputType
        ).option(
            "-I --input-type <type>",
            validations.validInputTypeRE + ". Default: smcat",
            validations.validInputType
        ).option(
            "-E --engine <type>",
            validations.validEngineRE + ". Default: dot",
            validations.validEngine
        ).option(
            "-i --input-from <file>",
            "File to read from. use - for stdin."
        ).option(
            "-o --output-to <file>",
            "File to write to. use - for stdout."
        ).option(
            "-l --license",
            "Display license and exit",
            () => {
                process.stdout.write(actions.LICENSE);
                process.exit(0);
            }
        ).arguments(
            "[infile]"
        ).parse(
            process.argv
        );
    validations.validateArguments(
        require("./normalizations").normalize(program.args[0], program)
    )
    .then(actions.transform)
    .catch(presentError);
} catch (e) {
    presentError(e);
}

/*
    This file is part of smcat.

    smcat is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    smcat is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with smcat.  If not, see <http://www.gnu.org/licenses/>.
*/
