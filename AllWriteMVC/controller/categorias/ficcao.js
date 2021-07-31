import db from "../../database/models/index.js"
import jwt from "jsonwebtoken"

class Ficcao{
    async GET(req, res){

        const token = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET)

        const {route, user} = await db.Registro.findOne({
          where:{
            id: token.id
          }
        })

        res.render("ficcao", {
            errorUser: false,
            profile: route,
            user
        })
    }
    POST(req, res){
        return
    }

    PUT(req, res){
        return
    }

    DELETE(req, res){
        return
    }
}


export default new Ficcao
