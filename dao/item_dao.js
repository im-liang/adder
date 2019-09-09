class ItemRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
  	const sql = `
  		CREATE TABLE IF NOT EXISTS item(
  			id INTEGER PRIMARY KEY AUTOINCREMENT,
  			name TEXT,
  			price INTEGER DEFAULT 0
  		)
  	`;
  	return this.dao.run(sql);
  }

  create(name, price) {
  	return this.dao.run(
  		`INSERT INTO item(name, price) VALUES(?, ?)`,
  		[name, price]
  	);
  }

  update(item) {
  	const {id, name, price}  = item;
  	return this.dao.run(
  		`UPDATE item SET name = ?, price = ? WHERE id = ?`,
  		[name, price, id]
  	);
  }

  delete(id) {
  	return this.dao.run(
  		`DELETE FROM item WHERE id = ?`,
  		[id]
  	);
  }

  getById(id) {
  	return this.dao.get(
  		`SELECT * FROM item WHERE id = ?`, [id]
  	);
  }

  getAll() {
    return this.dao.get(
      `SELECT * FROM item`
    );
  }
}

module.exports = ItemRepository;