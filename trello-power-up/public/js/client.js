/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var days = require("./days")

var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png1494946700421';

TrelloPowerUp.initialize({
    'card-buttons': function(t, options) {
        return [
            {
                icon: BLACK_ROCKET_ICON,
                text: "Track Project Duration",
                callback: function(t, options){
                    return t.popup({
                        title: 'Project Duration',
                        url: './do-shit.html',
                        height: 150
                    });
                }
            },

            {
                icon: BLACK_ROCKET_ICON,
                text: "Clear Project",
                callback: function(t, options){
                    return t.remove("card", "shared", ["startTime"])
                }     
            }
        ];                            
    },

    "card-badges": function (t, options){

        setTimeout(function(){
            window.location.reload(1);
            //The "1" in reload
        }, 5000);

        var client = new XMLHttpRequest()
        client.ontimeout = function () {
            t.render(function(){
                return t.getAll("card", "shared")
                        .then(function(sharedData){
                            if(Object.keys(sharedData).length > 0){
                                var {card: {shared: {startTime}}} = sharedData
                                var timeIntoTheProject = days.numberOfDays(startTime)
                                return t.remove("card", "shared", ["startTime"])
                                        .then(function(){
                                            return t.set("card", "shared", "duration", timeIntoTheProject)
                                        })                                                          
                                        
                                        .then(t.render(function(){
                                            return t.getAll("card", "shared")
                                                    .then(function(sharedData){
                                                        if(Object.keys(sharedData).length > 0){
                                                            var {card: {shared: {duration}}} = sharedData
                                                            return [
                                                                {
                                                                    text: duration
                                                                }
                                                            ]
                                                        }
                                                    })
                                        }))
                            }
                            return []
                        })
            })
        }
    }
});
