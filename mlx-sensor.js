var mlxIRsensor = require('./mlx90614.js');
module.exports = function(RED) {
    function mlx90614(config) {
        RED.nodes.createNode(this,config);

        var node = this;
        const mlx = new mlxIRsensor();
        var msg = {
            topic:"temperature",
            payload:{
                object:"NaN",
                ambient:"NaN"
            }
        }

        this.on('input', function(msg) {
            if (msg) {
                mlx.readObject(gotObjectTemp)
            }
        });    

        function gotObjectTemp(err,temp) {
            if (err) {
                node.log(err);
            }
            else {
                msg.payload.object = temp;
                mlx.readAmbient(gotAmbientTemp)
            }
        };


        function gotAmbientTemp(err,temp) {
            if (err) {
                node.log(err);
            }
            else {
                msg.payload.ambient = temp;
                node.send(msg);
            }
        };

        this.on('close', function(removed, done) {
            if (removed) {
            } 
            else {
            }
            mlx.close();
            done();
        });  
    }
    RED.nodes.registerType("mlx-sensor",mlx90614);
}
