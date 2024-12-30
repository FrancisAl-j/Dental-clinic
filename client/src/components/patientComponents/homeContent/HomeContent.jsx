import React from "react";
import "./homeContent.css";
import GeneralDentistry from "../../../assets/images/image 17.png";
import DentalCosmetics from "../../../assets/images/image 17-1.png";
import Prosthodontics from "../../../assets/images/image 17-2.png";
import Orthodontics from "../../../assets/images/image 17-3.png";
import OralSurgery from "../../../assets/images/image 17-4.png";
import Vector from "../../../assets/images/Vector.png";
import Vector1 from "../../../assets/images/Vector-1.png";
import Vector2 from "../../../assets/images/Vector-2.png";
import Vector3 from "../../../assets/images/Vector-3.png";
import Vector4 from "../../../assets/images/Vector-4.png";
import Vector5 from "../../../assets/images/Vector-5.png";
import Vector6 from "../../../assets/images/Vector-6.png";
import Vector7 from "../../../assets/images/Vector-7.png";
import Vector8 from "../../../assets/images/Vector-8.png";
import { Link } from "react-router-dom";

const HomeContent = () => {
  return (
    <div className="beys">
      <section>
        <h1>
          Simplify Your Dental Care with <span>Ease and Confidence</span>
        </h1>
        <article>
          <p>
            We understand how stressful dental issues can be—finding the right
            clinic and booking appointments shouldn't add to the hassle. That’s
            where we come in!
          </p>
          <p>
            Our platform helps dental clinics streamline their operations and
            connect with patients effortlessly. Whether you're looking for a
            service or tracking your dental records, we've got you covered.
          </p>

          <div className="wateber">
            <div className="stack-parent han">
              <div className="box">
                <div className="text">
                  <p className="title11">
                    Say goodbye to long waits and confusion
                  </p>
                  <p>
                    Our system ensures clinics can manage appointments
                    efficiently, so patients get seen on time.
                  </p>
                </div>
              </div>
            </div>
            <div className="stack-parent dul">
              <div className="box">
                <div className="text">
                  <p className="title11">Stay informed and stress-free</p>
                  <p>
                    Clinics keep patients updated at every step, from booking to
                    post-treatment follow-ups.
                  </p>
                </div>
              </div>
            </div>
            <div className="stack-parent set">
              <div className="box">
                <div className="text">
                  <p className="title11">Affordable</p>
                  <p>
                    Our service empowers clinics to provide exceptional care
                    without compromising quality or breaking the bank.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p>
            Discover a dental care experience that’s smooth, transparent, and
            hassle-free—for both patients and clinics.
          </p>
        </article>
      </section>

      <section>
        <h1>
          Our <span>Dental Care</span> Services
        </h1>
        <div className="links">
          <a href="#">
            <div>
              <img src={GeneralDentistry} alt="" />
              <article>
                <p className="basta">General Dentistry</p>
                <p>
                  Our platform connects you with clinics offering consultations,
                  restorations, extractions, fluoride treatments, prophylaxis,
                  and more. With a focus on quality care and personalized
                  attention, dental clinics can build trust and keep patients
                  coming back for exceptional service.
                </p>
              </article>
            </div>
          </a>
          <a href="#">
            <div>
              <img src={DentalCosmetics} alt="" />
              <article>
                <p className="basta">Dental Cosmetics</p>
                <p>
                  Find clinics offering veneers, crowns, bridges, dentures,
                  whitening, and more to improve the appearance of teeth and
                  gums. With our platform, patients can easily discover the
                  right clinic to boost their confidence and achieve their
                  perfect smile.
                </p>
              </article>
            </div>
          </a>
          <a href="#">
            <div>
              <img src={Prosthodontics} alt="" />
              <article>
                <p className="basta">Prosthodontics</p>
                <p>
                  Connect with clinics specializing in designing, manufacturing,
                  and fitting dental prostheses with patients' comfort and
                  confidence in mind. From bridges and dentures to crowns, our
                  platform helps you find the care you need for a perfect fit
                  and lasting results.
                </p>
              </article>
            </div>
          </a>
          <a href="#">
            <div>
              <img src={Orthodontics} alt="" />
              <article>
                <p className="basta">Orthodontics</p>
                <p>
                  Find clinics that specialize in diagnosing, preventing, and
                  treating dental and facial abnormalities. Orthodontic
                  services, including clear aligners, braces, and more, help
                  restore and maintain teeth functionality while enhancing
                  smiles.
                </p>
              </article>
            </div>
          </a>
          <a href="#">
            <div>
              <img src={OralSurgery} alt="" />
              <article>
                <p className="basta">Oral Surgery</p>
                <p>
                  Connect with clinics offering expert and personalized care for
                  complex dental procedures like wisdom tooth extractions and
                  root canal treatments. Our platform makes it easy to find
                  trusted clinics that simplify these treatments, ensuring a
                  smooth experience for every patient.
                </p>
              </article>
            </div>
          </a>
        </div>
        <Link to="/all/services">
          <div className="button">
            <p>See More</p>
          </div>
        </Link>
      </section>

      <section className="wan">
        <h1>
          Why Choose <span>US</span>?
        </h1>
        <div className="magulang">
          <div className="ich">
            <img src={Vector8} alt="" />
            <p className="pamagat">Advanced Expertise</p>
            <p>
              Dentistry is an ever-evolving field, and we stay at the forefront
              by embracing the latest technological advancements and ongoing
              research. Our platform connects you with clinics that continually
              improve their services to provide the best care for both current
              and future patients.
            </p>
          </div>
          <div className="ich">
            <img src={Vector1} alt="" />
            <p className="pamagat">Affordable Services</p>
            <p>
              We believe oral health should be accessible to everyone, not just
              a privilege for the few. Clinics in our network provide
              high-quality care while ensuring their services remain affordable,
              so that all patients can enjoy excellent dental health without
              breaking the bank.
            </p>
          </div>
        </div>
        <div className="magulang">
          <div className="ich">
            <img src={Vector2} alt="" />
            <p className="pamagat">Going the Extra Mile</p>
            <p>
              We take genuine pride in offering care that goes beyond
              expectations. Clinics in our network prioritize patient
              satisfaction by providing exceptional, personalized care—setting
              them apart from others. This is just the beginning of our journey,
              and we’d love for you to be part of it.
            </p>
          </div>
          <div className="ich">
            <img src={Vector3} alt="" />
            <p className="pamagat">Homie Experience</p>
            <p>
              We know that a comfortable and welcoming environment makes all the
              difference in patient care. Our platform connects you with clinics
              that make every visit feel safe, personal, and stress-free. This
              approach leads to high client retention and word-of-mouth
              referrals from patients who trust us with their dental needs.
            </p>
          </div>
        </div>
      </section>

      <div className="aywan">
        <div className="kaliwa">
          <h1>
            What to <span>Expect</span>?
          </h1>
        </div>
        <div className="kanan">
          <div className="parent">
            <div className="each">
              <img src={Vector4} alt="" />
              <p className="taytol">personalized</p>
              <p>
                Every smile is unique, so we connect you with clinics offering
                personalized dental care tailored to your needs.
              </p>
            </div>
            <div className="each">
              <img src={Vector5} alt="" />
              <p className="taytol">Variety</p>
              <p>
                Explore diverse dental services, from preventive care to
                specialized treatments, with clinics ready to meet all your
                needs.
              </p>
            </div>
          </div>
          <div className="parent">
            <div className="each">
              <img src={Vector6} alt="" />
              <p className="taytol">Effortless</p>
              <p>
                Your dental care journey should be stress-free. Our platform
                simplifies scheduling and ensures a seamless experience, so you
                can focus on your health.
              </p>
            </div>
            <div className="each">
              <img src={Vector7} alt="" />
              <p className="taytol">Exclusive</p>
              <p>
                Experience exceptional dental care with advanced treatments and
                personalized services from our network of clinics, prioritizing
                your smile every visit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
