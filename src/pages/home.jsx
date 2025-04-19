import React, { useEffect } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import ProductsListHome from "./productListHome";

export const Home = () => {
  useEffect(() => {
    // Wait for DOM to mount
    const preloader = $(".preloader");

    console.log(preloader);

    if (preloader.length > 0) {
      preloader.addClass("loaded"); // Or your custom animation logic
    }
  }, []);
  return (
    <div>
      <div>
        <title>Home</title>

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
          {/* Page Header*/}
          <Navbar></Navbar>
          {/* Main screen*/}
          <section
            className="section section-xxl !bg-[#00000018]  bg-blend-darken "
            style={{ backgroundImage: 'url("/assets/pimages/home-bg-1.jpg")' }}
          >
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-xl-7 col-md-8 text-start ">
                  <h1
                    className="customfont !text-white"
                    data-caption-animate="fadeInLeft"
                    data-caption-delay={100}
                  >
                    Luvthypet
                  </h1>
                  <h3 className="lt-spacing-75 offset-top-10 text-transform-uppercase ">
                    Make Your pets Happy
                  </h3>
                  <h4
                    className="mt-3 fw-regular md:max-w-[80%] !text-[white] lg:!text-[black]"
                    data-caption-animate="fadeInLeft"
                    data-caption-delay={400}
                  >
                    Our Pet Shop values quality, comfort, and individuality of
                    our products and services.
                  </h4>
                  <div
                    className="button-wrap"
                    data-caption-animate="fadeInLeft"
                    data-caption-delay={550}
                  >
                    <a
                      className="button !border-0 !bg-black !text-white hover"
                      href="shop-list.html.htm"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* About Us*/}
          <section className="section section-xl section-last bg-default">
            <div className="container">
              <h2 className="wow fadeScale menufont">Featured Products</h2>
              {/* Owl Carousel */}
              <div
                className="owl-carousel owl-style-8"
                data-loop="false"
                data-items={1}
                data-sm-items={2}
                data-lg-items={3}
                data-margin={30}
                data-dots="true"
                data-mouse-drag="false"
              >
                <article
                  className="box-info-modern wow slideInUp"
                  data-wow-delay=".1s"
                >
                  <a className="box-info-modern-figure link-img" href="#">
                    <img
                      src="/assets/pimages/about-1-370x276.jpg"
                      alt="Pet Clothing"
                      width={370}
                      height={276}
                    />
                  </a>
                  <h4 className="box-info-modern-title">
                    <a href="#">Pet Clothing</a>
                  </h4>
                  <p>
                    Comfortable and stylish outfits for every kind of pet
                    personality.
                  </p>
                  <a className="box-info-modern-link" href="#">
                    Visit Store
                  </a>
                </article>

                <article className="box-info-modern wow slideInUp">
                  <a className="box-info-modern-figure link-img" href="#">
                    <img
                      src="/assets/pimages/about-2-370x276.jpg"
                      alt="Grooming Supplies"
                      width={370}
                      height={276}
                    />
                  </a>
                  <h4 className="box-info-modern-title">
                    <a href="#">Grooming Supplies</a>
                  </h4>
                  <p>
                    Top-quality tools and products to keep your pets clean and
                    healthy.
                  </p>
                  <a className="box-info-modern-link" href="#">
                    Visit Store
                  </a>
                </article>

                <article
                  className="box-info-modern wow slideInUp"
                  data-wow-delay=".1s"
                >
                  <a className="box-info-modern-figure link-img" href="#">
                    <img
                      src="/assets/pimages/about-3-370x276.jpg"
                      alt="Pet Food"
                      width={370}
                      height={276}
                    />
                  </a>
                  <h4 className="box-info-modern-title">
                    <a href="#">Pet Food</a>
                  </h4>
                  <p>
                    Nourishing meals and treats made with pets’ health in mind.
                  </p>
                  <a
                    className="box-info-modern-link text-yellow-700 hover:!text-yellow-500 transition-all"
                    href="#"
                  >
                    Visit Store
                  </a>
                </article>
              </div>
            </div>
          </section>

          {/* New products*/}
          <section className="section !py-[85px] section-last bg-gray-1">
            <div className="container">
              <h2 className="inset-sm-20 font-semibold md:!text-4xl menufont">
                Our Services
              </h2>
              <div className="row row-50 ">
                <div className="col-sm-6 col-md-4">
                  <article className="box-icon-classic text-sm-left">
                    <div className="unit flex-column flex-sm-row flex-md-column flex-xl-row">
                      <div className="unit-left">
                        <div className="box-icon-classic-icon !bg-yellow-700">
                          <img
                            src="/assets/pimages/icon-01-50x50.png"
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                      </div>
                      <div className="unit-body">
                        <h4 className="box-icon-classic-title">
                          <a href="#">Grooming</a>
                        </h4>
                        <p className="box-icon-classic-text">
                          Gentle, expert care to keep your pet clean, styled,
                          and happy.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="col-sm-6 col-md-4">
                  <article className="box-icon-classic text-sm-left">
                    <div className="unit flex-column flex-sm-row flex-md-column flex-xl-row">
                      <div className="unit-left">
                        <div className="box-icon-classic-icon !bg-yellow-700">
                          <img
                            src="/assets/pimages/icon-05-42x50.png"
                            alt=""
                            width={42}
                            height={50}
                          />
                        </div>
                      </div>
                      <div className="unit-body">
                        <h4 className="box-icon-classic-title">
                          <a href="#">Veterinary Care</a>
                        </h4>
                        <p className="box-icon-classic-text">
                          On-site health checks and expert care for your pet's
                          well-being.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="col-sm-6 col-md-4">
                  <article className="box-icon-classic text-sm-left">
                    <div className="unit flex-column flex-sm-row flex-md-column flex-xl-row">
                      <div className="unit-left">
                        <div className="box-icon-classic-icon !bg-yellow-700">
                          <img
                            src="/assets/pimages/icon-06-50x44.png"
                            alt=""
                            width={50}
                            height={44}
                          />
                        </div>
                      </div>
                      <div className="unit-body">
                        <h4 className="box-icon-classic-title">
                          <a href="#">Adoption</a>
                        </h4>
                        <p className="box-icon-classic-text">
                          Find your perfect companion and give a pet a loving
                          forever home.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
          {/* CTA*/}
          <section
            className="section section-xxl !bg-yellow-800 context-dark bg-position-2 text-start"
            style={{ backgroundImage: 'url("/assets/pimages/bg-cta.jpg")' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h2 className="wow fadeInRight">Hurry up!</h2>
                  <h4 className="wow fadeInRight" data-wow-delay=".1s">
                    The most trusted pet store is just a click away
                  </h4>
                  <p
                    className="wow fadeInRight !text-[black] font-semibold"
                    data-wow-delay=".2s"
                  >
                    Thousands of pet owners rely on Luvthypet Store for
                    top-quality products that keep their furry friends healthy,
                    happy, and safe. Don't wait—your pet deserves the best, and
                    it's right here.
                  </p>
                  <a
                    className="button button-lg button-primary button-zakaria wow fadeInUp"
                    href="shop"
                  >
                    Visit Store
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="section section-xxl bg-gray-1">
            <div className="container">
              <h2 className="wow fadeScale menufont">Products</h2>
              {/* Owl Carousel*/}
              <ProductsListHome></ProductsListHome>
            </div>
          </section>
          {/* About Us*/}
          <section className="section section-xl bg-default">
            <div className="container">
              <h2 className="wow fadeScale menufont">About us</h2>
              <div className="row row-30 row-lg justify-content-center">
                <div className="col-sm-8 col-md-7 col-lg-6 wow fadeInLeft">
                  <img
                    src="/assets/pimages/about-4-570x511.jpg"
                    alt=""
                    width={570}
                    height={511}
                  />
                </div>
                <div className="col-md-10 col-lg-6 wow fadeInRight">
                  {/* Bootstrap tabs*/}
                  <div className="tabs-custom tabs-jean" id="tabs-1">
                    {/* Tab panes*/}
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="tabs-1-1">
                        <div className="box-info-creative">
                          <h4 className="box-info-creative-title">
                            <a href="#">
                              Our Pet Shop’s mission lies in providing quality
                              care for pets.
                            </a>
                          </h4>
                          <div className="box-info-creative-text">
                            We want our clients and their pets to receive the
                            best service and goods, that’s why we work only with
                            proven and respected manufacturers.
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="tabs-1-2">
                        <div className="box-info-creative">
                          <h4 className="box-info-creative-title">
                            <a href="#">
                              Aiming to be the leading place for pet care and
                              shopping
                            </a>
                          </h4>
                          <div className="box-info-creative-text">
                            Our vision at Luvthypet is to become the #1 online
                            store for pets as well as the space where owners can
                            get any kind of pet-related services at an
                            affordable price.
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="tabs-1-3">
                        <div className="box-info-creative">
                          <h4 className="box-info-creative-title">
                            <a href="#">
                              We always strive for being professional and
                              consistent
                            </a>
                          </h4>
                          <div className="box-info-creative-text">
                            Our work is defined by certain values that include
                            excellence, care, professionalism, innovation, and
                            consistency. We aim to provide the best pet care
                            services to you.
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Nav tabs*/}
                    <div className="nav-tabs-wrap">
                      <ul className="nav nav-tabs">
                        <li className="nav-item" role="presentation">
                          <a
                            className="nav-link active"
                            href="#tabs-1-1"
                            data-bs-toggle="tab"
                          >
                            Our mission
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            className="nav-link"
                            href="#tabs-1-2"
                            data-bs-toggle="tab"
                          >
                            our vision
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            className="nav-link"
                            href="#tabs-1-3"
                            data-bs-toggle="tab"
                          >
                            our values
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA 2*/}
          <section
            className="section section-xxl section-inset-1 bg-image"
            style={{ backgroundImage: "url(/assets/pimages/bg-cta-1.jpg)" }}
          >
            <div className="container box-cta">
              <h2 className="wow fadeInDown">Dog &amp; cat treats</h2>
              <h4 className="wow fadeScale">
                Pamper your pets with our range of quality dog &amp; cat treats
              </h4>
              <a
                className="button button-lg button-primary wow fadeInUp btn-one"
                href="shop-list.html.htm"
              >
                Visit Store
              </a>
            </div>
          </section>
          {/* Out Clients*/}

          {/* Latest News*/}
          <section className="section section-xxl bg-gray-1">
            <div className="container">
              <h2 className="wow fadeScale menufont">Our Blog</h2>
              <div className="row row-lg row-30 justify-content-center">
                <div className="col-sm-8 col-md-6 wow fadeInLeft">
                  {/* Post Nikki 2*/}
                  <article className="post post-nikki post-nikki-2">
                    <div className="post-nikki-figure">
                      <img
                        src="/assets/pimages/post-1-570x461.jpg"
                        alt=""
                        width={570}
                        height={461}
                      />
                    </div>
                    <div className="post-nikki-body">
                      <div>
                        <div className="post-nikki-time">
                          <time dateTime="2024-07-17">07/17/24</time>
                        </div>
                        <div className="post-nikki-title">
                          <a
                            href="https://www.thesprucepets.com/cat-language-explained-553981"
                            target="_blank"
                          >
                            Deciphering your cat’s language
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col-md-6">
                  <div className="row row-30">
                    <div className="col-6 col-md-12 wow fadeInRight">
                      {/* Post Nikki*/}
                      <article className="post post-nikki">
                        <div className="unit unit-spacing-lg flex-column flex-md-row align-items-center">
                          <div className="unit-left">
                            <a
                              className="post-nikki-figure"
                              href="blog-post.html.htm"
                            >
                              <img
                                src="/assets/pimages/post-2-270x215.jpg"
                                alt=""
                                width={270}
                                height={215}
                              />
                            </a>
                          </div>
                          <div className="unit-body">
                            <div className="post-nikki-time">
                              <time dateTime="2020-09-08">12/01/23</time>
                            </div>
                            <div className="post-nikki-title">
                              <a
                                href="https://www.thesprucepets.com/fun-and-easy-dog-tricks-1117309"
                                target="_blank"
                              >
                                Easy tricks to teach your dog
                              </a>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                    <div className="col-6 col-md-12 wow fadeInRight">
                      {/* Post Nikki*/}
                      <article className="post post-nikki">
                        <div className="unit unit-spacing-lg flex-column flex-md-row align-items-center">
                          <div className="unit-left">
                            <a
                              className="post-nikki-figure"
                              href="blog-post.html.htm"
                            >
                              <img
                                src="/assets/pimages/post-3-270x215.jpg"
                                alt=""
                                width={270}
                                height={215}
                              />
                            </a>
                          </div>
                          <div className="unit-body">
                            <div className="post-nikki-time">
                              <time dateTime="2020-09-08">August 9, 2020</time>
                            </div>
                            <div className="post-nikki-title">
                              <a
                                href="https://www.animalhumanesociety.org/news/8-photography-tips-take-better-photos-your-pet"
                                target="_blank"
                              >
                                8 tips for taking the perfect photo of your pet
                              </a>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Section Clients*/}
          <section className="section section-xl bg-primary">
            <div className="container">
              <div
                className="owl-carousel owl-style-2"
                data-items={2}
                data-sm-items={3}
                data-md-items={4}
                data-lg-items={5}
                data-margin={30}
                data-dots="true"
              >
                <a className="clients-classic" href="#">
                  <img
                    src="/assets/pimages/clients-1-120x114.png"
                    alt=""
                    width={120}
                    height={114}
                  />
                </a>
                <a className="clients-classic" href="#">
                  <img
                    src="/assets/pimages/clients-2-105x118.png"
                    alt=""
                    width={105}
                    height={118}
                  />
                </a>
                <a className="clients-classic" href="#">
                  <img
                    src="/assets/pimages/clients-3-111x98.png"
                    alt=""
                    width={111}
                    height={98}
                  />
                </a>
                <a className="clients-classic" href="#">
                  <img
                    src="/assets/pimages/clients-4-122x92.png"
                    alt=""
                    width={122}
                    height={92}
                  />
                </a>
                <a className="clients-classic" href="#">
                  <img
                    src="/assets/pimages/clients-5-112x112.png"
                    alt=""
                    width={112}
                    height={112}
                  />
                </a>
              </div>
            </div>
          </section>
          {/* Page Footer*/}

          <Footer></Footer>
        </div>
        <div className="snackbars" id="form-output-global"></div>
      </div>
    </div>
  );
};
