import React from "react";

export const Error = () => {
  return (
    <div>
      <div>
        <div className="preloader">
          <div className="preloader-body">
            <div className="cssload-bell">
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
            </div>
          </div>
        </div>
        <div className="page">
          <section
            className="section section-single context-dark bg-image overlay-darken"
            style={{ backgroundImage: "url(/assets/pimages/bg-404.jpg)" }}
          >
            <div className="section-single-inner">
              <header className="section-single-header page-header">
                <div className="page-head-inner">
                  <a className="brand" href="/">
                    <img
                      className="brand-logo-dark !-mt-[60px]"
                      src="/assets/img/petlogo.png"
                      alt=""
                      width={168}
                      height={60}
                    />
                  </a>
                </div>
              </header>
              <div className="section-single-main !-mt-[140px]">
                <div className="container">
                  <div className="title-modern !text-white">404</div>
                  <h3 className="text-uppercase fw-light text-spacing-100 bg-yellow-100 w-fit rounded-3xl mx-auto px-3">
                    Page Not Found
                  </h3>
                  <a
                    className="button button-md button-primary button-zakaria"
                    href="/"
                  >
                    Go to home page
                  </a>
                </div>
              </div>
              <div className="section-single-footer">
                <div className="container text-center">
                  <p className="rights">
                    <span>©&nbsp;</span>
                    <span className="copyright-year" />
                    <span>&nbsp;</span>
                    <span>Luvthypet </span>
                    <span>. All Rights Reserved.&nbsp;</span>
                    <a href="privacy-policy.html.htm">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="snackbars" id="form-output-global" />
      </div>
    </div>
  );
};
