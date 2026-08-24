"use client";

type CapabilityRowProps = {
  title: string;
  description: string;
};

export default function CapabilityRow({
  title,
  description,
}: CapabilityRowProps) {
  return (
    <div className="capability-item">

      <span className="capability-title">
        {title}
      </span>

      <span className="capability-description">
        {description}
      </span>

    </div>
  );
}