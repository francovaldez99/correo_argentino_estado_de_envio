import { interactuarConCorreoArgentino } from "../utils/correoargentino.js";

export async function chequearEstadoCorreoArgentino(req, res) {
  try {
    const { codigo } = req.params;
    if (!codigo){
      return res
        .status(400)
            .json({ message: "se necesita el codigo de seguimiento" });
    }
    const result = await interactuarConCorreoArgentino(codigo);

    return res.status(200).json({
      ...result,
      ["codigo de seguimiento"]: codigo,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "something went wrong working with chequear estado correo argentino",
      ...error,
    });
  }
}
