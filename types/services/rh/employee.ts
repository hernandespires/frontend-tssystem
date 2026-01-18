export interface Employee { id_colaborador: string, nome_colaborador: string, documento_pessoal: string, status: string, data_admissao: string, data_desligamento: string }

// export interface SendEmployee { nome_colaborador: string, documento_pessoal: string, status: string, data_admissao: string, data_desligamento: string }

export interface SendEmployee { 
    name: string, 
    birthday: Date | null, 
    civilState: "" | "single" | "married" | "widowed",
    nacionality: "" | "brazilian" | "american" | "other",
    rg: string, 
    cpf: string, 
    email: string, 
    motherName: string, 
    phone: string, 
    city: string, 
    postalCode: string, 
    street: string, 
    neighborhood: string,
    workCard: string,
    pisPasep: string,
    typeEmployment: string,
    laborModality: string,
    laborScale: string,
    admissionDate: string,
    salary: string,
    residentialProve: string,
    reservist: boolean,
    documentation: string
}