export const getUserController = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    status: 200,
    message: 'Successfully found user!',
    data: user,
  });
};
