//.d=2
import Prompt from './Prompt';
import ReadFile, { ProcessFileCallback } from './ReadFile';
import Regression from './Regression';

//.d=2

type Pair = {

    x: number;

    y: number;
}

//.b=104
const main = async () => {

    //.d=42

	const prompter = new Prompt();

    //.d=5

    let reader: ReadFile | null = null;

    let repeat = true;

    while (repeat) {

        const filename = await prompter.getVar();
    
        //.d=2
    
        try {
    
            reader = new ReadFile(filename);
    
            reader.readFile();

            repeat = false;
    
        } catch (error) {
    
            console.error('No se pudo leer el archivo:', filename);

            console.log('Introduzca otro nombre de archivo o presione ctrl + c para salir...')
        }
    }

	//.d=20

    if (!reader) return;

    let xk = 0;
    let pairs: Pair[] = [];

    //.i
	const processFile: ProcessFileCallback = (line, i) => { //.m

        line = line.trim();

        //.d=18

        if (i === 0) {

            xk = Number(line);

        } else {

            const strPair = line.split(',');

            const pair = { x: Number(strPair[0]), y: Number(strPair[1]) };

            pairs.push(pair);
        }	
	};

    reader.proccesFile(processFile);

    const regression = new Regression(xk, pairs.map(({ x }) => x), pairs.map(({ y }) => y));

    regression.printResults();

    //.d=1

    await prompter.getVar('Press enter to exit...');
    
    prompter.closePrompt();
};

main();
