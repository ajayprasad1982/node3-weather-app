const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/6d0e4eed9c5b7388676d66a8e3429fe3/'+latitude+','+longitude;
    //const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWpheWN0YyIsImEiOiJjazZldm94cHIwNmQ5M3Fvanp4b3F6bnRtIn0.FZlQ2fjoI33eFpuUMDNHPw'
    request({url,json:true},(error,{body})=>{
       
        if(error)
        {
           callback('Unable to connect weather service!') 
        } else if (body.error) {
            callback('unable to find location') 
        } else {
            const current=body.currently;
            callback(undefined,body.daily.data[0].summary+' It is currenlty '+current.temperature+' degree out there.'+' There is '+current.precipProbability +'% chance of rain')
        }
    })
    }
    module.exports=forecast