const db = require("../config/db");

class FavoritesRepository {
  listByUser(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM Favorites WHERE userId = ? ORDER BY createdAt DESC`,
        [userId],
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });
  }

  add({ userId, videoId, title, channelTitle, thumbnailUrl }) {
    const createdAt = new Date().toISOString();

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Favorites (userId, videoId, title, channelTitle, thumbnailUrl, createdAt)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, videoId, title, channelTitle, thumbnailUrl, createdAt],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID });
        }
      );
    });
  }

  remove({ userId, favoriteId }) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM Favorites WHERE id = ? AND userId = ?`,
        [favoriteId, userId],
        function (err) {
          if (err) return reject(err);
          resolve(this.changes > 0);
        }
      );
    });
  }
}

module.exports = new FavoritesRepository();
