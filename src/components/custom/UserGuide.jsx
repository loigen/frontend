import { ChevronRight, Rocket } from "@mui/icons-material";
import { act, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const UserGuide = ({ setView }) => {
  const [active, setActive] = useState("GetStarted");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-[18%] w-full  bg-white md:h-[90vh] h-auto border-r-gray-300 border-r px-2 md:py-10 py-1">
        <p
          onClick={() => setView("settings")}
          className="text-black p-2"
          style={{ cursor: "pointer" }}
        >
          Back
        </p>
        <a
          onClick={() => setActive("GetStarted")}
          className="flex flex-row justify-between p-2"
          style={{
            borderLeft: active === "GetStarted" ? "5px solid #2C6975" : "",
            cursor: "pointer",
          }}
        >
          <p>Getting Started</p>
          {active === "GetStarted" ? <ChevronRight /> : <FaChevronDown />}
        </a>
        <a
          onClick={() => setActive("roles")}
          className="flex flex-row justify-between p-2"
          style={{
            borderLeft: active === "roles" ? "5px solid #2C6975" : "",
            cursor: "pointer",
          }}
        >
          <p>User Roles and Access</p>
          {active === "roles" ? <ChevronRight /> : <FaChevronDown />}
        </a>
        <a
          onClick={() => setActive("sysmod")}
          className="flex flex-row justify-between p-2"
          style={{
            borderLeft: active === "sysmod" ? "5px solid #2C6975" : "",
            cursor: "pointer",
          }}
        >
          <p>Key Features</p>
          {active === "sysmod" ? <ChevronRight /> : <FaChevronDown />}
        </a>
        <a
          onClick={() => setActive("book")}
          className="flex flex-row justify-between p-2"
          style={{
            borderLeft: active === "book" ? "5px solid #2C6975" : "",
            cursor: "pointer",
          }}
        >
          <p>Appointment Booking Process</p>
          {active === "book" ? <ChevronRight /> : <FaChevronDown />}
        </a>
        <a
          onClick={() => setActive("commu")}
          className="flex flex-row justify-between p-2"
          style={{
            borderLeft: active === "commu" ? "5px solid #2C6975" : "",
            cursor: "pointer",
          }}
        >
          <p>Messaging and Communication</p>
          {active === "commu" ? <ChevronRight /> : <FaChevronDown />}
        </a>
        <a
          onClick={() => setActive("payment")}
          className="flex flex-row justify-between p-2"
          style={{
            borderLeft: active === "payment" ? "5px solid #2C6975" : "",
            cursor: "pointer",
          }}
        >
          <p>Payment Verification</p>
          {active === "payment" ? <ChevronRight /> : <FaChevronDown />}
        </a>
        <a
          onClick={() => setActive("reminder")}
          className="flex flex-row justify-between p-2"
          style={{
            borderLeft: active === "reminder" ? "5px solid #2C6975" : "",
            cursor: "pointer",
          }}
        >
          <p>Reminder Management</p>
          {active === "reminder" ? <ChevronRight /> : <FaChevronDown />}
        </a>
        <a
          onClick={() => setActive("account")}
          className="flex flex-row justify-between p-2"
          style={{
            borderLeft: active === "account" ? "5px solid #2C6975" : "",
            cursor: "pointer",
          }}
        >
          <p>User Account Management</p>
          {active === "account" ? <ChevronRight /> : <FaChevronDown />}
        </a>
      </div>
      <div className="flex-1 gap-2 mt-100 px-4 pt-10 h-[90vh] overflow-y-scroll">
        {active === "GetStarted" && (
          <section id="gettingStarted flex ">
            <div className="flex flex-row items-center">
              <h1 className="text-5xl">Getting Started</h1>
              <Rocket fontSize="large" />
            </div>
            <div className="flex flex-col gap-2 mt-10 ml-5">
              <p className="font-semibold">Overview</p>
              <p>
                SafePlace is a web-based appointment system for managing Dr. Jeb
                Doe’s psychology practice. It streamlines scheduling,
                communication, and improves patient access.
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-5 mt-5">
              <p className="font-semibold">System Requirements</p>
              <p>
                Compatible with any internet-connected device. Recommended
                browsers: Chrome, Firefox, Safari, Edge.
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-5 mt-5">
              <p className="font-semibold">Initial Setup and Logging In</p>
              <li>Sign-Up: New users create an account on the signup page.</li>
              <li>
                Sign In: Enter email and password to access the main pages.
              </li>
            </div>
            <div className="flex flex-col gap-2 ml-5 mt-5">
              <p className="font-semibold">User Roles and Access</p>
              <li>
                Administrator(Jeb Bohol): Manages appointments, messaging,
                payment approval, and system settings.
              </li>
              <li>
                Patients: Book appointments, send messages, upload payment
                receipts, and receive reminders. Can view and adjust their
                appointments.
              </li>
            </div>
            <div className="flex flex-col gap-2 ml-5 mt-5">
              <p className="font-semibold">Key Features</p>
              <li>
                Appointment Booking Process: Patients can easily view and book
                available times.
              </li>
              <li>
                Messaging and Communication: Direct, private communication
                between Dr. Jeb and patients.
              </li>
              <li>
                Manual Email Reminders: Dr. Jeb sends reminders as needed.
              </li>
              <li>
                Payment Verification: Patients upload receipts for Dr. Jeb’s
                review and appointment confirmation.
              </li>
              <li>
                Custom Interfaces: Separate views for Dr. Jeb and patients,
                optimized for each user’s tasks.
              </li>
            </div>
            <div>
              <p className="font-semibold">Getting Help</p>
              <li>
                Email :{" "}
                <a
                  className="text-[#2c6975] underline"
                  href="mailto:safeplacewithdr.jeb@gmail.com"
                >
                  safeplacewithdr.jeb@gmail.com
                </a>
              </li>
              <li>FAQs: Visit our FAQ section for assistance.</li>
            </div>
          </section>
        )}
        {active === "roles" && (
          <section id="roles-access">
            <h1 className="text-5xl">User Role and Access</h1>
            <div className="mt-10 ml-5">
              <p className="font-semibold">1. Administrator (Dr. Jeb Bohol):</p>
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <li>
                  Appointment Management: Dr. Jeb can set his availability,
                  update appointment statuses, and manage all patient bookings.
                </li>
                <li>
                  Communication Control: Can initiate sending messages with
                  patients, respond to inquiries, and send manual reminders.
                </li>
                <li>
                  Payment Verification: Reviews payment receipts uploaded by
                  patients before confirming appointments.
                </li>
                <li>
                  Full System Access: Has complete control over SafePlace
                  settings, patient profiles, and appointment history, allowing
                  for detailed record-keeping and patient tracking.
                </li>
                <li>
                  Reports and Analytics: Accesses detailed reports to monitor
                  appointment trends, patient engagement, and payment statuses,
                  aiding in practice management and decision-making.
                </li>
              </div>
            </div>
            <div className="mt-10 ml-5">
              <p className="font-semibold">2. Patients:</p>
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <li>
                  Appointment Booking: Patients can view available time slots,
                  book, reschedule, or cancel their own appointments, ensuring
                  flexibility in managing their schedules.
                </li>
                <li>
                  Communication with Dr. Jeb: Engages in messaging for queries
                  or updates, fostering open communication and timely
                  assistance.
                </li>
                <li>
                  Payment Management: After booking, patients upload payment
                  receipts for Dr. Jeb’s review, ensuring transparency in the
                  payment process.
                </li>
                <li>
                  Reminders and Notifications: Receives reminders for upcoming
                  appointments via email to reduce the likelihood of missed
                  sessions.
                </li>
                <li>
                  Personal Dashboard: Has a personalized dashboard that shows
                  appointment history, scheduled sessions, and appointment
                  status.
                </li>
                <li>
                  Privacy and Security: Patients have limited access, restricted
                  to viewing and modifying only their profiles and bookings,
                  safeguarding privacy.
                </li>
              </div>
            </div>
          </section>
        )}
        {active === "sysmod" && (
          <section className=" ">
            <h1 className="text-5xl">Key Features</h1>
            <div className="mt-10 ml-5">
              <p className="font-semibold">1. User Access Module:</p>
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <li>
                  Login and Registration: Allows new users to register accounts,
                  while existing users can securely log in with their
                  credentials.
                </li>
                <li>
                  Account Management: Provides features for users to update
                  personal information, reset passwords, and manage security
                  settings.
                </li>
                <li>
                  Role-Based Access Control: Ensures administrators and patients
                  have access only to relevant features, safeguarding sensitive
                  information.
                </li>
                <li>
                  Audit Logs: Tracks login history and appointment history for
                  security and oversight.
                </li>
              </div>
            </div>
            <div className="mt-10 ml-5">
              <p className="font-semibold">2. Consultation Module:</p>
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <li>
                  Availability Management: Dr. Jeb can set, update, and
                  customize available consultation times, ensuring his schedule
                  is up to date.
                </li>
                <li>
                  Appointment Requests Review: Allows Dr. Jeb to view, approve,
                  or reject appointment requests based on his availability and
                  priorities.
                </li>
                <li>
                  Consultation Notes: Enables Dr. Jeb to document key insights
                  or reminders for each consultation, which can be accessed
                  after the appointments.
                </li>
                <li>
                  Patient History Access: Provides Dr. Jeb with patient history
                  to support personalized care, enhancing the consultation
                  experience.
                </li>
                <li>
                  Personal Dashboard: Has a personalized dashboard that shows
                  appointment history, scheduled sessions, and appointment
                  status.
                </li>
                <li>
                  Privacy and Security: Patients have limited access, restricted
                  to viewing and modifying only their profiles and bookings,
                  safeguarding privacy.
                </li>
              </div>
            </div>{" "}
            <div className="mt-10 ml-5">
              <p className="font-semibold">3. Appointment Module:</p>
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <li>
                  Booking System: Allows patients to view open slots and book
                  appointments based on Dr. Jeb’s availability.
                </li>
                <li>
                  Appointment Modifications: Patients can reschedule or cancel
                  bookings, with notifications sent to Dr. Jeb for updates.
                </li>
                <li>
                  Appointment Status Tracking: Displays appointment status
                  (e.g., accepted, pending appointment bookings) to keep both
                  patients and Dr. Jeb informed.
                </li>
              </div>
            </div>
            <div className="mt-10 ml-5">
              <p className="font-semibold">4. Messaging Module:</p>
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <li>
                  Secure Patient-Provider Messaging: Facilitates direct,
                  communication between Dr. Jeb and patients, ensuring privacy
                  and confidentiality.
                </li>
                <li>
                  Notification System: Notifies both Dr. Jeb and patients of new
                  messages, ensuring timely responses and effective
                  communication.
                </li>
                <li>
                  Message History: Stores past messages in patient records,
                  providing a reference for ongoing consultations and continuity
                  of care.
                </li>
              </div>
            </div>
            <div className="mt-10 ml-5">
              <p className="font-semibold">4. Reminder Module:</p>
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <li>
                  Manual Reminder Sending: Dr. Jeb can manually send email
                  reminders, maintaining control over patient interactions.
                </li>
              </div>
            </div>
          </section>
        )}
        {active === "book" && (
          <section>
            <h1 className="text-5xl">Appointment Booking Process</h1>
            <div className="mt-10">
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <strong>1. Accessing the Booking System:</strong>
                <div className="ml-5">
                  <li>
                    After logging in, patients navigate to the "Appointments"
                    section in the SafePlace sidebar.
                  </li>
                  <li>Available appointments will be displayed.</li>
                  <li>
                    Clicking the ‘Book Appointments’ button navigates to the
                    booking page where time slots are shown based on Dr. Jeb’s
                    pre-set schedule, with services to choose from and a form
                    for filling out important details.
                  </li>
                </div>

                <strong>2. Viewing Availability:</strong>
                <div className="ml-5">
                  {" "}
                  <li>
                    Patients can see Dr. Jeb’s availability in real-time on a
                    calendar.
                  </li>
                  <li>
                    If the preferred date is fully booked, patients may not be
                    able to see available time slots for that specific date.
                  </li>
                </div>

                <strong>3. Selecting an Appointment Type:</strong>
                <li className="ml-5">
                  Patients select the type of session they need, such as
                  individual counseling, family counseling, therapy,
                  psychological reports, and seminars or workshops.
                </li>

                <strong>4. Requesting a Time Slot:</strong>
                <li className="ml-5">
                  After selecting a date, time, and service, and completing the
                  form with correct information, the patient can proceed to the
                  payment process.
                </li>

                <strong>5. Confirmation and Payment:</strong>
                <div className="ml-5">
                  <li>
                    Depending on the service type, patients may need to upload a
                    payment receipt as part of the booking confirmation.
                  </li>
                  <li>
                    Once requested, the appointment status is set to "Pending
                    Appointments" until Dr. Jeb reviews and approves it.
                  </li>
                </div>

                <strong>6. Payment Receipt Upload:</strong>
                <div className="ml-5">
                  {" "}
                  <li>
                    For sessions requiring payment verification, patients upload
                    a receipt in a dedicated upload section.
                  </li>
                  <li>
                    After the upload, Dr. Jeb is notified to review the payment
                    before finalizing the appointment.
                  </li>
                </div>

                <strong>7. Administrator Approval (Dr. Jeb’s Review):</strong>
                <div className="ml-5">
                  <li>
                    Dr. Jeb receives a system notification prompting him to
                    review the appointment request.
                  </li>
                  <li>
                    He verifies payment if applicable and confirms the
                    appointment, changing the status to “Confirmed.”
                  </li>
                  <li>
                    If necessary, Dr. Jeb can reject the request, especially if
                    the payment receipt is invalid.
                  </li>
                </div>

                <strong>8. Confirmation Notification:</strong>
                <li className="ml-5">
                  The confirmed appointment appears in the patient's accepted
                  area, accessible via the ‘Accepted’ button on the appointment
                  page.
                </li>

                <strong>9. Appointment Reminder:</strong>
                <div className="ml-5">
                  <li>
                    Dr. Jeb can manually send reminders closer to the
                    appointment date to reduce no-shows.
                  </li>
                  <li>Reminders are sent via email notification.</li>
                </div>

                <strong>10. Managing and Modifying Bookings:</strong>
                <div className="ml-5">
                  <li>
                    Patients can view and reschedule confirmed bookings directly
                    on the appointments page.
                  </li>
                  <li>
                    The cancel option is available only if Dr. Jeb has not yet
                    accepted the appointment.
                  </li>
                  <li>
                    Any patient changes are updated in the system and notify Dr.
                    Jeb of adjustments.
                  </li>
                </div>

                <strong>11. Additional Features:</strong>
                <li className="ml-5">
                  <strong>Booking History:</strong> Patients can view a history
                  of their past appointments and statuses for future reference
                  or rescheduling needs.
                </li>
              </div>
            </div>
          </section>
        )}
        {active === "commu" && (
          <section>
            {" "}
            <h1 className="text-5xl">Messaging and Communication</h1>
            <div className="mt-10">
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <strong>1. Message Initiation:</strong>
                <div className="ml-5">
                  <li>
                    From Dr. Jeb to Patients: Dr. Jeb can initiate communication
                    with patients to confirm details, follow up on sessions, or
                    send important updates related to appointments.
                  </li>
                  <li>
                    From Patients to Dr. Jeb: Patients can start conversations
                    with Dr. Jeb to ask questions, discuss concerns, clarify
                    session details, or request guidance on appointment-related
                    topics.
                  </li>
                </div>

                <strong>2. 24/7 Access for Patients:</strong>
                <div className="ml-5">
                  {" "}
                  <li>
                    Patients can send messages anytime, allowing them to
                    communicate when it’s convenient, even outside of typical
                    office hours.
                  </li>
                </div>

                <strong>3. Message Organization:</strong>
                <li className="ml-5">
                  Unread Notifications: Both Dr. Jeb and patients receive
                  notifications for new, unread messages, encouraging timely
                  responses and maintaining effective communication.
                </li>

                <strong>4. Appointment-Related Messaging:</strong>
                <div className="ml-5">
                  <li>
                    Pre-Appointment Queries: Patients can message Dr. Jeb with
                    questions about upcoming appointments, including logistical
                    details, preparatory instructions, or payment verification
                    questions.
                  </li>
                  <li>
                    Post-Appointment Follow-Up: After sessions, patients may
                    have follow-up questions or concerns, which they can address
                    via the messaging system, supporting continuity in care.
                  </li>
                  <li>
                    Missed Appointments: If a patient misses an appointment, Dr.
                    Jeb can send a follow-up message to reschedule or check in,
                    fostering a supportive communication channel.
                  </li>
                </div>

                <strong>5. Appointment Reminders and Engagement:</strong>
                <div className="ml-5">
                  <li>
                    While email reminders are manually sent by Dr. Jeb, he can
                    also message patients directly through SafePlace for
                    additional reminders, such as confirmations, rescheduling,
                    or other session-related updates.
                  </li>
                  <li>
                    Patients can confirm attendance or reply directly to
                    reminders, ensuring Dr. Jeb is informed of their
                    availability and reducing no-shows.
                  </li>
                </div>

                <strong>7. Communication History:</strong>
                <div className="ml-5">
                  <li>
                    SafePlace keeps a record of all communications, allowing
                    both Dr. Jeb and patients to refer back to past messages,
                    session notes, or instructions.
                  </li>
                  <li>
                    This feature helps Dr. Jeb track ongoing patient concerns,
                    previous advice, and any commitments, supporting
                    personalized, responsive care.
                  </li>
                </div>
              </div>
            </div>
          </section>
        )}
        {active === "payment" && (
          <section>
            <h1 className="text-5xl">Payment Verification</h1>
            <div className="mt-10">
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <strong>1. Manual Payment Upload:</strong>
                <div className="ml-5">
                  <li>
                    Patients are required to make payments manually, following
                    payment instructions provided within the system. Payment
                    options may include gcash and union bank only.
                  </li>
                  <li>
                    Once the payment is completed, patients upload a payment
                    receipt directly into SafePlace. This upload may include a
                    photo or screenshot of the transaction confirmation.
                  </li>
                </div>

                <strong>2. Receipt Submission Process:</strong>
                <div className="ml-5">
                  {" "}
                  <li>
                    Upon uploading, patients are prompted with a successful
                    sweet alert stating that they must wait for the approval of
                    Dr. Jeb Doe.
                  </li>
                </div>

                <strong>3. Payment Review by Administrator</strong>
                <div className="ml-5">
                  {" "}
                  <li>
                    Dr. Jeb, as the administrator, can view the details of the
                    patients and decide whether he accept or reject the request.
                  </li>
                  <li>
                    This details includes patient’s information, appointment
                    details, and payment receipt.
                  </li>
                  <li>
                    Dr. Jeb reviews the uploaded receipt, confirming that the
                    payment amount and transaction details align with the money
                    he received from his accounts.
                  </li>
                </div>
                <strong>4. Approval or Rejection of Payment</strong>
                <div className="ml-5">
                  <li>
                    If the payment information matches the money he receive from
                    his accounts, Dr. Jeb can mark it as “Approved,” confirming
                    that the appointment is fully paid and ready for
                    confirmation.
                  </li>
                  <li>
                    In cases where the payment receipt is unclear, incomplete,
                    or incorrect, Dr. Jeb can mark it as “Rejected” and notify
                    the patient that the receipt is counterfeited or incorrect.
                    The system generate a reason why the booking is rejected.
                  </li>
                </div>

                <strong>5. Automated changing of status </strong>
                <div className="ml-5">
                  <li>
                    Once the payment is verified, SafePlace automatically change
                    the status of the appointment into accepted.
                  </li>
                  <li>
                    For rejected payments, the system provides a reason for the
                    rejection.
                  </li>
                </div>

                <strong>6. Security and Confidentiality Measures</strong>
                <div className="ml-5">
                  <li>
                    All payment data, including uploaded receipts and
                    transaction details, is stored securely and accessible only
                    by authorized personnel (in this case, Dr. Jeb).
                  </li>
                </div>
                <strong>7. Limitations and Future Scope</strong>
                <div className="ml-5">
                  <li>
                    As SafePlace currently relies on manual verification,
                    payments require direct review from Dr. Jeb, which allows
                    for personal control but may introduce delays if there is a
                    high volume of appointments.
                  </li>
                  <li>
                    In future iterations, the system could integrate with
                    third-party payment gateways to enable automated transaction
                    verification while maintaining Dr. Jeb’s oversight.
                  </li>
                </div>
              </div>
            </div>
          </section>
        )}
        {active === "reminder" && (
          <section>
            <h1 className="text-5xl">Reminder Management</h1>
            <div className="mt-10">
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <strong>1. . Manual Reminder Sending</strong>
                <div className="ml-5">
                  <li>
                    SafePlace enables Dr. Jeb to manually send reminders, giving
                    him control over the frequency and timing of notifications
                    sent to each patient.
                  </li>
                  <li>
                    This approach allows Dr. Jeb to decide when reminders are
                    necessary (e.g., two days before, the day before, or the
                    morning of the appointment) based on each patient’s needs,
                    giving flexibility in personalizing patient engagement.
                  </li>
                </div>

                <strong>2. Reminder Options and Flexibility</strong>
                <div className="ml-5">
                  {" "}
                  <li>Reminders can be sent for upcoming appointments.</li>
                </div>

                <strong>3. Enhanced Patient Engagement</strong>
                <div className="ml-5">
                  {" "}
                  <li>
                    Reminders help improve appointment attendance rates, reduce
                    no-shows, and keep patients engaged, which is essential for
                    fostering a strong patient-provider relationship.
                  </li>
                  <li>
                    By receiving timely and relevant reminders, patients are
                    more likely to follow through with appointments and stay
                    consistent with their sessions, supporting better health
                    outcomes.
                  </li>
                </div>
                <strong>4. Administrative Efficiency</strong>
                <div className="ml-5">
                  <li>
                    Dr. Jeb can quickly set reminders from within the
                    appointment, reducing the time needed to send individual
                    follow-up emails or messages.
                  </li>
                </div>

                <strong>5. Future Automation Potential </strong>
                <div className="ml-5">
                  <li>
                    Although the system currently uses manual reminders,
                    SafePlace can be updated to support scheduled, automated
                    reminders in future versions, allowing Dr. Jeb to set them
                    in advance and send reminders automatically.
                  </li>
                  <li>
                    Automation would also enable more specific reminder
                    schedules, like sending a series of reminders (e.g., one
                    week, two days, and one hour before an appointment) without
                    additional manual work.
                  </li>
                </div>

                <strong>6. Security and Confidentiality Measures</strong>
                <div className="ml-5">
                  <li>
                    All reminder content and patient information are securely
                    stored and shared only with the intended recipient, ensuring
                    patient confidentiality.
                  </li>
                </div>
              </div>
            </div>
          </section>
        )}
        {active === "account" && (
          <section>
            <h1 className="text-5xl">User Account Management</h1>
            <div className="mt-10">
              <div className="ml-5 flex flex-col gap-2 mt-1">
                <p>
                  User Account Management (UAM) is essential for ensuring secure
                  and personalized interactions for both patients and Dr. jeb
                  Doe on the SafePlace platform. This system allows patients to
                  manage their profiles, access resources, and engage with Dr.
                  Jeb Doe. For Dr. Jeb, UAM enables efficient patient
                  management, including viewing patient details and maintaining
                  updated information for effective treatment and communication.
                </p>
                <p className="mt-5">For Patients</p>
                <strong>1. Registration:</strong>
                <div className="ml-5">
                  <li>
                    Initial Setup: Patients begin by creating an account on
                    SafePlace using their email and a password. This process
                    requires setting up essential details like name, contact
                    information, and other basic profile information.
                  </li>
                </div>

                <strong>2. Logging In:</strong>
                <div className="ml-5">
                  {" "}
                  <li>
                    Secure Access: Patients log in with their email and
                    password. For ease, they have access to a “Forgot Password”
                    feature to reset it if needed, enhancing usability while
                    maintaining security.
                  </li>
                </div>

                <strong>3. Profile Updates:</strong>
                <div className="ml-5">
                  <li>
                    Profile Information Management: Patients can update personal
                    details in the account settings, such as contact information
                    or personal information.
                  </li>
                </div>
                <p className="mt-5">For Dr. Jeb</p>
                <strong>1. Patient Management:</strong>
                <div className="ml-5">
                  <li>
                    Profile Access: Dr. Jeb can view individual patient
                    profiles, enabling him to see essential information about
                    each patient at a glance, such as contact details, medical
                    history, and recent interactions.
                  </li>
                  <li>
                    Communication History: A record of previous communications,
                    consultations, or notes is available, helping Dr. Jeb
                    maintain continuity in patient care and offer tailored
                    treatment recommendations.
                  </li>
                </div>

                <strong>2. Updating Patient Information:</strong>
                <div className="ml-5">
                  <li>
                    Record Updates: Dr. Jeb can update patient information, such
                    as diagnosis details, treatment plans, or changes in
                    medication. This ensures that both Dr. Jeb and the patients
                    have up-to-date, synchronized records.
                  </li>
                  <li>
                    Note-Taking and File Uploads: The system may also allow Dr.
                    Jeb to upload files, such as lab results, x-rays, or other
                    relevant documents, and add personal notes that are helpful
                    for future consultations.
                  </li>
                </div>

                <strong>3. Logging In:</strong>
                <div className="ml-5">
                  <li>
                    Secure Access: Dr. Jeb needs OTP Verification before
                    successfully logged in to the system and making sure that
                    brute-force protection is being implemented to avoid access
                    to the admin dashboard.
                  </li>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default UserGuide;
