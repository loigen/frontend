import React, { useState } from "react";
import Swal from "sweetalert2";

const MeetPlaceModal = ({ isOpen, onClose, onSubmit }) => {
  const [meetPlace, setMeetPlace] = useState("");

  const handleSubmit = () => {
    if (meetPlace.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a meet place!",
      });
      return;
    }

    onSubmit(meetPlace);
    setMeetPlace("");

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Meet place has been submitted successfully.",
    }).then(() => {
      onClose();
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg mx-4 w-full sm:w-11/12 md:w-3/4 lg:w-1/2 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Enter Meet Place</h2>
        <input
          type="text"
          value={meetPlace}
          onChange={(e) => setMeetPlace(e.target.value)}
          placeholder="Enter the place of the meeting (e.g., Conference Room B)"
          className="w-full p-2 border rounded-lg mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetPlaceModal;
