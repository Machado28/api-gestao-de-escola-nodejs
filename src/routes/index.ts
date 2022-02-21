import { Response,Request, Router } from "express";

const contactRoutes = require('./ContactRoutes/contactRoutes')
const loginRoutes = require('./LoginRoutes/loginRoutes')
const userRoutes = require('./UserRoutes/userRoutes')
const signinRoutes = require('./SigninRoutes/Signin')
const signoutRoutes = require('./SignoutRoutes/Signout')
const  routes = Router();

routes.get('/',((req:Request, res:Response,)=>{

   return res.status(200).json('well come on https//:portal-das-escolas.api')
}))

routes.use(userRoutes)
routes.use(signoutRoutes)
routes.use(signinRoutes)
routes.use(loginRoutes)
routes.use(contactRoutes)

export default routes;
