module.exports.register = async (req, res, next) => {
  try{
    const { username, email, password }= req.body
    console.log(username, email, password);
  } catch (err) {
    next(err)
  }
}