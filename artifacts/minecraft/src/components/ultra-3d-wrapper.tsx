import { ReactNode, useEffect, useState } from "react";
import { usePerformanceConfig } from "@/lib/performance";

export default function Ultra3DWrapper({ children }: { children: ReactNode }) {
  const config = usePerformanceConfig();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    if (!config.enable3DWorldWrap) return;
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setRotateY(((e.clientX - cx) / cx) * 2);
      setRotateX(-((e.clientY - cy) / cy) * 2);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [config.enable3DWorldWrap]);

  if (!config.enable3DWorldWrap) return <>{children}</>;

  return (
    <div
      style={{
        perspective: config.perspective3D,
        perspectiveOrigin: "50% 50%",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
