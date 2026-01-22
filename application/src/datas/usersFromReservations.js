import reservations from './reservations.json';

const uniqueUsers = reservations.reduce((acc, res) => {
  const existing = acc.find(u => u.clientName === res.clientName);
  
  if (!existing) {
    acc.push({
      id: acc.length + 1,
      name: res.clientName,
      email: `${res.clientName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      role: 'client',
      hasReservation: true,
    });
  }
  
  return acc;
}, []);

export default uniqueUsers;