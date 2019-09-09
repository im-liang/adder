class LogRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
  	const sql = `
  		CREATE TABLE IF NOT EXISTS log(
  			id INTEGER PRIMARY KEY AUTOINCREMENT,
  			name TEXT,
  			price INTEGER DEFAULT 0,
        purpose TEXT,
        revenue INTEGER DEFAULT 0
  		)
  	`;
  	return this.dao.run(sql);
  }

  create(name, price, purpose, revenue) {
  	return this.dao.run(
  		`INSERT INTO log(name, price, purpose, revenue) VALUES(?, ?, ?, ?)`,
  		[name, price, purpose, revenue]
  	);
  }

  update(log) {
  	const {id, name, price, purpose, revenue}  = log;
  	return this.dao.run(
  		`UPDATE log SET name = ?, price = ?, purpose = ?, revenue = ? WHERE id = ?`,
  		[name, price, purpose, revenue, id]
  	);
  }

  delete(id) {
  	return this.dao.run(
  		`DELETE FROM log WHERE id = ?`,
  		[id]
  	);
  }

  getById(id) {
  	return this.dao.get(
  		`SELECT * FROM log WHERE id = ?`, [id]
  	);
  }
}

module.exports = LogRepository;