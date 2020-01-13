const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '206.189.165.104',
  database: 'EventScraper',
  password: 'curley',
  port: 5432,
})

const getMonroesData = (request, response) => {
  pool.query('SELECT * FROM monroes_event_table ORDER BY index ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getMonroesData,
}