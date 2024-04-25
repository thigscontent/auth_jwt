const User = require("../../src/models/User");

class UserRepository {
  // crud é necessario implementar um método para cada ação do controller, assim como as regras do sql
  async create() {
    const user = new User(req.body);
    try {
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } // criar novo elemento
  async findAll() {
    try {
      res.status(200).json(users);
      const users = await User.find();
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } // slecionar tudo, tipo select *
  async update() {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } // atuallizar
  async delete() {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Usuario deletado com sucesso" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } // deletar
}

module.exports = new UserRepository();
