/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Router as routerFactory } from 'express';
import { isAlive,
    notFound,} from '../controllers';

const router = routerFactory();

router.route('/api/isAlive')
    .post(isAlive);

router.route('/api/notFound')
    .post(notFound);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const  attachRoutes = (app: any) => {
    app.use(router);
}

export default attachRoutes;