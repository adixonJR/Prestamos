import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "prestamos_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error MySQL:", err);
  } else {
    console.log("MySQL conectado");
  }
});
