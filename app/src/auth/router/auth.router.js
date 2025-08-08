import express from 'express'

const router = express.Router({ mergeParams: true })
router.post('/login', (req, res) => {
    res.send("hello!")
});
router.post('/logout', (req, res) => {
    res.send("hello!")
});
router.post('/register', (req, res) => {
    res.send("hello!")
});
router.post('/checkDuplication', (req, res) => {
    res.send("hello!")
});
export default router;