import { createInterface, Interface, ReadLineOptions } from 'readline';

const interfaceOptions: ReadLineOptions = {

    input:  process.stdin,

    output:  process.stdout,
};

//.b=15
class Prompt {

	reader: Interface;

	//.i
	constructor() {

		this.reader = createInterface(interfaceOptions);
	}

	//.i
	getVar = (message = ''): Promise<string> => {

		return new Promise((resolve) => {

			this.reader.question(message, (answer) => {

				resolve(answer);
			});
		});
	};

	//.i
	closePrompt = () => {

		this.reader.close();
	};
}

export default Prompt;