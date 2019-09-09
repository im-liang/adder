class PurposeRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
  	const sql = `
  		CREATE TABLE IF NOT EXISTS purpose(
  			id INTEGER PRIMARY KEY AUTOINCREMENT,
  			name TEXT,
  			revenue INTEGER DEFAULT 0
  		)
  	`;
  	return this.dao.run(sql);
  }

  create(name, revenue) {
  	return this.dao.run(
  		`INSERT INTO purpose(name, revenue) VALUES(?, ?)`,
  		[name, revenue]
  	);
  }

  update(purpose) {
  	const {id, name, revenue}  = purpose;
  	return this.dao.run(
  		`UPDATE purpose SET name = ?, revenue = ? WHERE id = ?`,
  		[name, revenue, id]
  	);
  }

  delete(id) {
  	return this.dao.run(
  		`DELETE FROM purpose WHERE id = ?`,
  		[id]
  	);
  }

  getById(id) {
  	return this.dao.get(
  		`SELECT * FROM purpose WHERE id = ?`, [id]
  	);
  }

  getAll() {
    return this.dao.all(
      `SELECT * FROM purpose`
    );
  }
}

module.exports = PurposeRepository;