(function ($) {
  const baseurl = "http://localhost/reales/";

  var allItems = [];
  var curPages = 1;
  var AgentId = getUrlParameter("AgentId");

  $("#header").html($.fn.detailHeaderBar);
  // $("#leftSide").html($.fn.sideBar);


  $.getJSON("data/listing-agents.json", function (data) {
    allAgents = data.Items;

    allAgents.forEach(agent=>{
      if(agent['AgentId'] == AgentId){
        $(".pc-avatar img").attr("src",agent['ProfilePicture'])
        // $(".pc-name").html(agent['Name']);
        $(".pc-mobile").html(agent['Mobile']);
        $(".pc-phone").html(agent['OfficeNumber']);
        $(".pc-emails").html(agent['Email']);

      }
    });
  });
  
  $.getJSON("data/listings.json", function (data) {
    allItems = data.Items;


    //Setting maps
    $.fn.setMaps(allItems.splice(0, 10));


  });

  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? ""
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return "";
  }
})(jQuery);
