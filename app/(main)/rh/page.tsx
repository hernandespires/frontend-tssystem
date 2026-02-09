"use client"

import Button from "@/components/Button"
import DataMetrics from "@/components/DataMetrics"
import DataTable from "@/components/DataTable"
import { UploadContext } from "@/contexts/files/UploadContext"
import { useLogin } from "@/contexts/LoginContext"
import { CreateEmployeeContext } from "@/contexts/rh/Employee/CreateEmployeeContext"
import { FindAllEmployeesContext } from "@/contexts/rh/Employee/FindAllEmployeesContext"
import { FindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
import { Employee } from "@/types/services/humanResources/employee"
import { redirect, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { BsClipboardData } from "react-icons/bs"
import { FaPlus } from "react-icons/fa"
import { IoPersonAddOutline } from "react-icons/io5"
import { LuScanFace } from "react-icons/lu"
import { MdOutlinePersonSearch, MdPeopleOutline } from "react-icons/md"
import { PiTreeStructure } from "react-icons/pi"
import { VscSync } from "react-icons/vsc"

const Rh = () => {
    const { user } = useLogin()
    if (!user) redirect("/login")
        
    const router = useRouter()
    const { setEmployeeFound } = useContext(FindEmployeeContext)
    const { setEmployeeData } = useContext(CreateEmployeeContext)
    const { allEmployeesDataFound } = useContext(FindAllEmployeesContext)
    const uploadContext = useContext(UploadContext)

    console.log(allEmployeesDataFound, "allEmployeesDataFound")

    useEffect(() => {
        setEmployeeData({
            id: "",
            name: "", 
            birthday: "", 
            civilState: "",
            // nacionality: "" | "BRAZILIAN" | "AMERICAN",
            rg: "", 
            cpf: "",
            email: "", 
            motherName: "", 
            phone: "",
            city: "", 
            postalCode: "", 
            street: "", 
            neighborhood: "",
            workCard: "",
            pisPasep: "",
            typeEmployment: "",
            laborModality: "",
            laborScale: "",
            admissionDate: "",
            salary: null,
            residentialProve: "",
            reservist: false,
            documentation: "",
            bank: "",
            agency: null,
            account: null,
            pix: "",
            transportationVoucher: false,
            cnpjTransportationVoucher: "",
            monthlyAmount: null,
            additionalDocuments: [],
            department: "",
            operation: "",
            level: "",
            status: "ACTIVE",
            quitDate: ""
        })        
        
        uploadContext?.clearUploads()
    }, [])

    return (
        <main className="flex flex-col gap-6">
            <div className="flex gap-5 justify-between">
                <DataTable filter="Colaboradores" />
                <div className="flex flex-wrap gap-6 max-w-150">
                    <Button isFulled onClick={() => router.push('/')} icon={<BsClipboardData size={36} color="black" />} text="Relatório Mensal" />
                    <Button isFulled onClick={() => router.push('/')} icon={<LuScanFace size={36} color="black" />} text="Pontos" />
                    <Button isFulled onClick={() => router.push('/')} icon={<MdOutlinePersonSearch size={36} color="black" />} text="Banco de currículos" />
                    <Button onClick={() => {
                        router.push("/rh/cadastro-colaborador")
                        setEmployeeFound({
                            id: "",
                            name: "", 
                            birthday: "", 
                            civilState: "",
                            // nacionality: "" | "BRAZILIAN" | "AMERICAN",
                            rg: "", 
                            cpf: "",
                            email: "", 
                            motherName: "", 
                            phone: "",
                            city: "", 
                            postalCode: "", 
                            street: "", 
                            neighborhood: "",
                            workCard: "",
                            pisPasep: "",
                            typeEmployment: "",
                            laborModality: "",
                            laborScale: "",
                            admissionDate: "",
                            salary: null,
                            residentialProve: "",
                            reservist: false,
                            documentation: "",
                            bank: "",
                            agency: null,
                            account: null,
                            pix: "",
                            transportationVoucher: false,
                            cnpjTransportationVoucher: "",
                            monthlyAmount: null,
                            additionalDocuments: [],
                            department: "",
                            operation: "",
                            level: "",
                            status: "ACTIVE",
                            quitDate: ""
                        })
                    }} icon={<IoPersonAddOutline size={36} color="white" />} text="Cadastrar Colaboradores" />
                    <Button onClick={() => router.push('/')} icon={<MdPeopleOutline size={36} color="white" />} text="Gerenciar Operações" />
                    <Button onClick={() => router.push('/')} icon={<PiTreeStructure size={36} color="white" />} text="Gerenciar Departamentos" />
                </div>
            </div>
            <div className="flex gap-6">
                <div className="flex flex-col gap-6">
                    <Button onClick={() => router.push('/')} isFulled icon={<VscSync size={36} color="black" />} text="Processos Burocráticos" />
                    <Button onClick={() => router.push('/')} isDashed icon={<FaPlus size={36} color="white" />} text="Processos Burocráticos" />
                </div>
                <DataMetrics department="Recursos Humanos" datas={allEmployeesDataFound?.map((employee: Employee) => employee.sex)} />
            </div>
        </main>
    )
}

export default Rh