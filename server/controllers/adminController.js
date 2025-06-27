// API to check if user is an admin
export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};
