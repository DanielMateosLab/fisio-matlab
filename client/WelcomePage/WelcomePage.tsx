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
  header: {
    padding: "2vw",
    background: theme.palette.primary.main,
  },
  headerText: {
    color: theme.palette.primary.contrastText,
  },
  authButtons: {
    display: "flex",
    justifyContent: "center",
  },
  principles: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    columnGap: theme.spacing(1),
    padding: "2vw",
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
    <div>
      <header className={classes.header}>
        <Typography
          align="center"
          variant="h1"
          className={`${classes.appName} ${classes.headerText}`}
        >
          {appName}
        </Typography>
        <Typography
          align="center"
          variant="h5"
          component="h2"
          className={classes.headerText}
          gutterBottom
        >
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
              <Typography variant="h6" component="h1" gutterBottom>
                {p.name}
              </Typography>
              <Typography variant="body1"> {p.description} </Typography>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default WelcomePage
