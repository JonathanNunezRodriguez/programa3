import { readFileSync } from 'fs';

export type ProcessFileCallback = (line: string, i?: number) => void; //.m

//.b=14
class ReadFile {

	filename: string;

	fileformat: string;

	lines: string[];

	//.i
	constructor(filename: string) { 

		this.filename = filename.split('.')[0];

		this.fileformat = filename.split('.')[1];
	}

	//.i
	readFile = () => {

		this.lines = readFileSync(`./${this.filename}.${this.fileformat}`, 'utf-8').split(/\r?\n/);
	};

	//.i
	proccesFile = (callback: ProcessFileCallback) => {
		
		this.lines.forEach(callback);
	};
}

export default ReadFile;