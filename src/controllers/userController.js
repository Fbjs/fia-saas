/**
 * Actualizar datos de un usuario por su ID (tokens, plan, estado).
 */
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { tokens, plan, active } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (tokens !== undefined) user.tokens = tokens;
        if (plan) user.plan = plan;
        if (active !== undefined) user.active = active;

        await user.save();

        res.status(200).json({ message: 'Usuario actualizado correctamente', user });
    } catch (error) {
        console.error('❌ Error al actualizar usuario:', error.message);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
}

module.exports = { 
    getUserById,
    updateUser // 👈 Exportamos también esta nueva función
};
