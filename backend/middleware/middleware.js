function Middleware(req,res,next){
    console.log("Tanmay");
    next();
}

export default Middleware;