import Ticket from './models/ticket.model';
import Price from './models/price.model';
import sequelize from './sequelize';
import Booking from './models/booking.model';

// Define associations
Ticket.hasMany(Price, { foreignKey: 'ticketId' });
Price.belongsTo(Ticket, { foreignKey: 'ticketId' });

// Synchronize the models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Models synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing models:', error.message);
  });

export { Ticket, Price, Booking, sequelize };
