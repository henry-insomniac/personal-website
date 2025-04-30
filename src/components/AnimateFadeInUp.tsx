import React from "react";

interface AnimateFadeInUpProps {
  children: React.ReactNode;
  delay?: string;
}

const AnimateFadeInUp: React.FC<AnimateFadeInUpProps> = ({
  children,
  delay = "0s",
}) => {
  return (
    <div
      style={{ animationDelay: delay }}
      // 使用 Tailwind JIT 模式识别的类名，确保动画应用
      className="animate-fade-in-up opacity-0 fill-mode-forwards"
    >
      {children}
    </div>
  );
};

export default AnimateFadeInUp;
