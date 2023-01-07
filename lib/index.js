// import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

// const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

// TODO: set-up releases structure
// const url = `https://raw.githubusercontent.com/vheemstra/apngdis-bin/v${pkg.version}/vendor/`;
const url = 'https://raw.githubusercontent.com/vheemstra/apngdis-bin/master/vendor/';

// TODO: auto get latest apngdis.exe from:
// https://sourceforge.net/projects/apngdis/files/${pkg.lib_version}/
// https://downloads.sourceforge.net/project/apngdis/${pkg.lib_version}/apngdis-${pkg.lib_version}-bin-linux.zip
// https://downloads.sourceforge.net/project/apngdis/${pkg.lib_version}/apngdis-${pkg.lib_version}-bin-macos.zip
// https://downloads.sourceforge.net/project/apngdis/${pkg.lib_version}/apngdis-${pkg.lib_version}-bin-win32.zip
// https://downloads.sourceforge.net/project/apngdis/${pkg.lib_version}/apngdis-${pkg.lib_version}-bin-win64.zip

const binWrapper = new BinWrapper()
	.src(`${url}macos/apngdis`, 'darwin')
	.src(`${url}linux/apngdis`, 'linux')
	.src(`${url}win/x86/apngdis.exe`, 'win32', 'x86')
	.src(`${url}win/x64/apngdis.exe`, 'win32', 'x64')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(
		process.platform === 'win32'
			? 'apngdis.exe'
			: 'apngdis'
	);

export default binWrapper;
