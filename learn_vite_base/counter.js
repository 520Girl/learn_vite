import lodashEs from 'lodash-es';
import style from '@/css/module/footer.module.css'
import text from '@/css/module/text.module.css'
console.log(lodashEs.add(1, 2));
console.log(import.meta.env)
console.log(style);

const number = 0;

//创建一个div
const div = document.createElement('div');
div.innerHTML = 'Hello World';
document.body.appendChild(div);
div.classList.add(style.footer);

//创建一个div
const div2 = document.createElement('div');
div2.innerHTML = 'Hello World2';
document.body.appendChild(div2);
div2.classList.add(text.footer);

export default number;