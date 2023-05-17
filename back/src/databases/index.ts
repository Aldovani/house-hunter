import sql from 'mssql'

const sqlConfig: sql.config = {
  user: "sa",
  password: "1q2w3e4r@#$",
  database: "HOUSE_HUNTER",
  server: 'localhost',
  options: {
    trustServerCertificate: true
  }
}


async function connect() {
  try {
    await sql.connect(sqlConfig)
  } catch (err) {
    console.log(err)
  }
}
connect()



