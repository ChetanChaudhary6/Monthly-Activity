import  User  from './User'; // Import the User model from your MongoDB schema

// Function to get monthly logged-in and active users
const getMonthlyUsers = async (year: number, month: number): Promise<{ loggedIn: number, active: number }> => {
  // Define start and end dates for the specified month
  const startDate = new Date(year, month - 1, 1); // Month is 0-indexed in JavaScript Date constructor
  const endDate = new Date(year, month, 0);

  // Retrieve users who logged in within the specified month
  const loggedInUsers = await User.find({ loggedIn: { $gte: startDate, $lte: endDate } });

  let activeUserCount = 0;

  // Iterate through logged-in users to count active users
  for (const user of loggedInUsers) {
    // Check if any device was last seen during the specified month
    if (user.devices.some(device => {
      const lastSeenAt = device.lastSeenAt || new Date(0); // Default to epoch if lastSeenAt is null
      return lastSeenAt >= startDate && lastSeenAt <= endDate;
    })) {
      activeUserCount++;
    }
  }

  return { loggedIn: loggedInUsers.length, active: activeUserCount };
};

// Example usage:
const year = 2024;
const month = 3; // March
getMonthlyUsers(year, month)
  .then(({ loggedIn, active }) => {
    console.log(`Logged-in users in ${year}-${month}: ${loggedIn}`);
    console.log(`Active users in ${year}-${month}: ${active}`);
  })
  .catch(error => console.error('Error:', error));
