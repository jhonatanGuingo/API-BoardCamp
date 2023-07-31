import joi from "joi";

export const clientSchema = joi.object({
    name: joi.string().required().min(1),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().pattern(/^[0-9]{11}$/).required(),
    birthday: joi.date().iso().required()
})