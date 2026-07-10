import { motion, useMotionValue, useSpring } from 'framer-motion';

const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  function onMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
    const yPct = ((event.clientY - rect.top) / rect.height - 0.5) * -20;
    x.set(xPct);
    y.set(yPct);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: mouseY, rotateY: mouseX, transformStyle: "preserve-3d" }}
      className={`glass-cinematic relative group p-8 rounded-[2.5rem] border border-white/5 hover:border-green-500/30 transition-all duration-500 shadow-2xl ${className}`}
    >
      <div style={{ transform: "translateZ(40px)" }} className="relative z-10 h-full flex flex-col">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/[0.05] group-hover:to-transparent transition-all duration-700 rounded-[2.5rem]" />
      <div className="absolute inset-0 light-sweep-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />
    </motion.div>
  );
};

export default TiltCard;
