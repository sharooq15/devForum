import { Router as routerFactory } from 'express';
import { isAlive,
    notFound,} from '../controllers';

const router = routerFactory();

router.route('/api/isAlive')
    .post(isAlive);

router.route('/api/notFound')
    .post(notFound);

const  attachRoutes = (app: any) => {
    app.use(router);
}

export default attachRoutes;