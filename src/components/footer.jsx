import React from "react";

export const Footer = () => {
  return (
    <div>
      <footer className="section footer-modern">
        <div className="footer-modern-body section-xl">
          <div className="container">
            <div className="row row-40 row-md-50 justify-content-xl-between">
              <div className="col-md-10 col-lg-3 col-xl-4 wow fadeInRight">
                <div className="inset-xl-right-70">
                  <h5 className="footer-modern-title">Our Gallery</h5>
                  <div
                    className="row row-10 gutters-10"
                    data-lightgallery="group"
                  >
                    <div className="col-4 col-sm-2 col-lg-4">
                      {/* Thumbnail Minimal*/}
                      <a
                        className="thumbnail-minimal"
                        href="/assets/pimages/footer-gallery-1-800x1200-original.jpg"
                        data-lightgallery="item"
                      >
                        <img
                          src="/assets/pimages/grid-gallery-1-178x178.jpg"
                          alt=""
                          width={178}
                          height={178}
                        />
                      </a>
                    </div>
                    <div className="col-4 col-sm-2 col-lg-4">
                      {/* Thumbnail Minimal*/}
                      <a
                        className="thumbnail-minimal"
                        href="/assets/pimages/footer-gallery-2-800x1200-original.jpg"
                        data-lightgallery="item"
                      >
                        <img
                          src="/assets/pimages/grid-gallery-2-178x178.jpg"
                          alt=""
                          width={178}
                          height={178}
                        />
                      </a>
                    </div>
                    <div className="col-4 col-sm-2 col-lg-4">
                      {/* Thumbnail Minimal*/}
                      <a
                        className="thumbnail-minimal"
                        href="/assets/pimages/footer-gallery-3-800x1200-original.jpg"
                        data-lightgallery="item"
                      >
                        <img
                          src="/assets/pimages/grid-gallery-3-178x178.jpg"
                          alt=""
                          width={178}
                          height={178}
                        />
                      </a>
                    </div>
                    <div className="col-4 col-sm-2 col-lg-4">
                      {/* Thumbnail Minimal*/}
                      <a
                        className="thumbnail-minimal"
                        href="/assets/pimages/footer-gallery-4-1200x800-original.jpg"
                        data-lightgallery="item"
                      >
                        <img
                          src="/assets/pimages/grid-gallery-4-178x178.jpg"
                          alt=""
                          width={178}
                          height={178}
                        />
                      </a>
                    </div>
                    <div className="col-4 col-sm-2 col-lg-4">
                      {/* Thumbnail Minimal*/}
                      <a
                        className="thumbnail-minimal"
                        href="/assets/pimages/footer-gallery-5-1200x800-original.jpg"
                        data-lightgallery="item"
                      >
                        <img
                          src="/assets/pimages/grid-gallery-5-178x178.jpg"
                          alt=""
                          width={178}
                          height={178}
                        />
                      </a>
                    </div>
                    <div className="col-4 col-sm-2 col-lg-4">
                      {/* Thumbnail Minimal*/}
                      <a
                        className="thumbnail-minimal"
                        href="/assets/pimages/footer-gallery-6-1200x800-original.jpg"
                        data-lightgallery="item"
                      >
                        <img
                          src="/assets/pimages/grid-gallery-6-178x178.jpg"
                          alt=""
                          width={178}
                          height={178}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-sm-6 col-md-7 col-lg-5 wow fadeInRight"
                data-wow-delay=".1s"
              >
                <h5 className="footer-modern-title">Quick Links</h5>
                <ul className="footer-modern-list footer-modern-list-2 d-sm-inline-block d-md-block">
                  <li>
                    <a href="shop-list.html.htm">Shop</a>
                  </li>

                  <li>
                    <a href="contact-us.html.htm">Featured Products</a>
                  </li>
                  <li>
                    <a href="contact-us.html.htm">Services</a>
                  </li>
                  <li>
                    <a href="contact-us.html.htm">Contact Us</a>
                  </li>

                  <li>
                    <a href="#">Cart</a>
                  </li>
                  <li>
                    <a href="#">Our Blog</a>
                  </li>
                </ul>
              </div>
              <div
                className="col-sm-6 col-md-5 col-lg-4 col-xl-3 wow fadeInRight"
                data-wow-delay=".2s"
              >
                <h5 className="footer-modern-title">Get in touch</h5>
                <ul className="contacts-creative">
                  <li>
                    <div className="unit unit-spacing-sm flex-column flex-md-row">
                      <div className="unit-left">
                        <span className="icon mdi mdi-map-marker linear-icon" />
                      </div>
                      <div className="unit-body">
                        <a href="#">
                          2 John doe
                          <br />
                          Lagos nigeria
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="unit unit-spacing-sm flex-column flex-md-row">
                      <div className="unit-left">
                        <span className="icon mdi mdi-phone linear-icon" />
                      </div>
                      <div className="unit-body">
                        <a href="tel:#">(+844) 123 456 78</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="unit unit-spacing-sm flex-column flex-md-row">
                      <div className="unit-left">
                        <span className="icon mdi mdi-email-outline linear-icon" />
                      </div>
                      <div className="unit-body">
                        <a href="mailto:#">info@Luvthypet.org</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-modern-panel text-center">
          <div className="container">
            <p className="rights">
              <span>©&nbsp;</span>
              <span className="copyright-year" />
              <span>&nbsp;</span>
              <span>Luvthypet </span>
              <span>. All Rights Reserved.&nbsp;</span>
              <a href="privacy">Privacy Policy</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
