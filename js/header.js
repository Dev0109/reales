(function ($) {

    
  $.fn.mainMenu = `
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
                        <li><a href="due_diligence.html"
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
                        <li><a href="data/rental_application.pdf" target="_blank">Rental Application</a></li>
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
                        <li><a href="./client_review.html"> Client Reviews </a></li>
                    </ul>
                </li>

                <li><a href="contact.html">Contact</a></li>
                </ul>
  `;
  $.fn.detailHeaderBar = `
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
        ${$.fn.mainMenu}
        </div>        
  `;

  $.fn.footerBar = `
  <div class="home-wrapper">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
                    <div class="osLight footer-header">Company</div>
                    <ul class="footer-nav pb20">
                        <li><a href="whyus.html">Why us</a></li>
                        <li><a href="meet_our_team.html">Meet Our Team</a></li>
                        <li><a href="client_review.html">Client Reviews</a></li>
                        <li><a href="#">Terms & Privacy</a></li>
                    </ul>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
                    <div class="osLight footer-header">Discover</div>
                    <ul class="footer-nav pb20">
                        <li><a href="explore.html?propertyType=Residential&propertyStatus=Current">Buy</a></li>
                        <li><a href="explore.html?propertyType=Residential&propertyStatus=Sold">Sold</a></li>
                        <li><a href="explore.html?propertyType=Residential&propertyStatus=OffMarket">Rent</a></li>
                        <li><a href="#" data-toggle="modal" data-target="#modalAppraisal">Free Market Appraisal</a></li>
                    </ul>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <div class="osLight footer-header">Get in Touch</div>
                    <ul class="footer-nav pb20">
                        <li class="footer-phone"><span class="fa fa-phone"></span> 1800 123 456</li>
                        <li class="footer-address osLight">
                            <p>10 Main Street</p>
                            <p>Melbourne VIC 3000</p>
                            <!-- <p>Australian</p> -->
                        </li>
                        <li><a href="#" class="btn btn-sm btn-icon btn-round btn-o btn-white"><span
                                    class="fa fa-facebook"></span></a> <a href="#"
                                class="btn btn-sm btn-icon btn-round btn-o btn-white"><span
                                    class="fa fa-twitter"></span></a> <a href="#"
                                class="btn btn-sm btn-icon btn-round btn-o btn-white"><span
                                    class="fa fa-google-plus"></span></a> <a href="#"
                                class="btn btn-sm btn-icon btn-round btn-o btn-white"><span
                                    class="fa fa-linkedin"></span></a> </li>
                    </ul>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <div class="osLight footer-header">Subscribe to Our Newsletter</div>
                    <form role="form">
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="Email Address">
                        </div>
                        <div class="form-group">
                            <a href="#" class="btn btn-green btn-block">Subscribe</a>
                        </div>
                    </form>
                </div>
            </div>

            <div class="copyright footer-nav"><span id="copy-year"></span> Marvelli Real Estate. All Rights Reserved.<br>
                <li class="pt"><a href="https://realsoftware.com.au/" target="_blank" class="realsoft">Powered by Real Software</a></li>
            </div>
            <script>
                var Xmas = new Date();
                var year = Xmas.getFullYear();
                document.getElementById("copy-year").innerHTML = year;
            </script>
        </div>

  `;

  $.fn.headerBar = `
  <nav class="navbar">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar" style="background-color:grey;"></span>
                            <span class="icon-bar" style="background-color:grey;"></span>
                            <span class="icon-bar" style="background-color:grey;"></span>
                        </button>
                        <a class="px-1" href="./">
                            <img src="images/logo1.png" style="width:150px;"  class="white-logo" alt="Marvelli Real Estate Logo">
                            <img src="images/logo2.png" style="width:150px; margin-top: 10px;" class="yellow-logo" alt="Marvelli Real Estate Logo">
                        </a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        ${$.fn.mainMenu}
                    </div>
                </div><!-- /.container-fluid -->
                
    </nav>
            
                    
  `;
  $.fn.modalBar = `
  <div class="modal fade" id="signin" role="dialog" aria-labelledby="signinLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
      <div class="modal-content">
          <div class="modal-header">
              <h4 class="modal-title" id="signinLabel">Sign In</h4>
          </div>
          <div class="modal-body">
              <form role="form">
                  <div class="form-group">
                      <div class="btn-group-justified">
                          <a href="explore.html" class="btn btn-lg btn-facebook"><span
                                  class="fa fa-facebook pull-left"></span>Sign In with Facebook</a>
                      </div>
                  </div>
                  <div class="form-group">
                      <div class="btn-group-justified">
                          <a href="explore.html" class="btn btn-lg btn-google"><span
                                  class="fa fa-google-plus pull-left"></span>Sign In with Google</a>
                      </div>
                  </div>
                  <div class="signOr">OR</div>
                  <div class="form-group">
                      <input type="text" placeholder="Email Address" class="form-control">
                  </div>
                  <div class="form-group">
                      <input type="password" placeholder="Password" class="form-control">
                  </div>
                  <div class="form-group">
                      <div class="row">
                          <div class="col-xs-6">
                              <div class="checkbox custom-checkbox"><label><input type="checkbox"><span
                                          class="fa fa-check"></span> Remember me</label></div>
                          </div>
                          <div class="col-xs-6 align-right">
                              <p class="help-block"><a href="#" class="text-green">Forgot password?</a></p>
                          </div>
                      </div>
                  </div>
                  <div class="form-group">
                      <div class="btn-group-justified">
                          <a href="explore.html" class="btn btn-lg btn-green">Sign In</a>
                      </div>
                  </div>
                  <p class="help-block">Don't have an account? <a href="#" class="modal-su text-green">Sign Up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</div>

<div class="modal fade" id="signup" role="dialog" aria-labelledby="signupLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
      <div class="modal-content">
          <div class="modal-header">
              <h4 class="modal-title" id="signupLabel">Sign Up</h4>
          </div>
          <div class="modal-body">
              <form role="form">
                  <div class="form-group">
                      <div class="btn-group-justified">
                          <a href="explore.html" class="btn btn-lg btn-facebook"><span
                                  class="fa fa-facebook pull-left"></span>Sign Up with Facebook</a>
                      </div>
                  </div>
                  <div class="form-group">
                      <div class="btn-group-justified">
                          <a href="explore.html" class="btn btn-lg btn-google"><span
                                  class="fa fa-google-plus pull-left"></span>Sign Up with Google</a>
                      </div>
                  </div>
                  <div class="signOr">OR</div>
                  <div class="form-group">
                      <input type="text" placeholder="First Name" class="form-control">
                  </div>
                  <div class="form-group">
                      <input type="text" placeholder="Last Name" class="form-control">
                  </div>
                  <div class="form-group">
                      <input type="text" placeholder="Email Address" class="form-control">
                  </div>
                  <div class="form-group">
                      <input type="password" placeholder="Password" class="form-control">
                  </div>
                  <div class="form-group">
                      <input type="password" placeholder="Confirm Password" class="form-control">
                  </div>
                  <div class="form-group">
                      <div class="btn-group-justified">
                          <a href="explore.html" class="btn btn-lg btn-green">Sign Up</a>
                      </div>
                  </div>
                  <p class="help-block">Already a Reales member? <a href="#" class="modal-si text-green">Sign
                          In</a></p>
              </form>
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
      <h4 class="modal-title" style="text-align-last: center"><b>Free Market Appraisal</b></h4>
      </div>
      <div class="modal-body">
            <div style="padding: 10px;">
                <p style="font-family: emoji; font-size: 16px;">
                    Find out what your home is worth and book your free market appraisal today.
                </p>
                <p style="font-family: emoji; font-size: 16px;">
                    Complete our online form and we will contact you to arrange a time.<br>
                    Receive the following;
                </p>
                <p style="font-family: emoji; font-size: 16px;">
                    Latest suburb sales<br>
                    Comprehensive market analysis<br>
                    Suburb trends and statistics<br>
                    The most effective method to sell your property<br>
                    Innovative market strategy
                </p>
            </div>
              <form role="form">
                  <div class="form-group">
                  <label for="usrname">Name</label>
                  <input type="text" class="form-control" id="usrname" placeholder="">
                  </div>
                  
                  <div class="form-group">
                  <label for="psw">Phone</label>
                  <input type="number" class="form-control" id="phone" placeholder="">
                  </div>
                  <div class="form-group">
                      <label for="psw">Email</label>
                      <input type="text" class="form-control" id="email" placeholder="">
                  </div>
                  <div class="form-group">
                      <label for="psw">Address</label>
                      <input type="text" class="form-control" id="propertyadd" placeholder="">
                  </div>
                  <div class="form-group">
                    <form>
                        <div class="form-group">
                        <label for="sel1">Appraisal</label>
                        <select class="form-control" id="sel1">
                            <option>Sale</option>
                            <option>Rental</option>
                        </select>
                        </div>
                    </form>
                  </div>
                  <div class="form-group">
                      <label for="message-text" class="col-form-label">Comments</label>
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
                  <select class="form-select form-select-lg mb-3 modalselect"
                      aria-label=".form-select-sm example">
                      <option selected>VIC</option>
                      <option value="1">State</option>
                  </select>
                  <select class="form-select form-select-lg mb-3 modalselect"
                      aria-label=".form-select-sm example">
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
})(jQuery);
