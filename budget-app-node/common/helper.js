var moment = require("moment")

exports.addAuditFields=(text,data)=>{
    let audit = {
        updatedon: moment().format("YYYY-MM-DD HH:MM:SS"),
        updatedby: "req.decoded.ui",
        createdon: moment().format("YYYY-MM-DD HH:MM:SS"),
        createdby: "req.decoded.ui",
      };

    if(text=="create"){
        data.createdon = audit.createdon;
        data.createdby = audit.createdby;
    }else{
        if(text=="create"){
        data.updatedby = audit.updatedby;
        data.updatedon = audit.updatedon;
        }
    }
    
    return data;
}