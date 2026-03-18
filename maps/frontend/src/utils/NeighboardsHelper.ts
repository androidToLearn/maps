import type { typeToSearch } from "../types/TypesAllProject";
import type { objectShchunaType } from "../typesschema/neighboard.type";
import { colorHelper } from "./ColorHelper";

class NeighboardsHelper {
    getTheNeighboards(neighhboards: objectShchunaType[], toSearch: typeToSearch) {
        const theNeighboards = { 'neighboards': [...neighhboards] }

        if (toSearch['orderToShowInAB']) {
            theNeighboards['neighboards'].sort((a: objectShchunaType, b: objectShchunaType) => a.properties.shemshchun.localeCompare(b.properties.shemshchun))
        }
        if (toSearch['orderToShowInPrecentMax']) {
            theNeighboards['neighboards'].sort((a: objectShchunaType, b: objectShchunaType) => this.getBetterShchuna(a, b))
        }
        theNeighboards['neighboards'] = this.getAccordingColor(theNeighboards['neighboards'], toSearch)
        return theNeighboards['neighboards']
    }


    getAccordingColor(theNeighboards: objectShchunaType[], toSearch: typeToSearch) {
        const colors = toSearch['showColors']
        const isEmptyPlaceAlso = toSearch['isToShowEmptyShchunot']
        const textInclude = toSearch['worlds']
        const theColorsGood = []
        for (const color in colors) {
            if (color === 'red' || color === 'yellow' || color === 'orange') {
                if (colors[color]) {
                    theColorsGood.push(color)
                }

            }
        }
        console.log(theColorsGood)
        const goodNeighboards = []
        for (const neighbord of theNeighboards) {
            if (theColorsGood.includes(colorHelper.getColorShcuna(neighbord)) && (isEmptyPlaceAlso || !this.isEmptyPlace(neighbord)) && (textInclude.length === 0 || neighbord.properties.shemshchun.includes(textInclude))) {
                goodNeighboards.push(neighbord)
            }
        }
        return goodNeighboards
    }

    isEmptyPlace(shchuna: objectShchunaType) {
        return shchuna.properties.schools.length === 0
    }

    getThePrecentTfusa(shchuna: objectShchunaType) {
        const numStudents = { 'numStudents': 0 }
        const numPlaces = { 'numPlaces': 0 }
        for (const school of shchuna.properties.schools) {
            numStudents['numStudents'] += school.total_students
            numPlaces['numPlaces'] += school.shelter_area
        }
        return numStudents['numStudents'] / numPlaces['numPlaces']
    }

    getBetterShchuna(a: objectShchunaType, b: objectShchunaType) {
        if (this.getThePrecentTfusa(a) > this.getThePrecentTfusa(b)) {
            return -1
        }
        else if (this.getThePrecentTfusa(a) < this.getThePrecentTfusa(b)) {
            return 1
        }
        return 0
    }


}

export const neighboardsHelper = new NeighboardsHelper()