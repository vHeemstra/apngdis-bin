import fs from 'node:fs';
// import path from 'node:path';
// import process from 'node:process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {execa} from 'execa';
// import {temporaryDirectoryTask} from 'tempy';
import binCheck from 'bin-check';
// import binBuild from 'bin-build';
import compareSize from 'compare-size';
import apngdis from '../index.js';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

// TODO: make binary building
// test('rebuild the apngdis binaries', async t => {
// 	// Skip the test on Windows
// 	if (process.platform === 'win32') {
// 		t.pass();
// 		return;
// 	}

// 	const temporary = temporaryDirectory();
// 	const source = fileURLToPath(new URL(`../vendor/source/apngdis-${pkg.lib_version}-src.zip`, import.meta.url));

// 	await binBuild.file(source, [
// 		`./configure --disable-shared --prefix="${temporary}" --bindir="${temporary}"`,
// 		'make && make install',
// 	]);

// 	t.true(fs.existsSync(path.join(temporary, 'apngdis')));
// });

test('return path to binary and verify that it is working', async (t) => {
	t.true(
		await binCheck(apngdis, [])
			.then(() => true)
			.catch((error) =>
				error.message.includes(`APNG Disassembler ${pkg.lib_version}`)
			)
	);
});

test('disassembles APNG into separate frame files', async (t) => {
	const src = fileURLToPath(new URL('fixtures/input.png', import.meta.url));
	const expected = fileURLToPath(
		new URL('fixtures/expected*.png', import.meta.url)
	);
	const destName = 'output';
	const dest = fileURLToPath(
		new URL(`fixtures/${destName}*.png`, import.meta.url)
	);
	const args = [src, destName];

	await execa(apngdis, args);

	// let nr = '';
	let results = [];
	for (let i = 1; i <= 50; i++) {
		const nr = i.toFixed(0).padStart(2, '0');

		// Frame image PNGs
		const expectedPath = expected.replace('*', nr);
		const destPath = dest.replace('*', nr);
		results.push(
			compareSize(expectedPath, destPath).then((result) => {
				fs.rmSync(destPath);

				return [
					result[destPath] > 0,
					result[destPath] === result[expectedPath],
				];
			})
		);

		// Frame delay TXTs
		const expectedPath2 = expectedPath.replace(/\.png$/, '.txt');
		const destPath2 = destPath.replace(/\.png$/, '.txt');
		results.push(
			compareSize(expectedPath2, destPath2).then((result) => {
				fs.rmSync(destPath2);

				return [
					result[destPath2] > 0,
					result[destPath2] === result[expectedPath2],
				];
			})
		);
	}

	results = await Promise.all(results);

	let allPresent = true;
	let allEqual = true;
	for (const [present, equal] of results) {
		allPresent = allPresent && present;
		allEqual = allEqual && equal;
	}

	t.true(allPresent);
	t.true(allEqual);
});
