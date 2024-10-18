import { getCitiesFromDepartment,getDepartmentsFromRegion,getRegions } from "./geoApi.js";

const url = "https://geo.api.gouv.fr/";
const listHTML = document.querySelector('#list');
const selectRegion = document.querySelector('#region');
const selectDepartment = document.querySelector('#department');
const showCity = document.querySelector('#showCity');


const displayRegions = async () => {
	try {
		const regions = await getRegions();
		regions.forEach(region => {
			const option = document.createElement('option');
			option.textContent = region.nom;
			option.value = region.code;
			selectRegion.appendChild(option);
		});
	} catch (error) {
		console.error(error.message);
	}
};

selectRegion.addEventListener('change', async (e) => {
	const regionCode = e.target.value;
	selectDepartment.innerHTML = '';
	try {
		const departments = await getDepartmentsFromRegion(regionCode);
		departments.forEach(department => {
			const option = document.createElement('option');
			option.textContent = department.nom;
			option.value = department.code;
			selectDepartment.appendChild(option);
		});
	} catch (error) {
		console.error(error.message);
	}
})

showCity.addEventListener('click', async () => {
	const departmentCode = selectDepartment.value;
	listHTML.innerHTML = '';

	try {
		const cities = await getCitiesFromDepartment(departmentCode);
		cities.sort((a, b) => b.population - a.population);
		cities.forEach(city => {
			const li = document.createElement('li');
			li.textContent = `${city.nom} population: ${city.population}`;
			listHTML.appendChild(li);
		});
	} catch (error) {
		console.error(error.message);
	}
})

displayRegions();
