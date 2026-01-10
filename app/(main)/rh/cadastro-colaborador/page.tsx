import RegistrationForm from "@/components/RegistrationForm";
import RoutesList from "@/components/RoutesList"

const CadastroColaborador = () => {
    const path: { name: string; route: string; }[] = [{ name: "Dashboard", route: "/rh" }, { name: "Cadastro de Colaborador", route: "/rh/cadastro-colaborador" }]
    
    return <section><RoutesList>{path}</RoutesList><RegistrationForm /></section>
}

export default CadastroColaborador