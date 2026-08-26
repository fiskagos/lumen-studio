"use client";

import {useState} from "react";
import CapabilityRow from "./CapabilityRow";

const capabilities = [
  {
    title: "DESIGN",
    preview:
      "DIGITAL EXPERIENCES SHAPED AROUND THE IDEA, NOT AROUND A TEMPLATE.",
    services: [
      "WEBSITE DESIGN",
      "UX / UI",
      "INFORMATION ARCHITECTURE",
      "RESPONSIVE DESIGN",
      "VISUAL SYSTEMS",
      "INTERACTION DIRECTION",
    ],
    detail:
      "We shape how your digital presence looks, feels and works before a line of production code is written. From structure and page flow to typography, layout, interaction and responsive behaviour, we design the experience around the idea and the people using it.",
  },
  {
    title: "COMMERCE",
    preview:
      "THOUGHTFUL STOREFRONTS BUILT TO MAKE DISCOVERY AND BUYING FEEL EFFORTLESS.",
    services: [
      "SHOPIFY",
      "PRODUCT STRUCTURE",
      "COLLECTION ARCHITECTURE",
      "PRODUCT PAGES",
      "CART EXPERIENCE",
      "COMMERCE UX",
    ],
    detail:
      "We design commerce around the way people actually discover, understand and buy your work or product. The goal is not simply to create a shop, but to make the path from interest to purchase feel clear and natural.",
  },
  {
    title: "AI",
    preview:
      "USEFUL INTELLIGENCE WOVEN INTO THE EXPERIENCE WHERE IT GENUINELY ADDS VALUE.",
    services: [
      "AI INTEGRATIONS",
      "SMART WORKFLOWS",
      "AUTOMATION",
      "SEARCH ASSISTANCE",
      "CONTENT ASSISTANCE",
      "CUSTOM AI EXPERIENCES",
    ],
    detail:
      "We use AI where it removes friction, saves time or creates a genuinely better experience. The technology should serve the product and the people using it, not exist simply because AI happens to be fashionable this decade.",
  },
  {
    title: "ENGINEERING",
    preview:
      "CAREFULLY ENGINEERED SYSTEMS BUILT FOR PERFORMANCE, FLEXIBILITY AND LONGEVITY.",
    services: [
      "FRONTEND DEVELOPMENT",
      "NEXT.JS / REACT",
      "SHOPIFY DEVELOPMENT",
      "API INTEGRATIONS",
      "PERFORMANCE",
      "TECHNICAL ARCHITECTURE",
    ],
    detail:
      "We turn the design into a fast, flexible and maintainable digital product. The build is considered as carefully as the interface, so the system can evolve without becoming increasingly painful to work with.",
  },
] as const;

type CapabilityTitle = (typeof capabilities)[number]["title"];

export default function CapabilitiesSection() {
  const [activeCapability, setActiveCapability] =
    useState<CapabilityTitle | null>(null);

  const active = capabilities.find(
    (capability) => capability.title === activeCapability,
  );

  return (
    <div
      className="capabilities-layout"
      onMouseLeave={() => setActiveCapability(null)}
    >
      <div className="capabilities-list">
        {capabilities.map((capability) => (
          <CapabilityRow
            key={capability.title}
            title={capability.title}
            description={capability.preview}
            isOpen={activeCapability === capability.title}
            onActivate={() => setActiveCapability(capability.title)}
          />
        ))}
      </div>

      <aside className="capability-panel">
        {active && (
          <div className="capability-panel-content">
            <div className="capability-panel-services">
              {active.services.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>

            <p>{active.detail}</p>
          </div>
        )}
      </aside>
    </div>
  );
}