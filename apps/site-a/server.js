import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3080);

app.use('/test', (req, res) => {
    res.send('asldfjliasjdfajsdfjalisdfj')
})

import { handler } from "./app/build/handler.js"
app.use(handler);


app.listen(app.get('port'), () => {
    console.log(`server running in port ${app.get('port')}`);
})