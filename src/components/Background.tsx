import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";

export const Background = () => {

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return <Particles
    id="particulas"
    init={particlesInit}
    options={{
      background: {
        color: {
          value: "#2c3752",
        },
      },
      fpsLimit: 120,
      particles: {
        color: {
          value: "#ffffff",
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.3,
          straight: false,
        },
        number: {
          value: 6,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 75, max: 100 },
        },
      }
    }}
  />

}