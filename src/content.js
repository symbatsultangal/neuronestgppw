export const storySteps = [
  {
    id: "overload",
    number: "01",
    title: "Overload starts",
    shortLabel: "Overload",
    classroomContext:
      "The bell rings, chairs scrape, and bright classroom light makes it harder for the child to stay regulated while NeuroNest rests on the wrist as a soft Pulse Cuff.",
    deviceResponse:
      "The Pulse Cuff stays quiet while its nest core shows that sensory stress may be rising and support may be needed.",
    panelText:
      "This first step explains the problem from the child's point of view: sensory overload can happen quickly during normal school moments.",
    highlightedFeatures: ["sensor"],
    stressLevel: 82,
    focusLevel: 28,
    color: "#e84f86",
    softColor: "#ffe0eb",
    status: "Stress rising",
  },
  {
    id: "sense",
    number: "02",
    title: "NeuroNest senses it",
    shortLabel: "Sense",
    classroomContext:
      "The child does not need to hold anything; the wraparound Pulse Cuff sits gently against the wrist during class.",
    deviceResponse:
      "The underside sensor pad represents simulated 24/7 heartbeat, motion, and skin-response tracking, shown here as concept data only.",
    panelText:
      "The website does not read real body data. It uses simulated 24/7 heartbeat and stress indicators to show how a future Pulse Cuff could notice a pattern with consent.",
    highlightedFeatures: ["sensor", "feedback"],
    stressLevel: 68,
    focusLevel: 38,
    color: "#d15bb8",
    softColor: "#f8def4",
    status: "Pattern detected",
  },
  {
    id: "calm",
    number: "03",
    title: "Calming support begins",
    shortLabel: "Calm",
    classroomContext:
      "Instead of leaving the lesson, the child can receive a quiet calming cue directly from the Pulse Cuff.",
    deviceResponse:
      "Soft light flows through the nest core, gentle haptic rhythm moves through the cuff, and raised tactile pads offer a discreet grounding cue.",
    panelText:
      "This is the main NeuroNest idea: combine LED light, haptic vibration, and tactile touch in one wearable support tool.",
    highlightedFeatures: ["led", "vibration", "tactile"],
    stressLevel: 34,
    focusLevel: 72,
    color: "#f38bb4",
    softColor: "#ffe5ef",
    status: "Calming active",
  },
  {
    id: "summary",
    number: "04",
    title: "Adult feedback stays minimal",
    shortLabel: "Summary",
    classroomContext:
      "After class, adults can review a small note about stressful periods without exposing unnecessary personal data from the wearable.",
    deviceResponse:
      "A consent-based summary card shows heartbeat trends, support activation, and which calming pattern helped.",
    panelText:
      "Feedback is shown as a minimal consent-based daily note, not constant surveillance. Consent and privacy stay part of the prototype story.",
    highlightedFeatures: ["feedback"],
    stressLevel: 26,
    focusLevel: 64,
    color: "#ffadc7",
    softColor: "#fff0f5",
    status: "Summary ready",
  },
];

export const researchStats = [
  {
    value: "78%",
    label: "reported high sensitivity to noise or light",
  },
  {
    value: "82%",
    label: "said current support does not meet individual needs",
  },
  {
    value: "85%",
    label: "rated the proposed device very or extremely useful",
  },
];

export const actionPlan = [
  {
    month: "Month 1",
    title: "Prototype",
    detail: "Design child-safe casing, LED behavior, haptic patterns, and safe materials.",
  },
  {
    month: "Month 2",
    title: "Pilot",
    detail: "Test the concept with 10 children in a school environment with adult supervision.",
  },
  {
    month: "Month 3",
    title: "Adjust",
    detail: "Tune light and haptic patterns based on pilot feedback and individual preferences.",
  },
  {
    month: "Month 4",
    title: "Launch",
    detail: "Introduce NeuroNest in 5 partner schools with teacher training.",
  },
];

export const simulationMappings = [
  ["Soft LED light", "Breathing glow inside the nest core during the calming step"],
  ["Gentle vibration", "Subtle haptic waves moving through the Pulse Cuff"],
  ["Tactile surfaces", "Raised tactile pads around the cuff for quiet touch input"],
  ["Pulse or skin sensor", "Underside wrist sensor plus simulated heartbeat and stress meters"],
  ["Caregiver reports", "Minimal consent-based daily summary card"],
];
