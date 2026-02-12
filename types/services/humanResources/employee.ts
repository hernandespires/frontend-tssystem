export interface Employee {
    id: string,
    name: string, 
    sex: string,
    birthday: string, 
    civilState: "" | "SINGLE" | "MARRIED" | "WIDOWED",
    // nacionality: "" | "BRAZILIAN" | "AMERICAN",
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
    typeEmployment: "" | "CLT" | "CNPJ" | "FREELANCE",
    laborModality: "" | "IN_PERSON" | "HYBRID" | "HOME_OFFICE",
    laborScale: "" | "_5X2" | "_4X3" | "_6X1",
    admissionDate: string,
    salary: null | number,
    residentialProve: string,
    reservist: boolean,
    documentation: string,
    bank: "" | "SANTANDER" | "SICRED" | "BANCO_DO_BRASIL",
    agency: string,
    account: string,
    pix: string,
    transportationVoucher: boolean,
    cnpjTransportationVoucher: string,
    monthlyAmount: null | number,
    additionalDocuments: string[],
    department: "" | "RESEARCH_AND_DEVELOPMENT" | "WEB_DESIGN" | "PAID_TRAFFIC",
    operation: "" | "_01" | "_02" | "_03",
    level: "" | "PUPPY" | "ASSISTANT" | "JUNIOR",
    status: "ACTIVE" | "INACTIVE",
    quitDate: string
}

export interface SendEmployee {
    name: string, 
    birthday: string, 
    sex: string,
    civilState: "" | "SINGLE" | "DATING" | "MARRIED" | "WIDOWED",
    // nacionality: "" | "BRAZILIAN" | "AMERICAN",
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
    typeEmployment: "" | "CLT" | "CNPJ" | "FREELANCE",
    laborModality: "" | "IN_PERSON" | "HYBRID" | "HOME_OFFICE",
    laborScale: "" | "_5X2" | "_4X3" | "_6X1",
    admissionDate: string,
    salary: null | number,
    residentialProve: string,
    reservist: boolean,
    documentation: string,
    bank: "" | "SANTANDER" | "SICRED" | "BANCO_DO_BRASIL",
    agency: null | number,
    account: null | number,
    pix: string,
    transportationVoucher: boolean,
    cnpjTransportationVoucher: string,
    monthlyAmount: null | number,
    additionalDocuments: string[],
    department: 
        "" | 
        "AUDIOVISUAL" | 
        "DESIGN" | 
        "STRATEGIC_MANAGER" | 
        "PROJECT_MANAGER" | 
        "SOCIAL_MEDIA" | 
        "TRANSLATION" | 
        "PAID_TRAFFIC" | 
        "WEB_DESIGN" | 
        "FINANCE" | 
        "HUMAN_RESOURCES" | 
        "MARKETING" | 
        "RESEARCH_AND_DEVELOPMENT" | 
        "SALES",
    operation: "" | "_01" | "_02" | "_03",
    level: "" | "TEST" | "PUPPY" | "JUNIOR_EAGLE" | "MID_LEVEL_EAGLE" | "SENIOR_EAGLE" | "JUNIOR_HIGH_EAGLE" | "MID_LEVEL_HIGH_EAGLE" | "SENIOR_HIGH_LEVEL" | "ASSISTANT" | "",
    status: "ACTIVE" | "INACTIVE",
    quitDate: string
}