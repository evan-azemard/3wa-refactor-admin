const url = "https://geo.api.gouv.fr/";

export const getRegions = async () => {
	try {
		const response = await fetch(url + 'regions');
		return response.json();
	} catch (error) {
		throw new Error(error.message);
	}
}

export const getDepartmentsFromRegion = async (regionCode) => {
	try {
		const response = await fetch(`${url}regions/${regionCode}/departements`);
		return response.json();
	} catch (error) {
		throw new Error(error.message);
	}
}

export const getCitiesFromDepartment = async (departmentCode) => {
	try {
		const response = await fetch(`${url}departements/${departmentCode}/communes`);
		return response.json();
	} catch (error) {
		throw new Error(error.message);
	}
}

