import express from 'express';
import cors from 'cors';

import loginRouter from './login.router';

const app: express.Application = express();

app.use( cors() );
app.use( express.json() );

app.use( '/login', loginRouter );

app.use(( err: any, _req: express.Request, res: express.Response, next: any ) => {
    if (err.statusCode && err.message)
        return res.status(err.statusCode).json({
            message: err.message
        });
    return next(err);
});

app.use(( err: any, _req: express.Request, res: express.Response, _next: any ) => {
    console.log(err);

    return res.status(500).json({
        message: 'Something went wrong!'
    })
});

export default app;
