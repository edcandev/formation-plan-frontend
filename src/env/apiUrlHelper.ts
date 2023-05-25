export function getAPI_URL(env: string) : string {
    if(env == 'dev') return 'http://localhost'
    if(env == 'prod') return 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';
    return '';
}
// const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';
