# Download artifact from Azure Dev Ops build pipeline

This action takes arguments related to Azure Dev Ops build pipeline and downloads the artifact of latest successful build under GITHUB_WORKSPACE, which can be used in the subsequent github workflow step.


This would be very useful in case of uploading Azure Sec Pack related files to Azure VMs at the time of deployment.

## Example Usage in the github workflow

```yml
name: Github Workflow

on: [push]

jobs:
  ...

  # deploy new database schema using dacpac
  build:
      runs-on: ubuntu-latest
      steps:
      # checkout
      - uses: actions/checkout@v1
      # download artifact from azure dev ops
      - name: download artifacts from azure dev ops build pipeline
        uses: manishsat/ado-download-artifact@v1
        with:
          buildDefinitionId: ${{ secrets.buildDefinitionId }}
          pattoken: ${{ secrets.pattoken }}
          artifactName: ${{ secrets.artifactName }}
          orgName: ${{ secrets.orgName }}
          projectId:  ${{ secrets.projectId }}
```
Below is sample output while using in github workflow.
```bash
Run manishsat/ado-download-artifact@v1
Artifact download at  /home/runner/work/test-action/test-action/***
```
Artifact zip file will be available under $GITHUB_WORKSPACE/{artifactName}

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)