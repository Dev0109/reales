(function ($) {
  "use strict";

  // Custom options for map
  var options = {
    zoom: 14,
    mapTypeId: "Styled",
    disableDefaultUI: true,
    mapTypeControlOptions: {
      mapTypeIds: ["Styled"],
    },
    gestureHandling: 'cooperative'
  };
  var styles = [
    {
      stylers: [
        {
          hue: "#cccccc",
        },
        {
          saturation: -100,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 100,
        },
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  var newMarker = null;
  var markers = [];

  // custom infowindow object
  var infobox = new InfoBox({
    disableAutoPan: false,
    maxWidth: 202,
    pixelOffset: new google.maps.Size(-101, -285),
    zIndex: null,
    boxStyle: {
      background: "url('images/infobox-bg.png') no-repeat",
      opacity: 1,
      width: "202px",
      height: "245px",
    },
    closeBoxMargin: "28px 26px 0px 0px",
    closeBoxURL: "",
    infoBoxClearance: new google.maps.Size(1, 1),
    pane: "floatPane",
    enableEventPropagation: false,
  });

  // function that adds the markers on map
  var addMarkers = function (props, map) {
    $.each(props, function (i, prop) {
      var latlng = new google.maps.LatLng(prop.Geocode.Lat, prop.Geocode.Lng);
      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: new google.maps.MarkerImage(
          "images/marker-green.png",
          null,
          null,
          null,
          new google.maps.Size(36, 36)
        ),
        draggable: false,
        animation: google.maps.Animation.DROP,
      });
      var infoboxContent =
        '<div class="infoW">' +
        '<div class="propImg">' +
        '<img src="' +
        prop.Images[0].Url +
        '">' +
        '<div class="propBg">' +
        '<div class="propPrice">' +
        prop.DisplayPriceString +
        "</div>" +
        '<div class="propType">' +
        prop.PropertyType +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="paWrapper">' +
        '<div class="propTitle">' +
        prop.Title +
        "</div>" +
        '<div class="propAddress">' +
        prop.Address.Postcode +
        " " +
        prop.Address.State +
        " " +
        prop.Address.Street +
        " " +
        prop.Address.StreetNumber +
        " " +
        prop.Address.Suburb +
        " " +
        "</div>" +
        "</div>" +
        '<div class="propRating">' +
        '<span class="fa fa-star"></span>' +
        '<span class="fa fa-star"></span>' +
        '<span class="fa fa-star"></span>' +
        '<span class="fa fa-star"></span>' +
        '<span class="fa fa-star"></span>' +
        "</div>" +
        '<ul class="propFeat">' +
        '<li><span class="fa fa-bed"></span> ' +
        prop.Beds +
        "</li>" +
        '<li><span class="fa fa-bath"></span> ' +
        prop.Baths +
        "</li>" +
        '<li><span class="fa fa-car"></span> ' +
        prop.Cars +
        "</li>" +
        '<li><span class="icon-frame"></span> ' +
        prop.LandSize +
        "</li>" +
        "</ul>" +
        '<div class="clearfix"></div>' +
        '<div class="infoButtons">' +
        '<a class="btn btn-sm btn-round btn-gray btn-o closeInfo">Close</a>' +
        '<a href="single.html?ListingId=' +
        prop.ListingId +
        '" class="btn btn-sm btn-round btn-green viewInfo">View</a>' +
        "</div>" +
        "</div>";

      google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            infobox.setContent(infoboxContent);
            infobox.open(map, marker);
          };
        })(marker, i)
      );

      $(document).on("click", ".closeInfo", function () {
        infobox.open(null, null);
      });

      markers.push(marker);
    });
  };

  var map;
  var windowHeight;
  var windowWidth;
  var contentHeight;
  var contentWidth;
  var isDevice = true;

  // calculations for elements that changes size on window resize
  var windowResizeHandler = function () {
    windowHeight = window.innerHeight;
    windowWidth = $(window).width();
    contentHeight = windowHeight - $("#header").height();
    contentWidth = $("#content").width();

    $("#leftSide").height(contentHeight);
    $(".closeLeftSide").height(contentHeight);
    $("#wrapper").height(contentHeight);
    // $("#mapView").height(contentHeight);
    $("#content").height(contentHeight);
    setTimeout(function () {
      $(".commentsFormWrapper").width(contentWidth);
    }, 300);

    if (map) {
      google.maps.event.trigger(map, "resize");
    }

    // Add custom scrollbar for left side navigation
    if (windowWidth > 767) {
      $(".bigNav").slimScroll({
        height: contentHeight - $(".leftUserWraper").height(),
      });
    } else {
      $(".bigNav").slimScroll({
        height: contentHeight,
      });
    }
    if ($(".bigNav").parent(".slimScrollDiv").size() > 0) {
      $(".bigNav").parent().replaceWith($(".bigNav"));
      if (windowWidth > 767) {
        $(".bigNav").slimScroll({
          height: contentHeight - $(".leftUserWraper").height(),
        });
      } else {
        $(".bigNav").slimScroll({
          height: contentHeight,
        });
      }
    }

    // reposition of prices and area reange sliders tooltip
    var priceSliderRangeLeft = parseInt(
      $(".priceSlider .ui-slider-range").css("left")
    );
    var priceSliderRangeWidth = $(".priceSlider .ui-slider-range").width();
    var priceSliderLeft =
      priceSliderRangeLeft +
      priceSliderRangeWidth / 2 -
      $(".priceSlider .sliderTooltip").width() / 2;
    $(".priceSlider .sliderTooltip").css("left", priceSliderLeft);

    var areaSliderRangeLeft = parseInt(
      $(".areaSlider .ui-slider-range").css("left")
    );
    var areaSliderRangeWidth = $(".areaSlider .ui-slider-range").width();
    var areaSliderLeft =
      areaSliderRangeLeft +
      areaSliderRangeWidth / 2 -
      $(".areaSlider .sliderTooltip").width() / 2;
    $(".areaSlider .sliderTooltip").css("left", areaSliderLeft);
  };

  var repositionTooltip = function (e, ui) {
    var div = $(ui.handle).data("bs.tooltip").$tip[0];
    var pos = $.extend({}, $(ui.handle).offset(), {
      width: $(ui.handle).get(0).offsetWidth,
      height: $(ui.handle).get(0).offsetHeight,
    });
    var actualWidth = div.offsetWidth;

    var tp = { left: pos.left + pos.width / 2 - actualWidth / 2 };
    $(div).offset(tp);

    $(div).find(".tooltip-inner").text(ui.value);
  };

  windowResizeHandler();
  $(window).resize(function () {
    windowResizeHandler();
  });

  // $.fn.sideBar = `
  //       <nav class="leftNav scrollable">
  //           <div class="search">
  //               <span class="searchIcon icon-magnifier"></span>
  //               <input type="text" placeholder="Search for houses, apartments...">
  //               <div class="clearfix"></div>
  //           </div>
  //           <ul>
  //               <li class="hasSub">
  //                   <a href="#"><span class="navIcon icon-home"></span><span class="navLabel">Buy</span><span
  //                           class="fa fa-angle-left arrowRight"></span></a>
  //                   <ul>
  //                       <li><a href="explore.html?propertyType=Residential&propertyStatus=Current"> Search Residential </a></li>
  //                       <li><a href="explore.html?propertyType=Commercial&propertyStatus=Current"> Search Commercial </a></li>
  //                       <li><a href="explore.html?propertyType=Rural&propertyStatus=Current"> Search Rural </a></li>
  //                       <li><a href="explore.html?propertyType=Land&propertyStatus=Current"> Search Land </a></li>
  //                   </ul>
  //               </li>

  //               <li class="hasSub">
  //                   <a href="#"><span class="navIcon icon-key"></span><span class="navLabel">Rent</span><span
  //                           class="fa fa-angle-left arrowRight"></span></a>
  //                   <ul>
  //                       <li><a href="explore.html?propertyType=Residential&propertyStatus=OffMarket"> Search Residential </a></li>
  //                       <li><a href="explore.html?propertyType=Commercial&propertyStatus=OffMarket"> Search Commercial </a></li>
  //                       <li><a href="explore.html?propertyType=Rural&propertyStatus=OffMarket"> Search Rural </a></li>
  //                       <li role="separator" class="divider"></li>
  //                       <li><a href="#"> Maintenance Request </a></li>
  //                       <li><a href="#"> Request an Appraisal </a></li>
  //                       <li><a href="#"> Rental Application Form</a></li>
  //                   </ul>
  //               </li>

  //               <li class="hasSub">
  //                   <a href="#"><span class="navIcon fa fa-dollar"></span><span class="navLabel">Sell</span><span
  //                           class="fa fa-angle-left arrowRight"></span></a>
  //                   <ul>
  //                       <li><a href="explore.html?propertyType=Residential&propertyStatus=Sold"> Sold Residential </a></li>
  //                       <li><a href="explore.html?propertyType=Commercial&propertyStatus=Sold"> Sold Commercial </a></li>
  //                       <li><a href="explore.html?propertyType=Rural&propertyStatus=Sold"> Sold Rural</a></li>
  //                       <li role="separator" class="divider"></li>
  //                       <li><a href="#"> Request an Appraisal</a></li>
  //                   </ul>
  //               </li>

  //               <li class="hasSub">
  //                   <a href="#"><span class="navIcon icon-layers"></span><span class="navLabel">About</span><span
  //                           class="fa fa-angle-left arrowRight"></span></a>
  //                   <ul>
  //                       <li><a href="#"> Why us? </a></li>
  //                       <li><a href="#"> Request a rental appraisal </a></li>
  //                       <li><a href="#"> Client Reviews </a></li>
  //                   </ul>
  //               </li>

  //               <li><a href="#"><span class="navIcon icon-plus"></span><span class="navLabel">Contact</span></a></li>
  //           </ul>
  //       </nav>
  // `;

  $.fn.headerBar1 = `
          <div class="logo">
                <a href="index.html">
                    <span class="fa fa-home marker"></span>
                </a>
            </div>
            <a href="#" class="navHandler"><span class="fa fa-bars"></span></a>
            <div class="search">
                <span class="searchIcon icon-magnifier"></span>
                <input type="text" placeholder="Search for houses, apartments...">
            </div>
            <a href="#" class="mapHandler"><span class="icon-map"></span></a>
          
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                            <li><a href="index.html">Home</a></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                    aria-haspopup="true" aria-expanded="false">Buy <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a
                                            href="explore.html?propertyType=Residential&propertyStatus=Current">Residential</a>
                                    </li>
                                    <li><a
                                            href="explore.html?propertyType=Commercial&propertyStatus=Current">Commercial</a>
                                    </li>
                                    <li><a href="explore.html?propertyType=Rural&propertyStatus=Current">Rural</a></li>
                                    <li><a href="explore.html?propertyType=Land&propertyStatus=Current">Land</a></li>
                                    <li><a href="inspection.html">Open for Inspection</a></li>
                                    <li><a href="checklist.html"
                                            target="_blank">Due Diligence Checklist</a></li>
                                </ul>
                            </li>

                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                    aria-haspopup="true" aria-expanded="false">Rent <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a
                                            href="explore.html?propertyType=Residential&propertyStatus=OffMarket">Residential</a>
                                    </li>
                                    <li><a href="inspection.html">Open for Inspection</a></li>
                                    <li><a
                                            href="explore.html?propertyType=Commercial&propertyStatus=OffMarket">Commercial</a>
                                    </li>
                                    <li><a href="https://www.1form.com" target="_blank">Rental Application</a></li>
                                    <li><a href="#" data-toggle="modal" data-target="#modalMaintenance"> Maintenance
                                            Request </a></li>
                                    <li><a href="#" data-toggle="modal" data-target="#modalNotice">Notice to Vacate</a>
                                    </li>
                                    <li><a href="#" data-toggle="modal" data-target="#modalAppraisal">Free Market Appraisal</a></li>
                                </ul>
                            </li>


                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                    aria-haspopup="true" aria-expanded="false">Sell <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#" data-toggle="modal" data-target="#modalAppraisal"> Free Market
                                            Appraisal</a></li>
                                    <li><a href="explore.html?propertyType=All&propertyStatus=Sold">Recently Sold</a>
                                    </li>
                                </ul>
                            </li>

                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                    aria-haspopup="true" aria-expanded="false">About <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="./whyus.html"> Why us? </a></li>
                                    <li><a href="./meet_our_team.html"> Meet Our Team </a></li>
                                    <li><a href="#"> Client Reviews </a></li>
                                </ul>
                            </li>

                            <li><a href="contact.html">Contact</a></li>
                        </ul>
        </div>
                    
  `;
  $.fn.footerBar = `
  <div id="modalNotice" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="text-align-last: center">Notice to Vacate</h4>
                </div>
                <div class="modal-body">
                <form role="form">
                    <div class="form-group">
                      <label for="usrname">Tenant Name</label>
                      <input type="text" class="form-control" id="usrname" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="psw">Rental Property Address</label>
                        <input type="text" class="form-control" id="propertyadd" placeholder="">
                    </div>
                    <div class="form-group">
                      <label for="psw">Mobile</label>
                      <input type="text" class="form-control" id="mobile" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="psw">Email</label>
                        <input type="text" class="form-control" id="email" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="psw">Vacating Date</label>
                        <input type="text" class="form-control" id="vacatingdate" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="psw">Breaking Lease</label>
                        <select class="form-select form-select-lg mb-3 modalselect1"aria-label=".form-select-sm example">
                            <option selected>YES</option>
                            <option value="1">NO</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Reason for vacating and details</label>
                        <textarea class="form-control" id="details"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="psw">Forwarding Address</label>
                        <input type="text" class="form-control" id="forwardingadd" placeholder="">
                    </div>
                </form>  
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div id="modalMaintenance" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="text-align-last: center">Maintenance Request</h4>
                </div>
                <div class="modal-body">
                    <form role="form">
                        <div class="form-group">
                          <label for="usrname">Tenant Name</label>
                          <input type="text" class="form-control" id="usrname" placeholder="">
                        </div>
                        <div class="form-group">
                          <label for="psw">Phone</label>
                          <input type="text" class="form-control" id="phone" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="psw">Email</label>
                            <input type="text" class="form-control" id="email" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="psw">Property Address</label>
                            <input type="text" class="form-control" id="propertyadd" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Details</label>
                            <textarea class="form-control" id="details"></textarea>
                        </div>
                    </form>  
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div id="modalAppraisal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="text-align-last: center">Free Market Appraisal</h4>
                </div>
                <div class="modal-body">
                <form role="form">
                    <div class="form-group">
                      <label for="usrname">Name</label>
                      <input type="text" class="form-control" id="usrname" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="psw">Property Address</label>
                        <input type="text" class="form-control" id="propertyadd" placeholder="">
                    </div>
                    <div class="form-group">
                      <label for="psw">Phone</label>
                      <input type="text" class="form-control" id="phone" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="psw">Email</label>
                        <input type="text" class="form-control" id="email" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Details</label>
                        <textarea class="form-control" id="details"></textarea>
                    </div>
                </form>  
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div id="modalAppraisal1" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="text-align-last: center">Request a rental Appraisal</h4>
                </div>
                <div class="modal-body">
                    <form role="form">
                        <select class="form-select form-select-lg mb-3 modalselect" aria-label=".form-select-sm example">
                            <option selected>VIC</option>
                            <option value="1">State</option>
                        </select>
                        <select class="form-select form-select-lg mb-3 modalselect" aria-label=".form-select-sm example">
                            <option selected>Suburb</option>
                            <option value="1">Beechworth</option>
                            <option value="1">Eldorado</option>
                            <option value="1">Everton Upper</option>
                            <option value="1">Oxley</option>
                            <option value="1">Wangaratta</option>
                            <option value="1">Wooragee</option>
                            <option value="1">Yakandandah</option>
                        </select>
                        <div class="form-group" style="margin-top: 20px;">
                            <input type="text" class="form-control" id="email" placeholder="Full Name*">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="propertyadd" placeholder="Address*">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="propertyadd" placeholder="Contact Number*">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="propertyadd" placeholder="Email*">
                        </div>
                    </form>  
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                </div>
            </div>
        </div>
    </div>
  
  `;

  $.fn.setMaps = function (props) {


    $("body").removeClass("notransition");

    map = new google.maps.Map(document.getElementById("mapView"), options);
    var styledMapType = new google.maps.StyledMapType(styles, {
      name: "Styled",
    });

    map.mapTypes.set("Styled", styledMapType);
    map.setCenter(
      new google.maps.LatLng(props[0].Geocode.Lat, props[0].Geocode.Lng)
    );
    map.setZoom(10);

    addMarkers(props, map);
  };

  if (
    !(
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    )
  ) {
    $("body").addClass("no-touch");
    isDevice = false;
  }

  // Header search icon transition
  $(".search input").focus(function () {
    $(".searchIcon").addClass("active");
  });
  $(".search input").blur(function () {
    $(".searchIcon").removeClass("active");
  });

  // Notifications list items pulsate animation
  $(".notifyList a").hover(
    function () {
      $(this).children(".pulse").addClass("pulsate");
    },
    function () {
      $(this).children(".pulse").removeClass("pulsate");
    }
  );

  // Exapnd left side navigation
  var navExpanded = false;
  $(".navHandler, .closeLeftSide").click(function () {
    if (!navExpanded) {
      $(".logo").addClass("expanded");
      $("#leftSide").addClass("expanded");
      if (windowWidth < 768) {
        $(".closeLeftSide").show();
      }
      $(".hasSub").addClass("hasSubActive");
      $(".leftNav").addClass("bigNav");
      if (windowWidth > 767) {
        $(".full").addClass("m-full");
      }
      windowResizeHandler();
      navExpanded = true;
    } else {
      $(".logo").removeClass("expanded");
      $("#leftSide").removeClass("expanded");
      $(".closeLeftSide").hide();
      $(".hasSub").removeClass("hasSubActive");
      $(".bigNav").slimScroll({ destroy: true });
      $(".leftNav").removeClass("bigNav");
      $(".leftNav").css("overflow", "visible");
      $(".full").removeClass("m-full");
      navExpanded = false;
    }
  });

  // functionality for map manipulation icon on mobile devices
  $(".mapHandler").click(function () {
    if (
      $("#mapView").hasClass("mob-min") ||
      $("#mapView").hasClass("mob-max") ||
      $("#content").hasClass("mob-min") ||
      $("#content").hasClass("mob-max")
    ) {
      $("#mapView").toggleClass("mob-max");
      $("#content").toggleClass("mob-min");
    } else {
      $("#mapView").toggleClass("min");
      $("#content").toggleClass("max");
    }

    setTimeout(function () {
      var priceSliderRangeLeft = parseInt(
        $(".priceSlider .ui-slider-range").css("left")
      );
      var priceSliderRangeWidth = $(".priceSlider .ui-slider-range").width();
      var priceSliderLeft =
        priceSliderRangeLeft +
        priceSliderRangeWidth / 2 -
        $(".priceSlider .sliderTooltip").width() / 2;
      $(".priceSlider .sliderTooltip").css("left", priceSliderLeft);

      var areaSliderRangeLeft = parseInt(
        $(".areaSlider .ui-slider-range").css("left")
      );
      var areaSliderRangeWidth = $(".areaSlider .ui-slider-range").width();
      var areaSliderLeft =
        areaSliderRangeLeft +
        areaSliderRangeWidth / 2 -
        $(".areaSlider .sliderTooltip").width() / 2;
      $(".areaSlider .sliderTooltip").css("left", areaSliderLeft);

      if (map) {
        google.maps.event.trigger(map, "resize");
      }

      $(".commentsFormWrapper").width($("#content").width());
    }, 300);
  });

  // Expand left side sub navigation menus
  $(document).on("click", ".hasSubActive", function () {
    $(this).toggleClass("active");
    $(this).children("ul").toggleClass("bigList");
    $(this).children("a").children(".arrowRight").toggleClass("fa-angle-down");
  });

  if (isDevice) {
    $(".hasSub").click(function () {
      $(".leftNav ul li").not(this).removeClass("onTap");
      $(this).toggleClass("onTap");
    });
  }

  // functionality for custom dropdown select list
  $(".dropdown-select li a").click(function () {
    if (!$(this).parent().hasClass("disabled")) {
      $(this).prev().prop("checked", true);
      $(this).parent().siblings().removeClass("active");
      $(this).parent().addClass("active");
      $(this)
        .parent()
        .parent()
        .siblings(".dropdown-toggle")
        .children(".dropdown-label")
        .html($(this).text());
    }
  });



  $(".handleFilter").click(function () {
    $(".filterForm").slideToggle(200);
  });

  //Enable swiping
  $(".carousel-inner").swipe({
    swipeLeft: function (event, direction, distance, duration, fingerCount) {
      $(this).parent().carousel("next");
    },
    swipeRight: function () {
      $(this).parent().carousel("prev");
    },
  });

  $(".carousel-inner .card").click(function () {
    window.open($(this).attr("data-linkto"), "_self");
  });

  $("#content").scroll(function () {
    if ($(".comments").length > 0) {
      var visible = $(".comments").visible(true);
      if (visible) {
        $(".commentsFormWrapper").addClass("active");
      } else {
        $(".commentsFormWrapper").removeClass("active");
      }
    }
  });

  $(".btn").click(function () {
    if ($(this).is("[data-toggle-class]")) {
      $(this).toggleClass("active " + $(this).attr("data-toggle-class"));
    }
  });

  $(".tabsWidget .tab-scroll").slimScroll({
    height: "235px",
    size: "5px",
    position: "right",
    color: "#939393",
    alwaysVisible: false,
    distance: "5px",
    railVisible: false,
    railColor: "#222",
    railOpacity: 0.3,
    wheelStep: 10,
    allowPageScroll: true,
    disableFadeOut: false,
  });

  $('.progress-bar[data-toggle="tooltip"]').tooltip();
  $(".tooltipsContainer .btn").tooltip();

  $("#slider1").slider({
    range: "min",
    value: 50,
    min: 1,
    max: 100,
    slide: repositionTooltip,
    stop: repositionTooltip,
  });
  $("#slider1 .ui-slider-handle:first")
    .tooltip({ title: $("#slider1").slider("value"), trigger: "manual" })
    .tooltip("show");

  $("#slider2").slider({
    range: "max",
    value: 70,
    min: 1,
    max: 100,
    slide: repositionTooltip,
    stop: repositionTooltip,
  });
  $("#slider2 .ui-slider-handle:first")
    .tooltip({ title: $("#slider2").slider("value"), trigger: "manual" })
    .tooltip("show");

  $("#slider3").slider({
    range: true,
    min: 0,
    max: 500,
    values: [190, 350],
    slide: repositionTooltip,
    stop: repositionTooltip,
  });
  $("#slider3 .ui-slider-handle:first")
    .tooltip({ title: $("#slider3").slider("values", 0), trigger: "manual" })
    .tooltip("show");
  $("#slider3 .ui-slider-handle:last")
    .tooltip({ title: $("#slider3").slider("values", 1), trigger: "manual" })
    .tooltip("show");

  $("#autocomplete").autocomplete({
    source: [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme",
    ],
    focus: function (event, ui) {
      var label = ui.item.label;
      var value = ui.item.value;
      var me = $(this);
      setTimeout(function () {
        me.val(value);
      }, 1);
    },
  });

  $("#tags").tagsInput({
    height: "auto",
    width: "100%",
    defaultText: "Add a tag",
  });

  $("#datepicker").datepicker();

  // functionality for autocomplete address field
  if ($("#address").length > 0) {
    var address = document.getElementById("address");
    var addressAuto = new google.maps.places.Autocomplete(address);

    google.maps.event.addListener(addressAuto, "place_changed", function () {
      var place = addressAuto.getPlace();

      if (!place.geometry) {
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
      }
      newMarker.setPosition(place.geometry.location);
      newMarker.setVisible(true);
      $("#latitude").text(newMarker.getPosition().lat());
      $("#longitude").text(newMarker.getPosition().lng());

      return false;
    });
  }

  $("input, textarea").placeholder();
})(jQuery);
