import express from 'express'

const router = express.Router({ mergeParams: true })
router.get('/', (req, res) => {
    res.send("hello!");
});
router.post('/', (req, res) => {
    res.send("hello!");
});
router.delete('/:commentId', (req, res) => {
    res.send("hello!");
});
export default router;