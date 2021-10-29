import app from './app';
import connectionDB from './db/connectionDB';

//just start server when the db is connected
const main = () => {
    return app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});
}

connectionDB.connectDB(main);
