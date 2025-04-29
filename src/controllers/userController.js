const User = require('../models/userModel');

/**
 * Obtener los datos de un usuario por su ID.
 */
async function getUserById(req, res) {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-__v');

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('❌ Error al obtener usuario:', error.message);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
}

module.exports = { getUserById };
