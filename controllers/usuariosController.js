import { registrar, login, obtenerPerfil } from '../services/usuariosService.js';

export async function registrarController(req, res) {
    try {
        const { user, mail, pwd } = req.body;
        const resultado = await registrar(user, mail, pwd);
        res.json(resultado);
    } catch (err) {
        res.status(400).json({ mensaje: err.message });
    }
};

export async function loginController(req, res){
    try{
        const {mail, pwd} = req.body;
        const resultado = await login(mail, pwd);
        res.json(resultado);
    }catch(err){
        res.status(400).json({mensaje: err.message});
    }
};

export async function perfilController(req, res){
    try{
        const token = req.headers.authorization?.split(' ')[1];
        const resultado = await obtenerPerfil(token);
        res.json(resultado);
    }catch(err){
        res.status(400).json({mensaje: err.message});
    }
};