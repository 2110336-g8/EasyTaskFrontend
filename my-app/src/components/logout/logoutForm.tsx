import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const LogoutForm: React.FC = () => {
  const [isLogin, setLogin] = useState(true);

  const handleToggle = () => {
    setTimeout(() => {
      setLogin(!isLogin);
      if (isLogin) {
        window.location.href = "/"; 
      } else {
        window.location.href = "/login"; 
      }
    }, 100); 
  };

  return (
    <div className="w-full h-full">
      <div className="flex h-screen justify-center items-center"> 
        <motion.div
          initial={{ y: -1080 }}
          animate={{ y: 0 }} 
          transition={{ duration: 3, damping: 10, type: "spring" }} 
        >
          <Button className="flex" onClick={() => { handleToggle(); }}>
            {isLogin ? "Logout" : "Login"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default LogoutForm;
