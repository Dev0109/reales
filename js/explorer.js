(function ($) {
  
  $(".home-modal").html($.fn.modalBar);
  $("#header").html($.fn.detailHeaderBar);
  // $("#footer").html($.fn.footerBar);
  // $("#leftSide").html($.fn.sideBar);


  const baseurl = "http://localhost/reales/";
  $.getJSON("data/listings.json", function (data) {
    var items = [];
    var suburbStrs = [];
    suburbStrs = data.Items.map((e) => {
      return e.Address.Suburb;
    });
    suburbStrs = suburbStrs.filter((item, index) => suburbStrs.indexOf(item) === index);
    suburbStrs.map(e=>{
      $(".suburb-select ul").append(`<li><input type="radio" name="bedno"><a href="#">${e}</a></li>`);
    });
    $(".suburb-select li").click(function (e) {
      suburbValue = e.target.innerHTML;
      $(".suburb-select .dropdown-label").html(suburbValue);
    });    
    items = data.Items.slice(0, 6);
    for (var i = 1; i <= 6; i++) {
      $(`.cb-slideshow li:nth-child(${i}) span`).css(
        "background-image",
        "url(" + items[i - 1]["MainImageUrl"] + ")"
      );

      $("#recent-items").append(`
                 <div class="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                    <a href="single.html?ListingId=${
                      items[i - 1]["ListingId"]
                    }" class="propWidget-2">
                        <div class="fig">
                            <img src="${
                              items[i - 1]["Images"][0]["Url"]
                            }"  alt="${items[i - 1]["Title"]}">
                            <img class="blur" src="${
                              items[i - 1]["Images"][0]["Url"]
                            }" height="300" alt="Modern Residence in New York">
                            <div class="opac"></div>
                            <div class="priceCap osLight"><span>${
                              items[i - 1]["DisplayPriceString"]
                            }</span></div>
                            <div class="figType">FOR ${
                              items[i - 1]["PropertyStatus"]
                            }</div>
                            <h3 class="osLight">${items[i - 1]["Title"]}</h3>
                            <div class="address">${
                              items[i - 1]["Address"]["Postcode"]
                            } ${items[i - 1]["Address"]["State"]} ${
        items[i - 1]["Address"]["Street"]
      } ${items[i - 1]["Address"]["StreetNumber"]} ${
        items[i - 1]["Address"]["Suburb"]
      }</div>
                        </div>
                    </a>
                </div>
      `);
    }
  });


  var allItems = [];
  var curPages = 1;
  var ListingId = getUrlParameter("ListingId");



  var filterObj = {
    propertyType: getUrlParameter("propertyType"),
    propertyStatus: getUrlParameter("propertyStatus"),
    priceStart: 0,
    priceEnd: 2000000,
    bathrooms: "Any",
    cars: "Any",
    bedrooms: "Any",
  };

  $(".propertyType .dropdown-label").html(
    filterObj.propertyType == "" ? "All" : filterObj.propertyType
  );
  $(".propertyStatus .dropdown-label").html(
    filterObj.propertyStatus == "" ? "All" : filterObj.propertyStatus
  );

  $(".volume .btn-round-right").click(function () {
    var val = $(this).siblings("input").val();
    var currentVal = parseInt(val == "Any" ? 0 : val);
    if (currentVal < 5) {
      $(this)
        .siblings("input")
        .val(currentVal + 1);
    } else if (currentVal == 5) {
      $(this).siblings("input").val("5+");
    }
  });
  $(".volume .btn-round-left").click(function () {
    var val = $(this).siblings("input").val();
    var currentVal = parseInt(val == "Any" ? 0 : val);
    if (currentVal > 1) {
      $(this)
        .siblings("input")
        .val(currentVal - 1);
    } else if (currentVal == 1) {
      $(this).siblings("input").val("Any");
    }
  });

  function filterItem() {
    // curPages = 1;

    var curItems = [];
    curItems = allItems.filter(
      (e) =>
        (filterObj.propertyType == "" ||
          (filterObj.propertyType != "" &&
            e["PropertyType"] == filterObj.propertyType)) &&
        (filterObj.propertyStatus == "" ||
          (filterObj.propertyStatus != "" &&
            e["PropertyStatus"] == filterObj.propertyStatus)) &&
        e["Price"] >= filterObj.priceStart &&
        e["Price"] <= filterObj.priceEnd &&
        checkVol(e["Baths"], filterObj.bathrooms) &&
        checkVol(e["Beds"], filterObj.bedrooms) &&
        checkVol(e["Cars"], filterObj.cars)
    );
    $.fn.setMaps(curItems);
    // ------------ pagination ---------------
    curPages =
      curPages > Math.floor((curItems.length - 1) / 10 + 1)
        ? Math.floor((curItems.length - 1) / 10) + 1
        : curPages;
    var pageHtml = "";
    pageHtml += `
       <li class="disabled"><a href="#"><span class="fa fa-angle-left"></span></a></li>
       `;
    for (var i = 1; i <= Math.floor((curItems.length - 1) / 10); i++) {
      pageHtml += `
       <li class="${
         i == curPages ? "active" : ""
       }" id="page${i}"><a href="#">${i}</a></li>
       `;
    }
    pageHtml += `
     <li><a href="#"><span class="fa fa-angle-right"></span></a></li>
       `;

    $(".item-counts").html("(" + curItems.length + " items)");

    $(".pagination").html(pageHtml);
    $(".pagination li a").click(function (e) {
      curPages = e.target.innerHTML;
      filterItem();
    });

    // }

      
    // setTimeout(function () {
      
    // }, 500);
    

    $(".resultsList .row").html("");
    curItems.slice((curPages - 1) * 10, curPages * 10).forEach((item) => {
      $(".resultsList .row").append(`
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <a href="single.html?ListingId=${item["ListingId"]}" class="card">
                <div class="figure">
                    <img src="${item.Images[0].Url}" alt="image">
                    <div class="figCaption">
                        <div>${item.DisplayPriceString}</div>
                        <span class="icon-eye"> 200</span>
                        <span class="icon-heart"> 54</span>
                        <span class="icon-bubble"> 13</span>
                    </div>
                    <div class="figView"><span class="icon-eye"></span></div>
                    <div class="figType">FOR ${item.PropertyStatus}</div>
                </div>
                <h2>${item.Title}</h2>
                <div class="cardAddress"><span class="icon-pointer"></span> 
                    ${item.Address.Postcode} ${item.Address.State} ${item.Address.Street} ${item.Address.StreetNumber} ${item.Address.Suburb}
                    </div>
                <ul class="cardFeat">
                    <li><span class="fa fa-bed"></span> ${item.Beds}</li>
                    <li><span class="fa fa-bath"></span> ${item.Baths}</li>
                    <li><span class="fa fa-car"></span> ${item.Cars}</li>
                    <li><span class="icon-frame"></span> ${item.LandSize}</li>
                </ul>
                <div class="clearfix"></div>
            </a>
        </div>
    `);
    });
  }
  $.getJSON("data/listings.json", function (data) {
    allItems = data.Items;




    filterItem();

    //--- property types
    var pTypes = {},
      pStatus = {};

    allItems.forEach((item) => {
      pTypes[item["PropertyType"]] = "";
      pStatus[item["PropertyStatus"]] = "";
    });
    Object.entries(pTypes).forEach((obj) => {

      $(".propertyType ul").append(`
        <li><input type="radio" name="pType"><a href="#">${obj[0]}</a></li>
      `);
    });

    Object.entries(pStatus).forEach((obj) => {

      $(".propertyStatus ul").append(`
        <li><input type="radio" name="pType"><a href="#">${obj[0]}</a></li>
      `);
    });

    $(".propertyType li").click(function (e) {
      filterObj.propertyType =
        e.target.innerHTML == "All" ? "" : e.target.innerHTML;
      $(".propertyType .dropdown-label").html(
        filterObj.propertyType == "" ? "All" : filterObj.propertyType
      );
    });

    $(".propertyStatus li").click(function (e) {
      filterObj.propertyStatus =
        e.target.innerHTML == "All" ? "" : e.target.innerHTML;
      $(".propertyStatus .dropdown-label").html(
        filterObj.propertyStatus == "" ? "All" : filterObj.propertyStatus
      );
    });

    $(".search-btn").click(function (e) {
      filterObj.bathrooms = $(".bathrooms-vol input").val();
      filterObj.bedrooms = $(".bedrooms-vol input").val();
      filterObj.cars = $(".cars-vol input").val();
      e.preventDefault();
      filterItem();

    });
  });

  function checkVol(orgVal, formatVal) {
    if (formatVal == "Any") {
      return true;
    } else if (formatVal.substr(-1) == "+") {
      return orgVal >= parseInt(formatVal);
    } else {
      return orgVal == parseInt(formatVal);
    }
  }

  // -------- priceSlider -------------------
  $(".priceSlider").slider({
    range: true,
    min: 0,
    max: 2000000,
    values: [0, 2000000],
    step: 10000,
    slide: function (event, ui) {

      filterObj.priceStart = ui.values[0];
      filterObj.priceEnd = ui.values[1];
      $(".priceSlider .sliderTooltip .stLabel").html(
        "$" +
          ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
          ' <span class="fa fa-arrows-h"></span> ' +
          "$" +
          ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
      );
      var priceSliderRangeLeft = parseInt(
        $(".priceSlider .ui-slider-range").css("left")
      );
      var priceSliderRangeWidth = $(".priceSlider .ui-slider-range").width();
      var priceSliderLeft =
        priceSliderRangeLeft +
        priceSliderRangeWidth / 2 -
        $(".priceSlider .sliderTooltip").width() / 2;
      $(".priceSlider .sliderTooltip").css("left", priceSliderLeft);
    },
  });
  $(".priceSlider .sliderTooltip .stLabel").html(
    "$" +
      $(".priceSlider")
        .slider("values", 0)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
      ' <span class="fa fa-arrows-h"></span> ' +
      "$" +
      $(".priceSlider")
        .slider("values", 1)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  );
  var priceSliderRangeLeft = parseInt(
    $(".priceSlider .ui-slider-range").css("left")
  );
  var priceSliderRangeWidth = $(".priceSlider .ui-slider-range").width();
  var priceSliderLeft =
    priceSliderRangeLeft +
    priceSliderRangeWidth / 2 -
    $(".priceSlider .sliderTooltip").width() / 2;
  $(".priceSlider .sliderTooltip").css("left", priceSliderLeft);

  // ----------- Area Slider ------------
  $(".areaSlider").slider({
    range: true,
    min: 0,
    max: 20000,
    values: [5000, 10000],
    step: 10,
    slide: function (event, ui) {
      $(".areaSlider .sliderTooltip .stLabel").html(
        ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
          " Sq Ft" +
          ' <span class="fa fa-arrows-h"></span> ' +
          ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
          " Sq Ft"
      );
      var areaSliderRangeLeft = parseInt(
        $(".areaSlider .ui-slider-range").css("left")
      );
      var areaSliderRangeWidth = $(".areaSlider .ui-slider-range").width();
      var areaSliderLeft =
        areaSliderRangeLeft +
        areaSliderRangeWidth / 2 -
        $(".areaSlider .sliderTooltip").width() / 2;
      $(".areaSlider .sliderTooltip").css("left", areaSliderLeft);
    },
  });
  $(".areaSlider .sliderTooltip .stLabel").html(
    $(".areaSlider")
      .slider("values", 0)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
      " Sq Ft" +
      ' <span class="fa fa-arrows-h"></span> ' +
      $(".areaSlider")
        .slider("values", 1)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
      " Sq Ft"
  );
  var areaSliderRangeLeft = parseInt(
    $(".areaSlider .ui-slider-range").css("left")
  );
  var areaSliderRangeWidth = $(".areaSlider .ui-slider-range").width();
  var areaSliderLeft =
    areaSliderRangeLeft +
    areaSliderRangeWidth / 2 -
    $(".areaSlider .sliderTooltip").width() / 2;
  $(".areaSlider .sliderTooltip").css("left", areaSliderLeft);

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
