import Tesseract from 'tesseract.js';
import path from 'path';

const langPath = `${path.join(path.resolve('.'), './tessdata')}`;
console.log(langPath);
const Tact = Tesseract.create({ langPath });

export default Tact;
