import { describe, expect, it } from "vitest";
import {
  actionPlan,
  researchStats,
  storySteps,
} from "./content.js";

describe("NeuroNest hardcoded presentation content", () => {
  it("defines the four required story-first demo steps", () => {
    expect(storySteps.map((step) => step.id)).toEqual([
      "overload",
      "sense",
      "calm",
      "summary",
    ]);
  });

  it("maps the story to physical device concepts and simulated website behavior", () => {
    const highlightedFeatures = storySteps.flatMap((step) => step.highlightedFeatures);

    expect(highlightedFeatures).toEqual(
      expect.arrayContaining(["led", "vibration", "tactile", "sensor", "feedback"]),
    );
    expect(storySteps.find((step) => step.id === "sense").deviceResponse).toContain(
      "sensor pad",
    );
    expect(storySteps.find((step) => step.id === "summary").panelText).toContain(
      "consent-based",
    );
  });

  it("presents NeuroNest as a Pulse Cuff with simulated 24/7 monitoring", () => {
    const combinedText = storySteps
      .map((step) => `${step.classroomContext} ${step.deviceResponse} ${step.panelText}`)
      .join(" ");

    expect(combinedText).toContain("Pulse Cuff");
    expect(combinedText).toContain("nest core");
    expect(combinedText).toContain("24/7");
    expect(combinedText).toContain("heartbeat");
    expect(combinedText).toContain("simulated");
  });

  it("shows stress rising before calming support takes effect", () => {
    const overload = storySteps.find((step) => step.id === "overload");
    const calm = storySteps.find((step) => step.id === "calm");

    expect(overload.stressLevel).toBeGreaterThan(calm.stressLevel);
    expect(calm.deviceResponse).toContain("light");
    expect(calm.deviceResponse).toContain("haptic");
  });

  it("uses a rose and pink story palette", () => {
    expect(storySteps.map((step) => step.color)).toEqual([
      "#e84f86",
      "#d15bb8",
      "#f38bb4",
      "#ffadc7",
    ]);
    expect(storySteps.map((step) => step.softColor)).toEqual([
      "#ffe0eb",
      "#f8def4",
      "#ffe5ef",
      "#fff0f5",
    ]);
  });

  it("keeps the research evidence visible for the presentation", () => {
    expect(researchStats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: "78%" }),
        expect.objectContaining({ value: "82%" }),
        expect.objectContaining({ value: "85%" }),
      ]),
    );
  });

  it("summarizes the four-month implementation plan", () => {
    expect(actionPlan).toHaveLength(4);
    expect(actionPlan.map((item) => item.month)).toEqual([
      "Month 1",
      "Month 2",
      "Month 3",
      "Month 4",
    ]);
  });
});
