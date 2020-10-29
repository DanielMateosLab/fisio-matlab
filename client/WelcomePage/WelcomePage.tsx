import { Button, makeStyles, Typography } from "@material-ui/core"
import { useRouter } from "next/router"
import React from "react"
import Header from "../clientShared/Header"

export const principles: Array<{ name: string; description: string }> = [
  {
    name: "Simple",
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

const useStyles = makeStyles((theme) => ({
  authButtonsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "1vmax",
  },
  authButton: {
    margin: theme.spacing(0.5),
  },
  principles: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    columnGap: theme.spacing(1),
    padding: "max(8px, 2vw)",
  },
}))

const WelcomePage = () => {
  const classes = useStyles()
  const router = useRouter()

  function handleLoginButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault
    router.push("/login")
  }

  return (
    <div>
      <Header />
      <main>
        <div className={classes.authButtonsContainer}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.authButton}
            onClick={handleLoginButtonClick}
          >
            Inicia sesión
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.authButton}
          >
            Regístrate
          </Button>
        </div>
        <div className={classes.principles}>
          {principles.map((p) => (
            <div key={p.name}>
              <Typography variant="h6" component="h2" gutterBottom>
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
