import { type objectMosadType, type objectShchunaType, type theJsonShchunot } from "../typesschema/neighboard.type";

class TransferHelper {

    addToScoolAmount(amount: number, school: objectMosadType, neighboards: theJsonShchunot) {
        const newNeighboards = []
        for (const shchuna of neighboards) {
            if (!this.isInsideSchools(shchuna, school)) {
                newNeighboards.push(shchuna)
            }
            else {
                const schoolChosen = this.findSchools(shchuna, school)
                if(schoolChosen !== null)
                {
                    const newSchoolChosen = { ...schoolChosen, total_students: amount + schoolChosen.total_students}
                    const shchunanew = {...shchuna , properties : { ...shchuna.properties , schools : this.getAllSchoolsOfShchuna(shchuna.properties.schools , newSchoolChosen)}}
                    newNeighboards.push(shchunanew)
                }
            }
        }
        return newNeighboards
    }

    getAllSchoolsOfShchuna(schools : objectMosadType[], newSchoolChosen : objectMosadType)
    {
        const theSchools = []
        for (const shcool of schools)
        {
            if (shcool.id !== newSchoolChosen.id)
            {
                theSchools.push(shcool)
            }
            else{
                theSchools.push(newSchoolChosen)
            }
        }
        return theSchools
    }

    findSchools(newShchuna: objectShchunaType, school: objectMosadType) {
        for (const schoolInside of newShchuna.properties.schools) {
            if (schoolInside.id === school.id) {
                return schoolInside
            }
        }
        return null
    }

    isInsideSchools(shchuna: objectShchunaType, schoolChoose: objectMosadType) {
        const idsSchools = []
        for (const school of shchuna.properties.schools) {
            idsSchools.push(school.id)
        }
        return idsSchools.includes(schoolChoose.id)
    }
}

export const transferHelper = new TransferHelper()