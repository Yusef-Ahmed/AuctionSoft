import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BadgeCheck, CircleAlert, Info, TriangleAlert } from "lucide-react";

function Notification({ error, status }) {
  useEffect(() => {
    toast[status](error);
  }, [error, status]);

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        closeOnClick
        theme="dark"
        icon={({ type, theme }) => {
          switch (type) {
            case "success":
              return <BadgeCheck className="stroke-green-500" />;
            case "error":
              return <CircleAlert className="stroke-red-500" />;
            default:
              return <Info className="stroke-indigo-400" />;
          }
        }}
      />
    </div>
  );
}

export default Notification;
