import type { typeToSearch } from "../types/TypesAllProject"
import type { objectMosadType } from "../typesschema/neighboard.type"
import { colorHelper } from "./ColorHelper"
import { getDistance } from 'geolib';

class SchoolsHelper{

     getTheSchools(mosads: objectMosadType[], toSearch: typeToSearch) {
            if (toSearch['orderToShowInAB']) {
                mosads.sort((a: objectMosadType, b: objectMosadType) => a.name.localeCompare(b.name))
            }
            if (toSearch['orderToShowInPrecentMax']) {
                mosads.sort((a: objectMosadType, b: objectMosadType) => this.getBetterSchool(a, b))
            }
            mosads = this.getAccordingColor(mosads, toSearch)
            return mosads
        }

    getTheSchoolsTransfer(mosads: objectMosadType[], toSearch: typeToSearch , mosadChosen : objectMosadType) {

        if (toSearch['orderToShowInAB']) {
            mosads.sort((a: objectMosadType, b: objectMosadType) => a.name.localeCompare(b.name))
        }
        if (toSearch['orderToShowInPrecentMax']) {
            mosads.sort((a: objectMosadType, b: objectMosadType) => this.getBetterSchool(a, b))
        }
        mosads = this.getAccordingColorAndTransfer(mosads, toSearch , mosadChosen)
        return mosads
    }

    getAccordingColorAndTransfer(theMosads: objectMosadType[], toSearch: typeToSearch , mosadChosen : objectMosadType) {
        const colors = toSearch['showColors']
        const textInclude = toSearch['worlds']
        const theColorsGood = []
        for (const color in colors) {
            if (color === 'red' || color === 'yellow' || color === 'orange') {
                if (colors[color]) {
                    theColorsGood.push(color)
                }
            }
        }
        const goodMosads = []
        for (const mosad of theMosads) {
            if (theColorsGood.includes(colorHelper.getTheColorSchool(mosad)) && (textInclude.length === 0 || mosad.name.includes(textInclude)) && (toSearch['distnace'] === 0 ||toSearch['distnace'] >= this.getDistance(mosadChosen, mosad))) {
                goodMosads.push(mosad)
            }
        }
        return goodMosads
    }

    getDistance(mosadChosen : objectMosadType , mosad : objectMosadType)
    {
        const distance = getDistance(
            { latitude: mosadChosen.latitude, longitude: mosadChosen.longitude },
            { latitude: mosad.latitude, longitude: mosad.longitude } 
        );
        return distance

    }


    
    
        getAccordingColor(theMosads: objectMosadType[], toSearch: typeToSearch) {
            const colors = toSearch['showColors']
            const textInclude = toSearch['worlds']
            const theColorsGood = []
            for (const color in colors) {
                if (color === 'red' || color === 'yellow' || color === 'orange') {
                    if (colors[color]) {
                        theColorsGood.push(color)
                    }
                }
            }
            const goodMosads = []
            for (const mosad of theMosads) {
                if (theColorsGood.includes(colorHelper.getTheColorSchool(mosad)) && (textInclude.length === 0 || mosad.name.includes(textInclude))) {
                    goodMosads.push(mosad)
                }
            }
            return goodMosads
        }
    
        getThePrecentTfusa(mosad: objectMosadType) {
            return mosad.total_students / mosad.shelter_area
        }
    
        getBetterSchool(a: objectMosadType, b: objectMosadType) {
            if (this.getThePrecentTfusa(a) > this.getThePrecentTfusa(b)) {
                return -1
            }
            else if (this.getThePrecentTfusa(a) < this.getThePrecentTfusa(b)) {
                return 1
            }
            return 0
        }
    
}

export const schoolsHelper = new SchoolsHelper()