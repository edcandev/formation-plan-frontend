export function getAPI_URL(env: string) : string {
    
    if(env == 'dev') return 'https://generadorteseinnova.centralus.azurecontainer.io'
    if(env == 'prod') return 'http://generadorteseinnova.centralus.azurecontainer.io';
    return 'http://localhost:8080';
}
// const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';
