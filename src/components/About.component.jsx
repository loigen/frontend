import React from "react";
import sirjeb from "../images/sirJeb.png";
const About = () => {
  return (
    <div className="min-h-screen  mt-20">
      {/* Header */}
      {/* Profile Section */}
      <section className="flex flex-col items-center md:pl-0 pl-[5%] pt-10">
        <img
          src={sirjeb}
          alt="Dr. Jeb Bohol"
          className="rounded-full w-60 h-60 border-4 border-[#68B2A0]"
        />
        <h2 className="mt-4 text-2xl font-semibold text-[#2C6975]">
          Dr. Jeb Bohol, PhD, RPsy - Psychologist
        </h2>
        <p className="text-teal-700 font-medium">
          Senior Behaviour Support Practitioner | Consultant Psychologist |
          Researcher
        </p>
      </section>

      {/* About Section */}
      <section className="px-6 lg:px-24 py-8">
        <h3 className="text-xl font-semibold text-[#2C6975] mb-4">ABOUT</h3>
        <p className="text-gray-600 leading-relaxed">
          I am Dr. Jeb Bohol, PhD, RPsy – Psychologist, a psychotherapist, and a
          researcher. I am operating full-time in Cebu and other parts of the
          Philippines (and even abroad). Throughout my career, I have been
          deeply involved with counseling, interventions, psycho-legal cases,
          and assessments. I am privileged to have been a psychologist for
          people from different walks of life. My long-standing advocacy has
          been to fight for human rights, environmental conservation, and mental
          health. Public institutions have invited me to be an expert witness.
          Moreover, I have engaged with several private institutions to talk
          about relevant topics in our society.
        </p>
      </section>

      {/* Experience Section */}
      <section className="px-6 lg:px-24 py-8">
        <h3 className="text-xl font-semibold text-[#2C6975] mb-4">
          EXPERIENCE
        </h3>

        {/* Experience Item */}
        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">
            Counselling Psychologist
          </h4>
          <p className="text-gray-600 italic">PsychHelp – Part-time</p>
          <p className="text-sm text-gray-500">2022 to Present - 2 yrs 5 mos</p>
          <p className="text-gray-600 leading-relaxed mt-2">
            In my spare time, I volunteer as a counselling psychologist for
            Ukrainian refugees affected by the Ukraine-Russia conflict. I
            provide mental health help via messaging and teleconferencing.
          </p>
        </div>

        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">
            Senior Behaviour Support Practitioner
          </h4>
          <p className="text-gray-600 italic">ORS Group – Full-time</p>
          <p className="text-sm text-gray-500">
            Jul 2021 - Present - 2 yrs 11 mos
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            I engage with clients who availed for mental health services and
            supervise the training of mental health practitioners in an
            international level. I constantly engage with Australian colleagues
            to discuss various cases, find effective therapy approaches, and
            give intensive training to field providers.
          </p>
        </div>

        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">Clinical Psychologist</h4>
          <p className="text-gray-600 italic">
            Veterans Evaluation Services · Contract
          </p>
          <p className="text-sm text-gray-500">Jun 2019 to Present · 5 yrs </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            My work is exclusive to war veterans of the United States of
            America. The personnel I usually encounter served in several global
            conflicts throughout the years. I provide intensive psychological
            assessment, interviews, and conduct research to assist them in
            identifying their conditions and necessary help to ensure their
            well-being.
          </p>
        </div>

        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">
            Consultant Psychologist
          </h4>
          <p className="text-gray-600 italic">
            Associated Marine Officer's and Seamen's Union of the Philippines
            (AMOSUP)
          </p>
          <p className="text-sm text-gray-500">
            Sep 2018 to Present · 5 yrs 9 mos
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            I serve in a hospital dedicated to seafarers and their families. I
            supervise psychometricians who give psychological tests, update
            government accreditations, interview potential seafarers, and
            approve or decline completed psychological reports.
          </p>
        </div>

        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">
            Counselling Psychologist{" "}
          </h4>
          <p className="text-gray-600 italic">MindNation · Part-time</p>
          <p className="text-sm text-gray-500">
            Feb 2022 to Dec 2022 · 11 mos{" "}
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            I provide counselling services to employees under the Employee
            Assistance Program (EAP), mental health certification, and
            recommendations if they are fit to work.
          </p>
        </div>

        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">
            Cebu Doctors' University, Mandaue City
          </h4>
          <p className="text-sm text-gray-500">3 years 8 mos </p>
          <ul className=" list-[circle] list-inside text-teal-700 pt-3">
            <li>Research Ethics Reviewer</li>
            <p className="text-sm text-gray-500">3 years 8 mos </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              I reviewed research protocols for undergraduate and graduate
              programs.
            </p>
            <li className="pt-3">College Professor</li>
            <p className="text-sm text-gray-500">
              Jun 2018 to Jan 2022 · 3 yrs 8 mos{" "}
            </p>
            <p className="text-gray-600 leading-relaxed pt-3 ">
              I taught major and minor psychology courses to graduate and
              undergraduate programs. I also developed and spearheaded the
              psychology program curriculum and course syllabi to be used by
              both students and other professors. In my time, the psychology
              program of the University was highly esteemed and accredited.
            </p>
            <li className="pt-3">Chairman, Psychology Department</li>
            <p className="text-sm text-gray-500">
              Jun 2019 to Jul 2021 · 2 yrs 2 mos{" "}
            </p>
            <p className="text-gray-600 leading-relaxed ">
              It was my responsibility to head the psychology program at the
              University. I was responsible for student interview, monitoring
              their progress, and creation of modules and syllabi. Aside from
              this, I monitored other professors' teaching method, materials,
              and training them. I reported directly to the Dean and the Vice
              President of Academic Affairs (VPAC).
            </p>
          </ul>
        </div>

        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">
            Psychologist-psychotherapist
          </h4>
          <p className="text-gray-600 italic">Psychosomatherapia Clinic</p>
          <p className="text-sm text-gray-500">
            Nov 2017 to Jan 2022 · 4 yrs 3 mos
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            I do counseling and other psychological services such as attending
            psycho-legal cases, psychological assessments, psychoeducation,
            training, workshops, and seminars.
          </p>
        </div>
        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">
            On-Call Evaluating Psychologist
          </h4>
          <p className="text-gray-600 italic">
            Armed Forces of the Philippines · Part-time
          </p>
          <p className="text-sm text-gray-500">
            Feb 2018 - Feb 2019 · 1 yr 1 mo
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            I provide psychological evaluation to military personnel under the
            Armed Forces of the Philippines (AFP) in Palawan.
          </p>
        </div>
        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">
            Consultant Psychologist
          </h4>
          <p className="text-gray-600 italic">
            ALPHA BIOMEDICAL & DIAGNOSTICS, INC.
          </p>
          <p className="text-sm text-gray-500">Jun 2018 - Jan 2019 · 8 mos</p>
          <p className="text-gray-600 leading-relaxed mt-2">
            My work here was to supervise psychometricians in their
            administration of psychological tests for different people seeking
            employment both nationally and internationally. Moreover, I approve
            or decline completed psychological tests.
          </p>
        </div>
        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">Instructor</h4>
          <p className="text-gray-600 italic">Bethany Christian Schools</p>
          <p className="text-sm text-gray-500">Jun 2017 to Dec 2017 · 7 mos</p>
          <p className="text-gray-600 leading-relaxed mt-2">
            Teaching part-time to subjects such as Philosophy, Civics and Bible
            classes to senior high and high school students.
          </p>
        </div>
        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">Educator</h4>
          <p className="text-gray-600 italic">Passerelles numériques</p>
          <p className="text-sm text-gray-500">
            Mar 2016 to Jun 2017 · 1 yr 4 mos
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            Became a counselor, mentor and observed overall well-being of less
            fortunate students that were offered scholarship to study in
            University of San Carlos in Cebu City. Students were center-based
            and I was a resident educator.
          </p>
        </div>
        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">
            Psychological Report Writer
          </h4>
          <p className="text-gray-600 italic">Psychosomatherapiac</p>
          <p className="text-sm text-gray-500">
            Apr 2016 to May 2017 · 1 yr 2 mos
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            I work part-time for a licensed psychologist interviewing and
            assessing clients such as those who applied for marital annulment,
            custody cases and for orphans.
          </p>
        </div>
        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">
            Devotionals Contributor
          </h4>
          <p className="text-gray-600 italic">Young People's Ministries</p>
          <p className="text-sm text-gray-500">Dec 2015 to Feb 2016 · 3 mos</p>
          <p className="text-gray-600 leading-relaxed mt-2">
            I wrote devotionals for young people across the globe.
          </p>
        </div>
        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">Instructor</h4>
          <p className="text-gray-600 italic">University of San Carlos</p>
          <p className="text-sm text-gray-500">Jun 2015 to Oct 2015 · 5 mos</p>
          <p className="text-gray-600 leading-relaxed mt-2">
            Taught subjects like General Psychology, Psychological Assessment
            and Psychological Statistics among university student
          </p>
        </div>
        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">Guidance Counselor</h4>
          <p className="text-gray-600 italic">
            Asian College of Technology - Cebu
          </p>
          <p className="text-sm text-gray-500">Oct 2014 to Jun 2015 · 9 mos</p>
          <p className="text-gray-600 leading-relaxed mt-2">
            Primarily conducted counseling to delinquent and problematic
            students, purchase and utilization of psychological assessment,
            giving seminars for emotional well-being and strategies for
            employment and also spearheaded job fairs.
          </p>
        </div>
        <div className="mb-8">
          <h4 className="text-teal-700 font-semibold">Case Worker</h4>
          <p className="text-gray-600 italic">FORGE Inc.</p>
          <p className="text-sm text-gray-500">Jun 2013 to Dec 2013 · 7 mos</p>
          <p className="text-gray-600 leading-relaxed mt-2">
            Worked under the supervision of Department of Social Welfare and
            Development for the MCCT (Modified Cash Transfer) program. Together
            with an assistant, we assessed the responsibility and sustainability
            of the families given financial support by the government.
            Counseling and legal actions especially spousal relations and
            adoption were also conducted.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
