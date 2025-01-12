import React from "react";
import "./about.css";
import Au1 from "../assets/images/au_img1.png";
import Au2 from "../assets/images/au_img2.png";
import Au3 from "../assets/images/au_img3.png";

const About = () => {
  return (
    <div className="sen">
      <header className="about-header">About Us</header>
      <div className="base div">
        <div className="split div">
          <div className="art div">
            <p className="byl">Our Story</p>
            <p className="autitle">A Journey of Innovation and Growth</p>
            <p className="story">
              In 2023, a group of BS Information Technology students from EARIST
              came together with a shared vision: to develop innovative
              solutions that could impact the community. Initially, we were just
              a group of individuals learning the ins and outs of technology,
              eager to apply our skills in real-world projects.
              <br />
              As we progressed through our studies, a unique opportunity arose.
              Our capstone project presented us with the chance to create a
              web-based platform that could address real needs in the dental
              industry. Recognizing the importance of efficient dental
              management systems, we decided to focus on developing a platform
              that could streamline clinic operations and improve patient
              experience.
              <br />
              With a clear vision to integrate technology with healthcare, we
              formed a team committed to building a solution that would make
              dental care more accessible and efficient. Through hard work,
              collaboration, and a shared passion for creating impactful tech,
              we designed and developed a platform that aims to transform how
              dental clinics manage patient information, appointments, and
              services.
              <br />
              Now, after months of effort, we are proud to present our platform
              as a part of our capstone project. This journey from students to
              creators is a testament to our dedication, teamwork, and the
              belief that technology can help improve lives.
            </p>
          </div>
          <div className="pic div">
            <img src={Au1} alt="placeholder_image1" />
          </div>
        </div>

        <div className="split div">
          <div className="pic">
            <img src={Au2} alt="" />
          </div>
          <div className="art1 div">
            <p className="byl">Our Story</p>
            <p className="autitle">A Journey of Innovation and Growth</p>
            <p className="story">
              In 2023, a group of BS Information Technology students from EARIST
              came together with a shared vision: to develop innovative
              solutions that could impact the community. Initially, we were just
              a group of individuals learning the ins and outs of technology,
              eager to apply our skills in real-world projects.
              <br />
              As we progressed through our studies, a unique opportunity arose.
              Our capstone project presented us with the chance to create a
              web-based platform that could address real needs in the dental
              industry. Recognizing the importance of efficient dental
              management systems, we decided to focus on developing a platform
              that could streamline clinic operations and improve patient
              experience.
              <br />
              With a clear vision to integrate technology with healthcare, we
              formed a team committed to building a solution that would make
              dental care more accessible and efficient. Through hard work,
              collaboration, and a shared passion for creating impactful tech,
              we designed and developed a platform that aims to transform how
              dental clinics manage patient information, appointments, and
              services.
              <br />
              Now, after months of effort, we are proud to present our platform
              as a part of our capstone project. This journey from students to
              creators is a testament to our dedication, teamwork, and the
              belief that technology can help improve lives.
            </p>
          </div>
        </div>

        <div className="split div">
          <div className="art div">
            <p className="byl">Our Story</p>
            <p className="autitle">A Journey of Innovation and Growth</p>
            <p className="story">
              In 2023, a group of BS Information Technology students from EARIST
              came together with a shared vision: to develop innovative
              solutions that could impact the community. Initially, we were just
              a group of individuals learning the ins and outs of technology,
              eager to apply our skills in real-world projects.
              <br />
              As we progressed through our studies, a unique opportunity arose.
              Our capstone project presented us with the chance to create a
              web-based platform that could address real needs in the dental
              industry. Recognizing the importance of efficient dental
              management systems, we decided to focus on developing a platform
              that could streamline clinic operations and improve patient
              experience.
              <br />
              With a clear vision to integrate technology with healthcare, we
              formed a team committed to building a solution that would make
              dental care more accessible and efficient. Through hard work,
              collaboration, and a shared passion for creating impactful tech,
              we designed and developed a platform that aims to transform how
              dental clinics manage patient information, appointments, and
              services.
              <br />
              Now, after months of effort, we are proud to present our platform
              as a part of our capstone project. This journey from students to
              creators is a testament to our dedication, teamwork, and the
              belief that technology can help improve lives.
            </p>
          </div>
          <div className="pic">
            <img src={Au3} alt="placeholder_image1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
