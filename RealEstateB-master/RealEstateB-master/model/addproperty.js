const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addProperty = new Schema({
    userId : String,
    PPDID : String,
    propType : String,
    price : Number,
    propAge : String,
    propDesc : String,
    negotiable : String,
    ownerShip : String,
    propAppro : String,
    bankLoan : String,
    length : Number,
    breath : Number,
    totalArea : Number,
    areaUnit : String,
    numOfBHK : String,
    numOfFloor : String,
    attached : String,
    westernTo : String,
    furnished : String,
    carPark : String,
    lift : String,
    electricity : String,
    facing : String,
    name : String,
    mobile : Number,
    postedBy : String,
    salesType : String,
    image : {
        data : Buffer,
        contentType : String
    },
    email : String,
    city : String,
    area : String,
    pincode : String,
    address : String,
    landMark : String,
    latitude : String,
    longitude : String
})

module.exports = mongoose.model("propertydetail",addProperty);