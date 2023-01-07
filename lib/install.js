import fs from 'node:fs';
// import process from 'node:process';
// import {fileURLToPath} from 'node:url';
// import binBuild from 'bin-build';
import bin from './index.js';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

await bin.run([]).then(() => {
	console.log('\u001B[0;32m✔\u001B[0m apngdis pre-build test passed successfully');
}).catch(error => {
	if (error.message.includes(`APNG Disassembler ${pkg.lib_version}`)) {
		console.log('\u001B[0;32m✔\u001B[0m apngdis pre-build test passed successfully');
	} else {
		console.warn(error.message);
		console.warn('\u001B[0;31m✘\u001B[0m apngdis pre-build test failed');

		// TODO: make binary building
		// console.info('compiling from source');

		// try {
		// 	const source = fileURLToPath(new URL(`../vendor/source/apngdis-${pkg.lib_version}-src.zip`, import.meta.url));

		// 	binBuild.file(source, [
		// 		`./configure --disable-shared --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
		// 		'make && make install',
		// 	]);

		// 	console.log('apngdis built successfully');
		// } catch (error) {
		// 	console.error(error.stack);

		// 	// eslint-disable-next-line unicorn/no-process-exit
		// 	process.exit(1);
		// }
	}
});
