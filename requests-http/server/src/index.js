const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// const corsOptions = {
//     origin: '*',
//     optionSuccessStatus: 200
// };
// app.use(cors(corsOptions));

const multipartyMiddleware = multiparty({ uploadDir: './uploads' });
app.post('/upload', multipartyMiddleware, (req, res) => {
    const files = req.files;
    console.log(files);
    res.json({ message: files });
});

app.get('/downloadExcel', (req, res) => {
    res.download('./uploads/jogos.xlsx');
});

app.get('/downloadPDF', (req, res) => {
    res.download('./uploads/otherside.pdf');
});

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(8000, () => {
    console.log('O servidor foi iniciado na porta 8000');
})
