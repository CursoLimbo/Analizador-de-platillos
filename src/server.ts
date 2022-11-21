import express from 'express';
import path from 'path';

const app = express()
const port = 5001


app.use(express.static(path.join(__dirname, "../Client/build")));
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "../Client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});


app.get('/api', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
