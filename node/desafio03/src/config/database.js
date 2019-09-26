const { DB_DIALECT, DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

module.exports = {
  dialect: DB_DIALECT,
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
