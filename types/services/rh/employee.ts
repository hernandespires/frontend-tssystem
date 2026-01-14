export interface Employee { id_colaborador: string, nome_colaborador: string, documento_pessoal: string, status: string, data_admissao: string, data_desligamento: string }

export interface SendEmployee { nome_colaborador: string, documento_pessoal: string, status: string, data_admissao: string, data_desligamento: string }

export interface SendPersonalInformation { 
    employeeName: string,
    birthday: string,
    civilState: string, 
    nacionality: string, 
    rg: string, 
    cpf: string, 
    email: string, 
    motherName: string, 
    phone: string, 
    city: string, 
    postalCode: string, 
    street: string, 
    neighborhood: string
}