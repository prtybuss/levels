import { CreateService } from './common.js';

window.addEventListener('load', () => {
	const options = { cfg: -1 };
	const comm = CreateService(options, response => {
		console.log('Response:', response);
	});
	// login as someone
	comm.showLogin('someone', 'manager');

	btnOpen.addEventListener('click', event => {
		const radio = document.querySelector('input[name="config"]:checked');
		//console.log(radio.name, radio.value);
		const cfg = +radio.value;
		const key = `cfg_${cfg}`;
		window.open(`./level1.html?cfg=${cfg}`, key);
		event.preventDefault();
	});

	btnCount.addEventListener('click', event => {
		// TODO: рассчитайте маску выбранных конфигураций, например, для комбинации
		// (Конфигурация 0 | Конфигурация 1 | Конфигурация 2) получим cfg_mask = 7 = (1 << 0 | 1 << 1 | 1 << 2) 
		// подсчитайте количество открытых дочерних окон выбранных конфигураций
		const checkboxes = document.querySelectorAll('input[name="descend"]:checked');
		let cfg_mask;
		for (let i = 0; i < checkboxes.length; i++) {
			cfg_mask |= (1 << checkboxes[i].value)
		}
		comm.countDescendants({ cfg_mask });
		event.preventDefault();
	});

	btnClose.addEventListener('click', event => {
		const checkboxes = document.querySelectorAll('input[name="descend"]:checked');
		let cfg_mask;
		for (let i = 0; i < checkboxes.length; i++) {
			cfg_mask |= (1 << checkboxes[i].value)
		}
		comm.closeDescendants({ cfg_mask });
		event.preventDefault();
	});

});