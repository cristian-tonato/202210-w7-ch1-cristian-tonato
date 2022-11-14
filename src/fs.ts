import { Games } from './interfaces/games';
import fs from 'fs/promises';

(async () => {
    const file = './data.json';

    const data = await fs.readFile(file);
    const videogames: Array<Games> = JSON.parse(data.toLocaleString());
    const petsMeses: Array<Games> = videogames.map((item) => ({
        ...item,
        price: item.price,
    }));
    console.log(petsMeses);
    await fs.writeFile(file, JSON.stringify(petsMeses));
})();
