export function getEntryFromID(id, json) {
    var proj;
    var entry;
    for (entry of json["entries"]) {
        if (entry["id"] === id) {
            proj = entry
        }
    }
    return proj;
}

function includesValue(arr, str) {
    return JSON.stringify(arr).includes(str);
}

function sortByValue(array, value) {
 return array.sort(function(a, b) {
  var x = a[value]; var y = b[value];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
}

export function getProjectKeywords(json) {
    var allKeywords = [];
    for (let entry of json["entries"]) {
        for (let keyword of entry["keywords"]) {
            if (!includesValue(allKeywords, keyword)) {
                allKeywords.push({value: keyword, label: keyword});
            }
        }
    }
    return sortByValue(allKeywords, 'value');
}

export function getProjectPlants(json) {
    var allPlants = [];
    for (let entry of json["entries"]) {
        var plantName;
        for (let plant of entry["required_plants"]) {
            plantName = plant.name;
            if (!includesValue(allPlants, plantName)) {
                allPlants.push({value: plantName, label: plantName});
            }
        }
        for (let plant of entry["alt_plants"]) {
            plantName = plant.name;
            if (!includesValue(allPlants, plantName)) {
                allPlants.push({value: plantName, label: plantName});
            }
        }
    }
    return sortByValue(allPlants, 'value');
}

export function getProjectsWithFilters(keywords, plants, sizeValues, lightingValues, humidityValues, json) {
    var filteredProjects = [];
    for (let entry of json["entries"]) {
        if (includesValue(sizeValues, entry.size) || includesValue(lightingValues, entry.lighting) || includesValue(humidityValues, entry.humidity)) {
            filteredProjects.push(entry);
        }
        if (keywords.length > 0) {
            for (let keyword of keywords) {
                if (includesValue(entry.keywords, keyword.value) && !filteredProjects.includes(entry)) {
                        filteredProjects.push(entry);
                }
            }
        }
        if (plants.length > 0) {
            for (let plant of plants) {
                if ((includesValue(entry.required_plants, plant.value) || includesValue(entry.alt_plants, plant.value)) && !filteredProjects.includes(entry)) {
                    filteredProjects.push(entry);
                }
            }
        }
    }
    return filteredProjects;
}

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
