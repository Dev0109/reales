(function ($) {
  const baseurl = "http://localhost/reales/";

  var suburbValue = "";
  $.getJSON("data/listings.json", function (data) {
    var items = [];
    var suburbStrs = [];
    suburbStrs = data.Items.map((e) => {
      return e.Address.Suburb;
    });
    suburbStrs = suburbStrs.filter((item, index) => suburbStrs.indexOf(item) === index);
    suburbStrs.map(e => {
      $(".suburb-select ul").append(`<li><input type="radio" name="bedno"><a href="#">${e}</a></li>`);
    });

    $(".suburb-select li").click(function (e) {
      suburbValue = e.target.innerHTML;
      $(".suburb-select .dropdown-label").html(suburbValue);
    });
    // $('.suburb-select').chosen().trigger("chosen:updated");




    var residential = data.Items.filter((e) => {
      return e['PropertyType'] == 'Residential';
    }).slice(0, 2);
    var rural = data.Items.filter((e) => {
      return e['PropertyType'] == 'Rural';
    }).slice(0, 2);
    var land = data.Items.filter((e) => {
      return e['PropertyType'] == 'Land';
    }).slice(0, 2);
    var commercial = data.Items.filter((e) => {
      return e['PropertyType'] == 'Commercial';
    }).slice(0, 2);
    items = [...residential];
    items = [...items, ...rural];
    items = [...items, ...land];
    items = [...items, ...commercial];

    // items = data.Items.slice(0, 6);
    for (var i = 1; i <= 6; i++) {
      $(".cb-slideshow li:nth-child(" + i + ") span").css(
        "background-image",
        "url(" + items[i - 1]["MainImageUrl"] + ")"
      );

      $("#recent-items").append(`
                 <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <a href="single.html?ListingId=${items[i - 1]["ListingId"]
        }" class="propWidget-2">
                        <div class="fig">
                            <img src="${items[i - 1]["Images"][0]["Url"]
        }"  alt="${items[i - 1]["Title"]}">
                            <img class="blur" src="${items[i - 1]["Images"][0]["Url"]
        }" height="300" alt="Modern Residence in New York">
                            <div class="opac"></div>
                            <div class="priceCap osLight"><span>${items[i - 1]["DisplayPriceString"]
        }</span></div>
                            <div class="figType">FOR ${items[i - 1]["PropertyStatus"]
        }</div>
                            <h3 class="osLight">${items[i - 1]["Title"]}</h3>
                            <div class="address">${items[i - 1]["Address"]["Postcode"]
        } ${items[i - 1]["Address"]["State"]} ${items[i - 1]["Address"]["Street"]
        } ${items[i - 1]["Address"]["StreetNumber"]} ${items[i - 1]["Address"]["Suburb"]
        }
       <br>
        <img src="images/hotel-bed-fill-svgrepo-com.svg" alt="image" class="bed1"/>${items[i - 1]["Baths"]} ${"  "}
        <img src="images/bath-svgrepo-com.svg" alt="image" class="bed1" />${items[i - 1]["Beds"]}   
        <img src="images/car-svgrepo-com.svg" alt="image" class="bed1"/>${items[i - 1]["Cars"]}
     
        </div>
                        </div>
                    </a>
                </div>
      `);

    }

    for (var i = 1; i <= 2; i++) {
      $(".cb-slideshow li:nth-child(" + i + ") span").css(
        "background-image",
        "url(" + items[i - 1]["MainImageUrl"] + ")"
      );

      $("#recent-item").append(`
      <div class="row">
                 <div class="col-4">
                    <a href="single.html?ListingId=${items[i - 1]["ListingId"]
        }" class="propWidget-2">
                        <div class="fig">
                            <img src="${items[i - 1]["Images"][0]["Url"]
        }"  alt="${items[i - 1]["Title"]}">
                            <img class="blur" src="${items[i - 1]["Images"][0]["Url"]
        }" height="300" alt="Modern Residence in New York">
                            <div class="opac"></div>
                            <div class="priceCap osLight"><span>${items[i - 1]["DisplayPriceString"]
        }</span></div>
                            <div class="figType">FOR ${items[i - 1]["PropertyStatus"]
        }</div>
                            <h3 class="osLight">${items[i - 1]["Title"]}</h3>
                            <div class="address">${items[i - 1]["Address"]["Postcode"]

        } ${items[i - 1]["Address"]["State"]} ${items[i - 1]["Address"]["Street"]
        } ${items[i - 1]["Address"]["StreetNumber"]} ${items[i - 1]["Address"]["Suburb"]
        }
        
        
        </div>
                        </div>
                    </a>
                </div>
        </div>
      `);

      $("#inspection-item").append(`
          <div class="date-mg date-mg1">
              <div class="col-12">
                  <div class="card">
                      <div class="card-body">
                          <h2 class="ofi-date">
                              <b> Saturday </b> 30 Apr 2022
                          </h2>
                      </div>
                  </div>
              </div>
          </div>
          <div class="row">
                 <div class="col-md-4 img-mg img-mg1">
                    <a href="single.html?ListingId=${items[i - 1]["ListingId"]
        }" class="propWidget-2">
                        <div class="fig">
                            <img src="${items[i - 1]["Images"][0]["Url"]
        }"  alt="${items[i - 1]["Title"]}">
                            <img class="blur" src="${items[i - 1]["Images"][0]["Url"]
        }" height="300" alt="Modern Residence in New York">
                            <div class="opac"></div>
                            <div class="priceCap osLight"><span>${items[i - 1]["DisplayPriceString"]
        }</span></div>
                            <div class="figType">FOR ${items[i - 1]["PropertyStatus"]
        }</div>
                            <h3 class="osLight">${items[i - 1]["Title"]}</h3>
                            <div class="address">${items[i - 1]["Address"]["Postcode"]
        } ${items[i - 1]["Address"]["State"]} ${items[i - 1]["Address"]["Street"]
        } ${items[i - 1]["Address"]["StreetNumber"]} ${items[i - 1]["Address"]["Suburb"]
        }</div>
                        </div>
                    </a>
                </div>
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-md-8 text-left">              
                      <h5 class="street-heading">32 &amp; 34 Montague Street</h5>
                      <p class="suburb-heading">GOULBURN NSW 2580</p>

                      <div class="icon-insp1">
                        <div class="icon-insp">
                          3 <img src="images/hotel-bed-fill-svgrepo-com.svg" alt="image" class="bed"></img>
                        </div>
                        <div class="icon-insp">
                          2 <img src="images/bath-svgrepo-com.svg" alt="image" class="bath"></img>
                        </div>
                        <div class="icon-insp">
                          1 <img src="images/car-svgrepo-com.svg" alt="image" class="bath"></img>
                        </div>
                      </div>

                    </div>
                    <div class="time col-md-3">
                      10:00 AM - 10:30 AM
                    </div>
                    <a href="single.html?ListingId=${items[i - 1]["ListingId"]}" class="btn btn-green btn-detail">Details
                      <span class="mdl-button__icon-right "><i class="fa fa-angle-right"></i></span>
                    </a>
                  </div>
                </div>
          </div>
      `);
    }
  });




  $.getJSON("data/listing-agents.json", function (data) {
    var items = data.Items;
    // items = data.Items.slice(0, 4);
    for (var i = 1; i <= 6; i++) {
      $("#agent-items").append(`
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div class="agent">
                        <a href="profile.html?AgentId=${items[i - 1]["AgentId"]
        }" class="agent-avatar">
                            <img src="${items[i - 1]["ProfilePicture"]}" alt="${items[i - 1]["Name"]
        }">
                            <div class="ring"></div>
                        </a>
                        <div class="agent-name osLight">${items[i - 1]["Name"]
        }</div>
                        <div class="agent-job osLight">${items[i - 1]["Mobile"]
        }</div>
                        <div>
                          <a href="mailto:${items[i - 1]["Email"]}" class="btn btn-sm btn-icon btn-round btn-o btn-green"><span class="fa fa-envelope-o"></span></a> 
                          <a href="#" class="btn btn-sm btn-icon btn-round btn-o btn-facebook"><span class="fa fa-facebook"></span></a>
                        </div>
                    </div>
                </div>
      `);
    }
  });

  $(".home-header").html($.fn.headerBar);
  $(".home-modal").html($.fn.modalBar);
  $(".home-footer").html($.fn.footerBar);
})(jQuery);
