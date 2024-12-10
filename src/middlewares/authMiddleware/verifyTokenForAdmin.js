
const verifyTokenForAdmin = async(req,res,next ) => {
    //console.log(req)
        if(['admin'].includes(req.admin.role)){
            next()
        }else{
            res.status(401).json({error:"Not Authorized. You're not an admin"})
            
        }
    
}
module.exports= verifyTokenForAdmin


