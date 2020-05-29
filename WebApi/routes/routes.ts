import { Router } from "express";
import app from "../app";

const router: Router = Router();

router.get('', (req, res) => {
    res.send('teste');
})

router.get('/game/:id', (req,res) => {
    if (req.params.id) {
    }
})

export default router;