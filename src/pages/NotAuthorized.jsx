import { LockRounded, Warning, WarningRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isNotAuthorized = location.pathname === "/not-authorized";

  return (
    <div>
      {isNotAuthorized ? (
        <>
          <div className="w-full h-[100vh] flex justify-center items-center">
            <div className="shadow-2xl p-6 py-10 flex flex-col gap-4 justify-center items-center">
              <div className="bg-[#ececec] rounded-full w-fit p-4">
                <LockRounded sx={{ fontSize: "6rem", color: "red" }} />
              </div>
              <h1 className="text-2xl font-semibold">Access Denied</h1>
              <p>Sorry, you do not have permission to access this page.</p>
              <Button
                variant="outlined"
                className=""
                sx={{ color: "#2c6975", borderColor: "#2c6975" }}
                onClick={() => navigate(-3)}
              >
                Go back
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-[100vh] flex justify-center items-center">
            <div className="shadow-2xl p-6 py-10 flex flex-col gap-4 justify-center items-center">
              <div className="bg-[#ececec] rounded-full w-fit p-4">
                <WarningRounded sx={{ fontSize: "6rem", color: "#2c6975" }} />
              </div>
              <h1 className="text-2xl font-semibold">Page Not Found</h1>
              <p>Sorry, you may go back using that button below.</p>
              <Button
                variant="outlined"
                className=""
                sx={{ bgcolor: "#2c6975", color: "white" }}
                onClick={() => navigate(-1)}
              >
                Go back
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotAuthorized;
