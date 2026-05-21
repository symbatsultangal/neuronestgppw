import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, RoundedBox } from "@react-three/drei";
import {
  Activity,
  BellRing,
  BookOpen,
  ChevronRight,
  Hand,
  HeartPulse,
  Lightbulb,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Vibrate,
} from "lucide-react";
import {
  actionPlan,
  researchStats,
  simulationMappings,
  storySteps,
} from "./content.js";

const featureLabels = {
  led: "Soft LED light",
  vibration: "Gentle haptic rhythm",
  tactile: "Raised tactile pads",
  sensor: "24/7 heartbeat sensor",
  feedback: "Caregiver summary",
};

function App() {
  const [selectedStepId, setSelectedStepId] = useState(storySteps[0].id);
  const selectedStep = storySteps.find((step) => step.id === selectedStepId) ?? storySteps[0];

  return (
    <main className="app">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="NeuroNest home">
          <span className="brand-mark" aria-hidden="true" />
          NeuroNest
        </a>
        <nav aria-label="Page sections">
          <a href="#evidence">Evidence</a>
          <a href="#simulation">Simulation</a>
          <a href="#plan">Plan</a>
        </nav>
      </header>

      <section id="top" className="story-hero" aria-label="NeuroNest scenario walkthrough">
        <div className="hero-intro">
          <p className="eyebrow">Story-first concept prototype</p>
          <h1>Calm sensory overload.</h1>
          <p className="hero-lede">
            NeuroNest is a soft Pulse Cuff concept with a glowing nest core, raised
            tactile pads, and simulated 24/7 heartbeat/stress tracking for this
            website demo.
          </p>

          <div className="story-controls" aria-label="Story step controls">
            {storySteps.map((step) => (
              <button
                className={selectedStep.id === step.id ? "story-step active" : "story-step"}
                key={step.id}
                onClick={() => setSelectedStepId(step.id)}
                style={{ "--step-color": step.color, "--step-soft": step.softColor }}
                type="button"
              >
                <span>{step.number}</span>
                <strong>{step.shortLabel}</strong>
              </button>
            ))}
          </div>

          <div className="scenario-card" aria-label="Classroom scenario">
            <div className="scenario-icon" aria-hidden="true">
              <BellRing />
            </div>
            <div>
              <span>Classroom moment</span>
              <p>{selectedStep.classroomContext}</p>
            </div>
          </div>
        </div>

        <section className="demo-stage" id="device" aria-label="Interactive device response">
          <div className="scene-wrap">
            <NeuroNestScene step={selectedStep} />
          </div>
          <StoryPanel step={selectedStep} onSelectStep={setSelectedStepId} />
        </section>
      </section>

      <section id="evidence" className="content-band evidence-band">
        <div className="section-heading">
          <p className="eyebrow">Research evidence</p>
          <h2>Why this prototype focuses on fast, discreet classroom support</h2>
        </div>
        <div className="stats-grid">
          {researchStats.map((stat) => (
            <article className="stat-card" key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="simulation" className="content-band simulation-band">
        <div className="section-heading">
          <p className="eyebrow">Website simulation</p>
          <h2>How physical device functions are represented online</h2>
        </div>
        <div className="mapping-list">
          {simulationMappings.map(([physical, website]) => (
            <div className="mapping-row" key={physical}>
              <span>{physical}</span>
              <span>{website}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="plan" className="content-band plan-band">
        <div className="section-heading">
          <p className="eyebrow">Action plan</p>
          <h2>From concept demo to school pilot</h2>
        </div>
        <div className="timeline">
          {actionPlan.map((item) => (
            <article className="timeline-step" key={item.month}>
              <span>{item.month}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band ethics-band">
        <div className="ethics-copy">
          <ShieldCheck aria-hidden="true" />
          <div>
            <p className="eyebrow">Safety and ethics</p>
            <h2>Assistive tool only, with consent</h2>
            <p>
              NeuroNest is presented as a concept support device, not a replacement
              for teachers, parents, psychologists, or specialists. The prototype
              uses simulated data only; a real version would need child-safe
              materials, adjustable intensity, minimal data collection, and clear
              consent from caregivers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function StoryPanel({ step, onSelectStep }) {
  const nextIndex = (storySteps.findIndex((item) => item.id === step.id) + 1) % storySteps.length;
  const nextStep = storySteps[nextIndex];

  return (
    <aside className="story-panel" aria-label="Current NeuroNest story step">
      <div className="panel-topline">
        <span className="step-badge" style={{ background: step.color }}>
          {step.number}
        </span>
        <span>{step.status}</span>
      </div>

      <h2>{step.title}</h2>
      <p className="panel-copy">{step.panelText}</p>

      <div className="response-box">
        <Sparkles aria-hidden="true" />
        <div>
          <span>Device response</span>
          <p>{step.deviceResponse}</p>
        </div>
      </div>

      <div className="feature-chip-list" aria-label="Highlighted device features">
        {step.highlightedFeatures.map((feature) => (
          <span className="feature-chip" key={feature}>
            {featureLabels[feature]}
          </span>
        ))}
      </div>

      <div className="meters">
        <Meter
          icon={<Activity aria-hidden="true" />}
          label="Simulated stress"
          value={step.stressLevel}
          color={step.color}
        />
        <Meter
          icon={<BookOpen aria-hidden="true" />}
          label="Ready to focus"
          value={step.focusLevel}
          color="#d15bb8"
        />
      </div>

      <button className="next-story-button" onClick={() => onSelectStep(nextStep.id)} type="button">
        Next: {nextStep.shortLabel}
        <ChevronRight aria-hidden="true" />
      </button>
    </aside>
  );
}

function Meter({ icon, label, value, color }) {
  return (
    <div className="meter-row">
      <div className="meter-label">
        {icon}
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="meter-track" aria-label={`${label} ${value} percent`}>
        <span style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

function NeuroNestScene({ step }) {
  return (
    <Canvas
      camera={{ position: [0, 1.08, 5.85], fov: 41 }}
      dpr={[1, 1.8]}
      fallback={<StaticDevicePreview step={step} />}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#fff1f7"]} />
      <ambientLight intensity={0.78} />
      <directionalLight intensity={1.4} position={[3.2, 4.8, 4]} />
      <pointLight color={step.color} intensity={2.6} position={[0, 1.3, 2.8]} />
      <group position={[0, 0.58, 0]} scale={0.98}>
        <ClassroomBackdrop step={step} />
        <NeuroNestDevice step={step} />
      </group>
      <Environment preset="apartment" />
      <OrbitControls
        enablePan={false}
        maxDistance={7.2}
        maxPolarAngle={Math.PI / 2.02}
        minDistance={4.4}
        minPolarAngle={Math.PI / 3.2}
      />
    </Canvas>
  );
}

function StaticDevicePreview({ step }) {
  return (
    <div className="static-device-preview" aria-label="Static NeuroNest device preview">
      <div className="static-hand" />
      <div className="static-cuff">
        <span className="static-led" style={{ background: step.color, boxShadow: `0 0 28px ${step.color}` }} />
        <span className="static-core">
          <span />
        </span>
        <span className="static-sensor" />
      </div>
    </div>
  );
}

function ClassroomBackdrop({ step }) {
  const highStress = step.id === "overload";
  const accent = highStress ? "#e84f86" : step.color;

  return (
    <group position={[0, -0.58, -0.82]}>
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.9, 2.7]} />
        <meshStandardMaterial color="#ffe8f1" roughness={0.92} />
      </mesh>

      <RoundedBox args={[3.25, 1.56, 0.06]} radius={0.18} smoothness={12} position={[0, 0.68, -0.12]}>
        <meshStandardMaterial color={highStress ? "#fff0f5" : "#fff6fa"} roughness={0.84} />
      </RoundedBox>

      <mesh position={[0, 0.7, -0.07]}>
        <ringGeometry args={[1.26, 1.29, 96]} />
        <meshStandardMaterial color="#f4c7d8" transparent opacity={0.34} roughness={0.9} />
      </mesh>

      {[-1.34, 1.34].map((x) => (
        <RoundedBox args={[0.68, 0.08, 0.05]} key={x} position={[x, -0.34, 0.04]} radius={0.03}>
          <meshStandardMaterial color={x < 0 ? "#ffadc7" : "#d15bb8"} roughness={0.66} />
        </RoundedBox>
      ))}

      {highStress && (
        <>
          <NoiseMark color={accent} position={[-1.42, 1.3, 0.08]} rotation={0.22} />
          <NoiseMark color={accent} position={[1.44, 1.24, 0.08]} rotation={-0.22} />
        </>
      )}
    </group>
  );
}

function NoiseMark({ color, position, rotation }) {
  return (
    <group position={position} rotation={[0, 0, rotation]}>
      {[0, 0.12, 0.24].map((offset) => (
        <mesh key={offset} position={[offset, 0, 0]}>
          <boxGeometry args={[0.032, 0.23 - offset * 0.26, 0.035]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.26} />
        </mesh>
      ))}
    </group>
  );
}

function NeuroNestDevice({ step }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const hapticRefs = useRef([]);
  const highlight = (feature) => step.highlightedFeatures.includes(feature);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.22 + Math.sin(t * 0.25) * 0.08;
      groupRef.current.position.y = Math.sin(t * 1.1) * 0.018;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.2) * (highlight("led") ? 0.08 : 0.025);
      coreRef.current.scale.set(pulse, pulse, 1);
    }
    hapticRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const pulse = 1 + Math.sin(t * 3.1 + index * 0.7) * (highlight("vibration") ? 0.18 : 0.05);
      mesh.scale.set(pulse * 0.62, pulse, 1);
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0.55]}>
      <ChildHand />
      <PulseCuff active={highlight("tactile")} color={step.color} />
      <NestCore
        active={highlight("led")}
        color={step.color}
        coreRef={coreRef}
        showFeedback={highlight("feedback")}
      />
      <SensorPad active={highlight("sensor")} color={step.color} />
      <HapticPulse side="left" active={highlight("vibration")} color={step.color} refs={hapticRefs} index={0} />
      <HapticPulse side="right" active={highlight("vibration")} color={step.color} refs={hapticRefs} index={1} />
    </group>
  );
}

function ChildHand() {
  const skin = "#f4c7a8";
  const skinSoft = "#f7d4bd";
  const skinShadow = "#e9b090";

  return (
    <group position={[0, -0.1, 0.05]}>
      <RoundedBox args={[3.35, 0.5, 0.36]} radius={0.23} smoothness={22} position={[-0.42, 0, -0.02]}>
        <meshStandardMaterial color={skin} roughness={0.68} />
      </RoundedBox>

      <RoundedBox args={[0.98, 0.72, 0.4]} radius={0.28} smoothness={22} position={[1.42, 0.05, 0.02]}>
        <meshStandardMaterial color={skin} roughness={0.68} />
      </RoundedBox>

      {[-0.29, -0.1, 0.1, 0.3].map((y, index) => (
        <RoundedBox
          args={[0.82 - index * 0.035, 0.12, 0.22]}
          key={y}
          position={[1.96, y + 0.08, 0.04]}
          radius={0.07}
          rotation={[0, 0, index < 2 ? -0.03 : 0.03]}
          smoothness={12}
        >
          <meshStandardMaterial color={index === 0 ? skinShadow : skinSoft} roughness={0.7} />
        </RoundedBox>
      ))}

      <RoundedBox
        args={[0.66, 0.14, 0.23]}
        position={[1.56, -0.42, 0.06]}
        radius={0.08}
        rotation={[0, 0, -0.42]}
        smoothness={12}
      >
        <meshStandardMaterial color={skinShadow} roughness={0.7} />
      </RoundedBox>
    </group>
  );
}

function PulseCuff({ active, color }) {
  const padColor = active ? color : "#ffbad0";

  return (
    <group position={[-0.58, 0.04, 0.33]} rotation={[0, 0, -0.02]}>
      <RoundedBox args={[1.9, 0.82, 0.32]} radius={0.32} smoothness={24}>
        <meshStandardMaterial color="#b83f78" roughness={0.46} metalness={0.04} />
      </RoundedBox>

      <RoundedBox args={[1.5, 0.54, 0.12]} radius={0.24} smoothness={22} position={[0.04, 0, 0.2]}>
        <meshStandardMaterial color="#fff3f8" roughness={0.56} />
      </RoundedBox>

      <RoundedBox args={[1.34, 0.08, 0.08]} radius={0.04} smoothness={12} position={[0.03, 0.31, 0.3]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 0.76 : 0.18}
          roughness={0.34}
          transparent
          opacity={active ? 0.95 : 0.72}
        />
      </RoundedBox>

      {[-0.76, 0.84].map((x) => (
        <RoundedBox args={[0.28, 0.66, 0.2]} key={x} position={[x, 0, 0.12]} radius={0.13} smoothness={16}>
          <meshStandardMaterial color="#92315f" roughness={0.5} />
        </RoundedBox>
      ))}

      {[-0.77, 0.86].map((x) =>
        [-0.2, 0, 0.2].map((y, index) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.29]}>
            <sphereGeometry args={[0.055 + index * 0.004, 20, 14]} />
            <meshStandardMaterial
              color={padColor}
              emissive={active ? color : "#000000"}
              emissiveIntensity={active ? 0.32 : 0}
              roughness={0.5}
            />
          </mesh>
        )),
      )}

      {[[-0.34, -0.31], [0.4, -0.3]].map(([x, y]) => (
        <RoundedBox
          args={[0.36, 0.06, 0.06]}
          key={`${x}-${y}`}
          position={[x, y, 0.29]}
          radius={0.03}
          smoothness={10}
        >
          <meshStandardMaterial color="#ffd1df" roughness={0.48} />
        </RoundedBox>
      ))}
    </group>
  );
}

function NestCore({ active, color, coreRef, showFeedback }) {
  return (
    <group position={[-0.58, 0.04, 0.63]} ref={coreRef}>
      <RoundedBox args={[0.68, 0.46, 0.12]} radius={0.22} smoothness={24} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#fff8fb"
          emissive={active ? color : "#000000"}
          emissiveIntensity={active ? 0.18 : 0}
          roughness={0.38}
        />
      </RoundedBox>

      {[
        [-0.02, 0.12, 0.22, 0.2],
        [0.06, 0.01, 0.36, -0.16],
        [-0.02, -0.12, 0.28, 0.2],
      ].map(([x, y, width, rotation]) => (
        <RoundedBox
          args={[width, 0.045, 0.045]}
          key={`${x}-${y}`}
          position={[x, y, 0.11]}
          radius={0.03}
          rotation={[0, 0, rotation]}
          smoothness={10}
        >
          <meshStandardMaterial
            color={active ? color : "#ffc1d5"}
            emissive={active ? color : "#ffc1d5"}
            emissiveIntensity={active ? 0.96 : 0.24}
            roughness={0.3}
            transparent
            opacity={active ? 0.96 : 0.75}
          />
        </RoundedBox>
      ))}

      <mesh position={[0, -0.01, 0.15]} scale={[1.28, 0.82, 0.56]}>
        <sphereGeometry args={[0.18, 36, 22]} />
        <meshStandardMaterial
          color={showFeedback ? "#5b2740" : "#fff1f7"}
          emissive={showFeedback ? color : active ? color : "#000000"}
          emissiveIntensity={showFeedback ? 0.45 : active ? 0.22 : 0}
          roughness={0.24}
        />
      </mesh>
      <HeartbeatGraph color={color} showFeedback={showFeedback} />
    </group>
  );
}

function HeartbeatGraph({ color, showFeedback }) {
  const points = useMemo(
    () => [
      [-0.3, 0],
      [-0.18, 0],
      [-0.12, 0.16],
      [-0.04, -0.12],
      [0.05, 0.1],
      [0.14, 0],
      [0.3, 0],
    ],
    [],
  );
  return (
    <group position={[0, -0.02, 0.28]} scale={0.72}>
      {points.slice(0, -1).map(([x, y], index) => (
        <mesh
          key={`${x}-${y}`}
          position={[(x + points[index + 1][0]) / 2, (y + points[index + 1][1]) / 2, 0]}
          rotation={[0, 0, Math.atan2(points[index + 1][1] - y, points[index + 1][0] - x)]}
        >
          <boxGeometry args={[Math.hypot(points[index + 1][0] - x, points[index + 1][1] - y), 0.025, 0.025]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={showFeedback ? 0.9 : 0.35} />
        </mesh>
      ))}
    </group>
  );
}

function LedHalo({ active, color }) {
  return (
    <mesh position={[-0.58, 0.04, 0.69]}>
      <torusGeometry args={[0.58, 0.025, 16, 72]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1.2 : 0.28} transparent opacity={active ? 0.95 : 0.55} />
    </mesh>
  );
}

function SensorPad({ active, color }) {
  return (
    <group position={[-0.58, -0.43, 0.57]}>
      <RoundedBox args={[0.46, 0.16, 0.08]} radius={0.08} smoothness={16}>
        <meshStandardMaterial
          color={active ? "#5b2740" : "#7d3c57"}
          emissive={active ? color : "#000000"}
          emissiveIntensity={active ? 0.5 : 0}
          roughness={0.34}
        />
      </RoundedBox>
      {[-0.12, 0, 0.12].map((x) => (
        <mesh key={x} position={[x, 0, 0.07]}>
          <sphereGeometry args={[0.025, 16, 10]} />
          <meshStandardMaterial color={active ? color : "#ffc6d8"} emissive={active ? color : "#000000"} emissiveIntensity={active ? 0.75 : 0} />
        </mesh>
      ))}
    </group>
  );
}

function HapticPulse({ side, active, color, refs, index }) {
  const sign = side === "left" ? -1 : 1;
  return (
    <mesh
      position={[-0.58 + sign * 0.82, 0.02, 0.62]}
      ref={(node) => {
        refs.current[index] = node;
      }}
      scale={[0.62, 1, 1]}
    >
      <torusGeometry args={[0.2, 0.012, 12, 48]} />
      <meshStandardMaterial
        color={active ? color : "#ffbad0"}
        emissive={active ? color : "#ffbad0"}
        emissiveIntensity={active ? 0.95 : 0.12}
        transparent
        opacity={active ? 0.78 : 0.28}
      />
    </mesh>
  );
}

export default App;
