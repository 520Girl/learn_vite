import lodash from 'lodash';
import fengjing from '@images/fengjing.png';
import OIP_C from '@images/OIP-C.jfif';

console.log('lodash.add(1, 4)',lodash.add(1, 4));
const div = document.createElement('div');
div.innerHTML = 'Hello, Vite!';
const h1 = document.createElement('h1');
h1.textContent = 'Welcome to Vite!';
//添加图片
const img = document.createElement('img');
img.src = fengjing;
div.appendChild(img);
const img2 = document.createElement('img');
img2.src = OIP_C;
div.appendChild(img2);
div.appendChild(h1);
document.body.appendChild(div);

fetch('/api/user').then(res=>{
    console.log('res',res);
})