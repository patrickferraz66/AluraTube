import React from "react";
import { StyledRegisterVideo } from "./styled";
import { createClient } from "@supabase/supabase-js";

function useForm(props) {
  const [values, setValues] = React.useState(props.initialValues);
  return {
    values,
    handleChange: (e) => {
      const value = e.target.value;
      const name = e.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    },
  };
}


const PROJECT_URL = "https://udaxedsffpyvaobrsuzw.supabase.co";
const PUBLIC_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkYXhlZHNmZnB5dmFvYnJzdXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzM0NzAsImV4cCI6MTk4Mzc0OTQ3MH0.QMXpA2znDgozrTetO9EhddlOejMVflJ3S-8M0C9XIXM";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const [formVisivel, setFormVisivel] = React.useState(false);
  const formCadastro = useForm({
    initialValues: {
      titulo: "",
      url: "",
    },
  });

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            supabase.from("video").insert({
              title:formCadastro.values.titulo,
              url:formCadastro.values.url,
              thumb:getThumbnail(formCadastro.values.url),
              playlist:"jogos",
            })
            .then((res)=>{
              console.log(res);
            })
            .catch((err)=>{
              console.log(err);
            })
            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              x
            </button>
            <input
              placeholder="Titulo do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
}
