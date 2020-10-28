import { makeStyles, Typography } from "@material-ui/core"
import React from "react"
import appName from "../../shared/appName"

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

export const appDescription = "Gestiona tu trabajo sin dolores de cabeza"

const useStyles = makeStyles((theme) => ({
  main: {
    padding: "2vw",
  },
  authButtons: {
    display: "flex",
    justifyContent: "center",
  },
  principles: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    columnGap: theme.spacing(1),
  },
  appName: {
    fontSize: "clamp(3.75rem, 10vw, 6rem)",
    fallbacks: {
      fontSize: "6rem",
    },
  },
}))

const WelcomePage = () => {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <header>
        <Typography align="center" variant="h1" className={classes.appName}>
          {appName}
        </Typography>
        <Typography align="center" variant="h5" gutterBottom>
          {appDescription}
        </Typography>
        <div className={classes.authButtons}>
          <button>Inicia sesión</button>
          <button>Regístrate</button>
        </div>
      </header>
      <main>
        <div className={classes.principles}>
          {principles.map((p) => (
            <div key={p.name}>
              <h3> {p.name} </h3>
              <p> {p.description} </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default WelcomePage
