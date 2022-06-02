const customHeader = (req, res, next) => {

    console.log(req.headers);

    try{
        const api_key = req.headers.api_key;
        if(api_key === "api-tony-123"){
            next();
        }else{
            res.status(403);
            res.send({error:'API_KEY_NOT_VALID'});
        }
    }catch(err){
        res.status(403);
        res.send({error:'ALGO_PASO_EN_EL_CUSTOM_HEADER'});
    }
}

module.exports = customHeader;