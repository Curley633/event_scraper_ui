const Pool = require('pg').Pool
require('dotenv').config()
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PWORD,
  port: 5432,
})

const getMonroesData = (request, response) => {
  pool.query('SELECT * FROM monroes_event_table ORDER BY index ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    response.status(200).json(results.rows)
  })
}

const getBlabbermouthData = (request, response) => {
  pool.query('SELECT * FROM blabbermouth_news_article_table ORDER BY index ASC LIMIT 100', (error, results) => {
    if (error) {
      throw error
    }
    response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    response.status(200).json(results.rows)
  })
}

const getDMEData = (request, response) => {
  pool.query('SELECT * FROM dme_events_table ORDER BY index ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    response.status(200).json(results.rows)
  })
}

const getMetalCellData = (request, response) => {
  pool.query('SELECT * FROM metal_cell_podcasts ORDER BY index ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getMonroesData,
  getBlabbermouthData,
  getDMEData,
  getMetalCellData,
}