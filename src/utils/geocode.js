const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWpheWN0YyIsImEiOiJjazZldm94cHIwNmQ5M3Fvanp4b3F6bnRtIn0.FZlQ2fjoI33eFpuUMDNHPw'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
           callback('Unable to connect Geolocation service!') 
        } else if (body.features.length === 0) {
            callback('Unable to find location.Try another search.') 
        } else {
            const features=body.features[0];
            callback(undefined,{
                latitude: features.center[1],
                longitude: features.center[0],
                location: features.place_name
                })
        }
    })
    }
    module.exports=geocode