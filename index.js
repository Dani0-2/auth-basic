import express from 'express';
import cors from 'cors';
import db from './database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/registro', async (req, res) => {
    const registro = req.body;
    const hash = await bcrypt.hash(registro.pwd, 10);
    const pro = db.prepare('INSERT INTO usuarios (user, mail, pwd) VALUES (?, ?, ?)').run(registro.user, registro.mail, hash);
    res.json({
        mensaje: 'Usuario registrado:',
        id:pro.lastInsertRowid,
        user: registro.user,
        mail: registro.mail
    });
});

app.post('/login', async (req, res) => {
    const login = req.body;
    const buscar = db.prepare('SELECT * FROM usuarios WHERE mail = ?').get(login.mail);
    if(!buscar) {
        return res.json({mensaje: 'Usuario no encontrado'});
    };
    const coincide = await bcrypt.compare(login.pwd, buscar.pwd);
    if(coincide){
        const token = jwt.sign({id:buscar.id}, 'clave_secreta', {expiresIn: '24h'});
        res.json({mensaje: 'Login exitoso', token: token});
    }else{
        res.json({mensaje: 'Contraseña incorrecta'});
    };
});

app.get('/perfil', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try{
        const decoded = jwt.verify(token, 'clave_secreta');
        const buscar = db.prepare('SELECT id, user, mail FROM usuarios WHERE id = ?').get(decoded.id);
        res.json(buscar);
    }catch (err){
        res.json({mensaje: 'Error al verificar usuario'});
    };
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});