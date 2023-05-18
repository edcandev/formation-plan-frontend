
export type HandlerFuction = {
    handleChange: ( cc : number) => void
}

export type ComponentResponse = {
    currentComponent : number,
    response? : StudentExcelResponse | PlanGeneratorResponse
}

export type PlanGeneratorResponse = {
    wasGenerated : boolean,
    fileName: string,
    studentId: string
}

export type StudentExcelResponse = {
    studentId : string,
    firstSurname : string,
    lastSurname : string,
    name : string,
    fileName : string,
    ieMentor : string,
    subjectList : Array<Subject>,

}

export type Subject = {
    subjectId: string,
    period: string,
    partial: string,
    valid: boolean
}

export type PlanGenerationRequestBody = {
    studentId: string,
    studentFileName : string,
    generationDateString: string,
    period : string
}