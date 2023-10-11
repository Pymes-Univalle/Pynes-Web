import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function authenticateMiddleware(
  token: string | null | undefined,
  res: NextApiResponse
) {
  // Verifica si el token existe
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  // Verifica la validez del token
  try {
    const secret = 'pymes123';
    const decoded = jwt.verify(token, secret);
    // Agrega la información del usuario al objeto de solicitud
    // No es necesario modificar la solicitud (req) ya que el token se pasa como argumento
    return Promise.resolve(); // Continúa con la próxima función middleware
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
