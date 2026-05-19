import Database from 'better-sqlite3';

const db = new Database('usuarios.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    pwd VARCHAR(255) NOT NULL
    )
    `)

export default db;