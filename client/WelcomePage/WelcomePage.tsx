import React from "react"
import styles from "./WelcomePage.module.css"

export const principles: Array<{ name: string; description: string }> = [
  {
    name: "Simplicidad",
    description:
      "Hecho para facilitarte la vida. Céntrate en lo realmente importante: tus pacientes.",
  },
  {
    name: "Por y para fisioterapeutas",
    description:
      "¡Colega, conozco la profesión de primera mano! Eso hace más fácil diseñar software para mejorar el flujo de trabajo.",
  },
  {
    name: "A la última",
    description:
      "Desarrollado con las tecnologías más avanzadas y eficientes para que nada pueda salir mal.",
  },
]

export const appName = "Fisio-matlab"
export const appDescription = "Gestiona tu trabajo sin dolores de cabeza"

const WelcomePage = () => (
  <div>
    <header>
      <h1 className={styles.title}> {appName} </h1>
      <h2 className={styles.description}> {appDescription} </h2>
      <div className={styles.authButtons}>
        <button>Inicia sesión</button>
        <button>Regístrate</button>
      </div>
    </header>
    <main>
      <div className={styles.principles}>
        {principles.map((p) => (
          <div key={p.name}>
            <h3 className={styles.principleTitle}> {p.name} </h3>
            <p> {p.description} </p>
          </div>
        ))}
      </div>
    </main>
  </div>
)

export default WelcomePage
