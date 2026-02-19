import {z} from 'zod'

export enum colorsEnum {
  color1 = "rgba(197, 104, 27, 1)",
  color2 = "rgba(236, 205, 136, 1)",
  color3 = "rgba(236, 176, 136, 1)",
  color4 = "rgba(231, 227, 207, 1)",
  color5 = "add",
}

export const colorsEnumSchema = z.enum(Object.values(colorsEnum) as [string, ...string[]]);


export enum colorsEnumWithoutAdd {
  color1 = "rgba(197, 104, 27, 1)",
  color2 = "rgba(236, 205, 136, 1)",
  color3 = "rgba(236, 176, 136, 1)",
  color4 = "rgba(231, 227, 207, 1)",
}
export const colorsEnumWithoutAddSchema = z.enum(Object.values(colorsEnumWithoutAdd) as [string, ...string[]]);



export const arrayColorsEnum = [
  colorsEnumWithoutAdd.color1 ,
  colorsEnumWithoutAdd.color2 ,
  colorsEnumWithoutAdd.color3 ,
  colorsEnumWithoutAdd.color4
]
