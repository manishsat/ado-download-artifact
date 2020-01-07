import * as core from '@actions/core'
import { ArtifactDownloader } from './artifact-downloader';

async function run(): Promise<void> {
  
  try {
    const buildDefinitionId: number = Number(core.getInput('buildDefinitionId'));
    const projectId: string = core.getInput('projectId');
    const patToken: string = core.getInput('patToken');
    const orgName: string = core.getInput('orgName');
    const artifactName: string = core.getInput('artifactName');
    const artifactDownloader = new ArtifactDownloader();
    artifactDownloader.download(projectId,buildDefinitionId,patToken,orgName,artifactName);
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
