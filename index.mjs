
import { Cookie } from './collezione.mjs'
let owned = [],
	init = false;
try {
	const cookie = Cookie.getJSON('collezione')
	owned = cookie
} catch (e) {
}
const numover = '#588494',
	numbgover = '#ffef2e',
	numout = '#efe2bd',
	numbgout = '#b31010',
	numactive = '#234854',
	numbgactive = '#ffd422',
	active = (num,pic) => {
		pic && pic.setAttribute('style','filter: contrast(90%) brightness(85%) drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.4))');
		num.style.backgroundColor = numbgactive;
		num.style.color = numactive;
	},
	out = (num,pic) => {
		pic && pic.setAttribute('style','filter: contrast(100%) brightness(100%) drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))');
		num.style.backgroundColor = numbgout;
		num.style.color = numout;
	},
	over = num => {
		num.style.backgroundColor = numbgover;
		num.style.color = numover;
	},
	cars=[];

document.querySelectorAll('.car').forEach(car => {
	const cb = car.childNodes[0].childNodes[0];
	cb.checked = false;

	const num = car.querySelector('.number');
	const pic = car.querySelector('.pic');
	car.onclick = () => {
		!cb.checked ? active(num,pic) : out(num,pic);
		cb.checked=!cb.checked;
		if (init) {
			const n = car.querySelector('.number').innerText;
			if (cb.checked) {
				owned = [ ...new Set(owned).add(n) ]
			} else {
				const set = new Set(owned)
				set.delete(n)
				owned = [...set]
			}
			Cookie.setJSON('collezione', owned, {path: '/', days: 10})
		}
	}
	car.onmouseover = () => {
		!cb.checked && over(num);
	}
	car.onmouseout = () => {
		!cb.checked ? out(num) : active(num);
	}
	cars.push(car);

})
console.log(owned);
for (let i of owned) {
	cars[i-1].click();
}
init = true
