import { Router } from "express";
import { fork } from 'child_process'
import path from 'path'

const scriptPath = path.resolve(__dirname, '../utils/operacion.js');
 
const router = Router();

router.get('/randoms', (req, res) => {
    const cant = req.query.cant || 100000000

    const computo  = fork(scriptPath)
    computo.send(cant)

    computo.on('message', (resultado) => {
        res.json({
            result: resultado
        })
    })
})


module.exports = router;