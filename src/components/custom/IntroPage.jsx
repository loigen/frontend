import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import step1 from "../../images/Step1.png";
import step2 from "../../images/step2.png";
import step3 from "../../images/step3.jpg";
import final from "../../images/final.png";
const IntroDialog = ({ open, onClose }) => {
  const steps = [
    {
      text: "Please take time to check this tutorial for it will guide you on how to book an appointment.",
      image: null,
      todo: null,
    },
    {
      text: "Step 1: Do this first...",
      image: step1,
      todo: ["Open the appointments page", "Select your desired service"],
    },
    {
      text: "Step 2: Then try this...",
      image: step2,
      todo: [
        "Fill out the required information, all details are required",
        "check the appointment details then click proceed",
      ],
    },
    {
      text: "Step 3: Enjoy the system!",
      image: step3,
      todo: [
        "Review the details then pay",
        "upload your qr code then book appointment",
      ],
    },
    {
      text: "Great! Now you can create your appointment",
      image: final,
      todo: [
        "Check your appointment dashboard",
        "Wait for the doctors approval",
        "Please keep in mind that if your appointment or payment is not valid and the doctor will automatically reject your request!",
      ],
    },
  ];

  const [stepIndex, setStepIndex] = useState(0);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    setStepIndex(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Welcome to <span className="text-[#2c6975] font-bold">SafePlace</span>!
      </DialogTitle>
      <DialogContent>
        <div className="text-lg space-y-4">
          <p>{steps[stepIndex].text}</p>
          {steps[stepIndex].image && (
            <img
              src={steps[stepIndex].image}
              alt={`Step ${stepIndex + 1}`}
              className="w-full h-80 object-cover"
            />
          )}
          {steps[stepIndex].todo && (
            <ul className="list-disc list-inside space-y-2">
              {steps[stepIndex].todo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        {stepIndex > 0 && (
          <Button
            variant="outlined"
            sx={{ color: "#2c6975" }}
            onClick={handleBack}
            color="primary"
          >
            Back
          </Button>
        )}
        <Button
          variant="contained"
          sx={{ bgcolor: "#2c6975" }}
          onClick={handleNext}
          color="primary"
        >
          {stepIndex === steps.length - 1 ? "Got it!" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IntroDialog;
