import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import { 
    registroUsuario, 
    buscarPorMail, 
    buscarPorId 
    } from '../repository/usuarioRepository.js';

export async function registrar(user, mail, pwd) {
    const hash = await bcrypt.hash(pwd, 10);
    const resultado = registroUsuario(user, mail, hash);
    return { id: resultado.lastInsertRowid, user, mail };
};

export async function login (mail, pwd){
    const buscar = buscarPorMail(mail);
    if (!buscar){
        throw new Error ('Usuario no encontrado');
    }
    const coincide = await bcrypt.compare(pwd, buscar.pwd);
    if(coincide){
        const token = jwt.sign({id:buscar.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        return token;
    }else{
        throw new Error ('Contraseña incorrecta');
    }
};

export function obtenerPerfil(token){
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return buscarPorId(decoded.id);
    }catch (err){
        throw new Error ('Error al verificar usuario');
    };
};