var t = window.TrelloPowerUp.iframe()
var moment = require("moment")

document.getElementById("track-time").addEventListener("click", function(event){
  return t.get("card", "shared", "startTime")
  .then(function(startTime){
    if(!startTime){
      var now = new Date()
      return t.set("card", "shared", "startTime", moment(now, "YYYY-MM-DD"))
    }
  })
    .then(function(){
      return t.closePopup()
  })
})

// every half an hour page refreshes automatically
// triggers an event recalculate the time and store it with t.set
// card badges access the timeSince property and show the time

t.render(function(){
    t.sizeTo("#content").done()
})