# apngdis-bin

> This is a bin wrapper for [APNG Disassembler](https://sourceforge.net/projects/apngdis/) `v2.9`.<br>
> Deconstructs APNG files into individual frame images.

## Install

```
$ npm install --save apngdis-bin
```

## Usage

```js
import {execFile} from 'node:child_process';
import apngdis from 'apngdis-bin';

execFile(apngdis, ['input.png', 'frameimage'], err => {
	if (err) {
		throw err;
	}

	console.log('Frame images extracted!');
});
```

## CLI

```
$ npm install --global apngdis-bin
```

```
$ apngdis
```

> **_Note_**:
>
> The **apngdis** binary does not have a neutral `--help` or `--version` command option, so to display this information, run it without any arguments. Note that this will return with exit code `1`, flagging an error even though nothing went wrong.

## Arguments & Options
From source's [**readme.txt**](vendor/source/readme.txt):
```
Usage:

apngdis anim.png [name]

--------------------------------

Decoding is implemented by parsing all chunks in the APNG file,
remuxing them into a sequence of static PNG images, and then using
regular (unpatched) libpng to decode them.

Then, after processing blend/dispose operations, we get a vector of
full-size frames in 32 bpp as the result.



Other useful tools:

APNG Assembler     -  http://apngasm.sourceforge.net/
gif2apng converter -  http://gif2apng.sourceforge.net/
```

## Related
* [**apngasm-bin**](https://github.com/vHeemstra/apngasm-bin/) - Bin wrapper for APNG Assembler

## Credits

* [APNG Disassembler](https://sourceforge.net/p/apngdis/) by [Max Stepin](https://github.com/maxstepin)
* This package is made by [Philip van Heemstra](https://github.com/vHeemstra)
* Based on [jpegtran-bin](https://github.com/imagemin/jpegtran-bin) by [Sindre Sorhus](https://github.com/sindresorhus)
