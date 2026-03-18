import type { objectMosadType, objectShchunaType, theJsonShchunot } from "../typesschema/neighboard.type";

class UpdateMosadHelper{

    isSameMosad(mosad1 : objectMosadType, mosad2 : objectMosadType)
    {
        return mosad1.total_students === mosad2.total_students
    }

    findMosadByChosenMosad(neighboards: theJsonShchunot , mosadChosen : objectMosadType)
    {
        for(const shchuna of neighboards)
        {
            for (const mosad of shchuna.properties.schools)
            {
                if(mosad.id == mosadChosen.id)
                {
                    return { 'mosadUpdated': mosad, 'shchuna' : shchuna}
                }
            }
        }
        return null
    }

    getTheNeighboards(neighboards : theJsonShchunot, mosad : objectMosadType , shchuna : objectShchunaType)
    {
        const newSchool = { ...mosad}
        const newProperties = {
            ...shchuna.properties, schools: [...shchuna.properties.schools.filter(school => {
                school.id !== newSchool.id
            }), newSchool]
        }
        const newShchuna = {
            ...shchuna, properties: newProperties
        }
        if (neighboards === null) {
            return
        }
        const newShchunot = [...neighboards.filter(shchuna =>
            shchuna.properties.UniqueId !== newShchuna.properties.UniqueId
        ), newShchuna]

        return newShchunot
        
    }
}

export const updateMosadHelper = new UpdateMosadHelper()