import Notification from '../models/notification.js';

export async function getNotificaciones(req, res) {
  try {
    const notificaciones = await Notification.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(notificaciones);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener notificaciones" });
  }
}

export async function checkNotificacion(req, res) {
  try {
    const { id } = req.params;
    await Notification.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { read: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al marcar como leída" });
  }
}
