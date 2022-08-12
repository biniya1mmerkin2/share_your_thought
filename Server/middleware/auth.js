import jwt from 'jsonwebtoken';

const auth= async (req, res, next)=>
{
    try {
        const token=req.headers.authorization.split(" ")[1];
        const iscustomtoken =token.length <500;

        let decodeddata;
        if(token && iscustomtoken)
        {
            decodeddata=jwt.verify(token,'thisismykey');
            
            req.userId=decodeddata?.id;
        }else
        {
            
            decodeddata=jwt.decode(token);
            req.userId=decodeddata?.sub;
        }

        next();
        
    } catch (error) {
        console.log(error);
    }

}

export default auth;