import db from '../database.js';

export function buscarPorMail(mail) {
    return db.prepare('SELECT * FROM usuarios WHERE mail = ?').get(mail);
};

export function registroUsuario(user, mail, hash){
    return db.prepare('INSERT INTO usuarios (user, mail, pwd) VALUES (?, ?, ?)').run(user, mail, hash);
};

export function buscarPorId(id){
    return db.prepare('SELECT id, user, mail FROM usuarios WHERE id = ?').get(id);
};