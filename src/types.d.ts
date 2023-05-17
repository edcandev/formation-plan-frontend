
export type HandlerFuction = {
    handleChange: ( cc : number) => void
}

export type UploadComponentResponse = {
    currentComponent : number,
    response? : StudentExcelResponse
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