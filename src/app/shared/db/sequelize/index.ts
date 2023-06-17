import { Sequelize } from 'sequelize';

const database = '2brother';
const username = 'spendr';
const password = 'GUMq2fpiSeYktF3V4CBK3hQFC9akgdF2';
const host = 'dpg-chbad6e7avjcvo4uf5sg-a.oregon-postgres.render.com';

const sequelize = new Sequelize({
  database,
  username,
  password,
  dialect: 'postgres',
  host,
  port: 5432,
  // ssl: true,
  protocol: 'tcp',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
