import { motion, useTime, useTransform, useMotionValue } from "framer-motion";

export const Floating = ({children}) => {
  const time = useTime();
  const rotate = useTransform(time, [0, 0], [0, 0]);
  const x = useMotionValue(0);
  const y = useTransform(time, (latest) => Math.sin(latest / 2000) * 30);

  return (
    <div className="flex justify-center w-full">
      <motion.div style={{ rotate, x, y }}>
        {children}
      </motion.div>
    </div>
  );
};
