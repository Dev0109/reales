(function ($) {
  const baseurl = "http://localhost/reales/";

  $(".home-modal").html($.fn.modalBar);
  $("#header").html($.fn.detailHeaderBar);
  // $("#leftSide").html($.fn.sideBar);

  var allItems = [];
  var ListingId = "";

  $.getJSON("data/listings.json", function (data) {
    allItems = data.Items;
    
    ListingId = getUrlParameter("ListingId");
    var selectedItem = {};
    allItems.forEach((item) => {
      if (item["ListingId"] == ListingId) {
        selectedItem = item;
        //Setting maps

        $.fn.setMaps([selectedItem]);
        return;
      }
    });
    
    $('.item-cost').html(selectedItem.DisplayPriceString);
    $('.property-type').html(selectedItem.PropertyType);
    if(selectedItem.PropertyType=="Commercial"){
      $('.features').addClass('display-none');
      $('.commercial-view').html(`
        <p>Floor Area: ${selectedItem.LandSize}</p>
        <p>Zoning:</p>
      `);
    }
    if(selectedItem.DisplayVideo){
      $('.video-link').attr('href',selectedItem.VideoUrl);
    }else{
      $('.video-link-div').addClass("display-none");
    }
    if(selectedItem.DisplayFloorPlan){
      $('.fp-link').attr('href',selectedItem.FloorPlanUrl);
    }else{
      $('.fp-link-div').addClass("display-none");
    }
    if(selectedItem.DisplayStatementOfInformation){
      $('.st-link').attr('href',selectedItem.FloorPlanUrl);
    }else{
      $('.st-link-div').addClass("display-none");
    }
    
    for (var i = 0; i < selectedItem.Images.length; i++) {
      $("#item-images").append(`
          <div class="item ${i ? "" : "active"}">
              <img src="${selectedItem.Images[i].Url}">
              <div class="container">
                  <div class="carousel-caption">

                  </div>
              </div>
          </div>
      `);
      // class="active"
      $("#item-images-indicators").append(`
          <li data-target="#carouselFull" data-slide-to="${i}"></li>
      `);
    }

    $("#item-title").html(selectedItem.Title);
    $("#item-address").html(
      `${selectedItem.Address.StreetNumber}
      ${selectedItem.Address.Street}
      ${selectedItem.Address.Suburb} ,
      ${selectedItem.Address.State}  
      ${selectedItem.Address.Postcode} `
    );
    $("#item-description").html(selectedItem.Description);
    $("#item-bathrooms").html(selectedItem.Baths);
    $("#item-bedrooms").html(selectedItem.Beds);
    $("#item-cars").html(selectedItem.Cars);
    $("#item-area").html(selectedItem.LandSize);

    var similarItems = [];
    similarItems = allItems.filter((item) => {
      return (
        item.PropertyType == selectedItem.PropertyType &&
        item.PropertyStatus == selectedItem.PropertyStatus
      );
    });

    for (var k = 1; k <= 3; k++) {
      for (
        var i = 0;
        i <= Math.min(15, Math.floor(similarItems.length - 1 / k));
        i++
      ) {
        var innerhtml = "";
        similarItems.slice(i * 3, 3).forEach((sItem) => {
          innerhtml += `
                    <div class="col-xs-${12 / k}">
                      <a href="single.html?ListingId=${
                        sItem["ListingId"]
                      }" class="card">
                          <div class="figure">
                              <img src="${sItem.Images[0].Url}" alt="image">
                              <div class="figCaption">
                                  <div>${sItem.DisplayPriceString}</div>
                                  <span class="icon-eye"> 200</span>
                                  <span class="icon-heart"> 54</span>
                                  <span class="icon-bubble"> 13</span>
                              </div>
                              <div class="figView"><span class="icon-eye"></span></div>
                              <div class="figType">FOR ${
                                sItem.PropertyStatus
                              }</div>
                          </div>
                          <h2>${sItem.Title}</h2>
                          <div class="cardAddress"><span class="icon-pointer"></span> 
                          ${sItem.Address.StreetNumber}
                          ${sItem.Address.Street}
                          ${sItem.Address.Suburb} ,
                          ${sItem.Address.State}  
                          ${sItem.Address.Postcode} 
                              </div>
                          <ul class="cardFeat">
                              <li><img src="images/hotel-bed-fill-svgrepo-com.svg" alt="image" class="bed1"/> ${
                                sItem.Beds
                              }</li>
                              <li><img src="images/bath-svgrepo-com.svg" alt="image" class="bath1"/> ${
                                sItem.Baths
                              }</li>
                              <li><img src="images/car-svgrepo-com.svg" alt="image" class="bed1"/> ${
                                sItem.Cars
                              }</li>
                              <li><span class="icon-frame"></span> ${
                                sItem.LandSize
                              }</li>
                          </ul>
                          <div class="clearfix"></div>
                      </a>
                  </div>
          `;
        });

        $(`#carouselSimilar-${k} .carousel-inner`).append(`
            <div class="item ${i ? "" : "active"}">
                <div class="row">
                  ${innerhtml} 
                </div>
            </div>
        `);

        // class="active"
        $(`#carouselSimilar-${k} .carousel-indicators`).append(`
            <li data-target="#carouselSimilar-${k}" data-slide-to="${i}"  class="${
          i ? "" : "active"
        }"></li>
        `);
      }
    }

    $.getJSON("data/listing-agents.json", function (data) {
      var agents = data.Items;
      var selectedAgent = {};

      agents.forEach((agent) => {
        if (
          selectedItem.ListingAgents[1] &&
          agent.Name == selectedItem.ListingAgents[1].DisplayName
        ) {
          $("#agent-name").html(agent.Name);
          $(".agentAvatarImg").attr("src", agent.ProfilePicture);
          $(".client-link").attr(
            "href",
            "profile.html?AgentId=" + agent.AgentId
          );
          $(".agentMobile").html(agent.Mobile);
          
          return;
        }
        if (agent.Name == selectedItem.ListingAgents[0].DisplayName) {
          $("#agent-name").html(agent.Name);
          $(".agentAvatarImg").attr("src", agent.ProfilePicture);
          $(".client-link").attr(
            "href",
            "profile.html?AgentId=" + agent.AgentId
          );
          $(".agentMobile").html(agent.Mobile);
          return;
        }
      });
    });
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
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  }
})(jQuery);
