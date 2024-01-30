import ApiError from "../middlewares/api-error.middleware";
import {OpenService} from "../services/openService";
export class OpenController{
/*static async create(req,res,next){
    try {
        const body=req.body;
        const result= await OpenService.createNotification(body.date,body.link);
        return   res.json({result});
    }
    catch (error) {
        // Перевірка, чи об'єкт помилки є екземпляром ApiError
        if (error instanceof ApiError) {
            // Повертаємо відповідь клієнту з використанням властивостей з вашого класу ApiError
            console.log('err:',error.statusCode);
            res.status(error.statusCode).json({ error: { message: error.message } });
        } else {
            // Інші неочікувані помилки обробляються власним способом
            next(error);
        }
    }
}*/
static async getNotification(req,res,next){
    try {
        const date=req?.params?.date
        console.log('ip:',req.ip)
      /*  console.log('ip2:',req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress ||
            null);*/
        const ip=req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress ||
            null
        console.log('ip2:',ip);
        const id=req.query.id
        const result= await OpenService.getNotification(date,ip,id);
        return   res.json(result);
    }
    catch (error) {
        if (error instanceof ApiError) {
            console.log('err:',error.statusCode);
            console.log('error:',error);
            res.status(error.statusCode).json({ error: { message: error.message } });
        } else {
            next(error);
        }
    }
}
}