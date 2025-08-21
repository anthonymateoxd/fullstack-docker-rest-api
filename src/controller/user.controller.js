import { getConnection } from '../connection/connection.js';

// GET ALL
export const getUsuarios = async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM tb_usuarios');
    return res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching usuarios' });
  }
};

// GET ONE by ID
export const getUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM tb_usuarios WHERE id_usuario = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario not found' });
    }
    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching usuario' });
  }
};

// CREATE
export const postUsuario = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  if (!nombre || !email || !contrasena) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      'INSERT INTO tb_usuarios (nombre, email, contrasena) VALUES (?, ?, ?)',
      [nombre, email, contrasena]
    );
    return res.status(201).json({ id_usuario: result.insertId, nombre, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating usuario' });
  }
};

// UPDATE
export const putUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contrasena } = req.body;
  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      'UPDATE tb_usuarios SET nombre = ?, email = ?, contrasena = ? WHERE id_usuario = ?',
      [nombre, email, contrasena, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario not found' });
    }
    return res.json({ id_usuario: id, nombre, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating usuario' });
  }
};

// DELETE
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      'DELETE FROM tb_usuarios WHERE id_usuario = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario not found' });
    }
    return res.json({ message: 'Usuario deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting usuario' });
  }
};
