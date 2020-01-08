import * as azdev from 'azure-devops-node-api';
import * as bi from 'azure-devops-node-api/interfaces/BuildInterfaces';
import * as fs from 'fs';

export class ArtifactDownloader {
    constructor(){}
    public async download(projectId: string, buildDefinitionId:number,
        patToken: string,  orgName: string,artifactName: string): Promise<void> {
        
            // base tfs url
            const baseTfsUrl = 'https://dev.azure.com';
            const orgUrl = `${baseTfsUrl}/${orgName}`;

            // get auth handler
            let authHandler = azdev.getPersonalAccessTokenHandler(patToken);
            // get the connection to webapi
            let connection = new azdev.WebApi(orgUrl, authHandler);
            const buildApi = await connection.getBuildApi();
            // get top build for a particular definitions
            const builds = await buildApi.getBuilds(projectId, [buildDefinitionId], undefined, undefined, undefined,undefined, undefined, undefined,  bi.BuildStatus.Completed, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined);
            const  latestBuild = builds[0];
            // get artifact as zip
            const readableStream = await buildApi.getArtifactContentZip(projectId, Number(latestBuild.id),artifactName);
            const artifactDirPath = `${process.env.GITHUB_WORKSPACE}/${artifactName}`
            // create artifact directory if not exists
            if (!fs.existsSync(artifactDirPath)) {
                fs.mkdirSync(artifactDirPath);
            }
            
            // store artifact
            const artifactFilePathStream = fs.createWriteStream(`${artifactDirPath}/${artifactName}.zip`);
            readableStream.pipe(artifactFilePathStream);
            readableStream.on('end',()=>{
                console.log(`Artifact of build number ${latestBuild.buildNumber} downloaded at ${artifactDirPath}`);
            });
    }
}