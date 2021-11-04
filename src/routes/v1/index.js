const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const lopRoute = require('./lop.route');
const sinhvienRoute = require('./sinhvien.route');
const appareRoute = require('./appare.route');
const productRoute = require('./product.route');
const categoriesRoute = require('./categories.route');
const motoRoute = require('./moto.route');
const carRoute = require('./car.route');
const peopleRoute = require('./people.route');
const professionalRoute = require('./professional.route');
const worksforRoute = require('./worksfor.route');
const companiesRoute = require('./companies.route');
const loptRoute = require('./lopt.route');
const nhacungcapRoute = require('./nhacungcap.route');
const loaidichvuRoute = require('./loaidichvu.route');
const dongxeRoute = require('./dongxe.route');
const mucphiRoute = require('./mucphi.route');
const dangkicungcapRoute = require('./dangkicungcap.route');
const detaiRoute = require('./detai.route');
const khoaRoute = require('./khoa.route');
const giangvienRoute = require('./giangvien.route');
const huongdanRoute = require('./huongdan.route');
const baiTap1Route = require('./bai-tap-1.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/lops',
    route: lopRoute,
  },
  {
    path: '/sinhviens',
    route: sinhvienRoute,
  },
  {
    path: '/appares',
    route: appareRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/categoriess',
    route: categoriesRoute,
  },
  {
    path: '/motos',
    route: motoRoute,
  },
  {
    path: '/cars',
    route: carRoute,
  },
  {
    path: '/peoples',
    route: peopleRoute,
  },
  {
    path: '/professionals',
    route: professionalRoute,
  },
  {
    path: '/worksfors',
    route: worksforRoute,
  },
  {
    path: '/companiess',
    route: companiesRoute,
  },
  {
    path: '/lopts',
    route: loptRoute,
  },
  {
    path: '/nhacungcap',
    route: nhacungcapRoute,
  },
  {
    path: '/loaidichvu',
    route: loaidichvuRoute,
  },
  {
    path: '/dongxe',
    route: dongxeRoute,
  },
  {
    path: '/mucphi',
    route: mucphiRoute,
  },
  {
    path: '/dangkicungcap',
    route: dangkicungcapRoute,
  },
  {
    path: '/detai',
    route: detaiRoute,
  },
  {
    path: '/khoa',
    route: khoaRoute,
  },
  {
    path: '/giangvien',
    route: giangvienRoute,
  },
  {
    path: '/huongdan',
    route: huongdanRoute,
  },
  {
    path: '/baitap1',
    route: baiTap1Route,
  },
];
const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
