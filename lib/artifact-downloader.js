"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const azdev = __importStar(require("azure-devops-node-api"));
const bi = __importStar(require("azure-devops-node-api/interfaces/BuildInterfaces"));
const fs = __importStar(require("fs"));
class ArtifactDownloader {
    constructor() { }
    download(projectId, buildDefinitionId, patToken, orgName, artifactName) {
        return __awaiter(this, void 0, void 0, function* () {
            // base tfs url
            const baseTfsUrl = 'https://dev.azure.com';
            const orgUrl = `${baseTfsUrl}/${orgName}`;
            // get auth handler
            let authHandler = azdev.getPersonalAccessTokenHandler(patToken);
            // get the connection to webapi
            let connection = new azdev.WebApi(orgUrl, authHandler);
            const buildApi = yield connection.getBuildApi();
            // get top build for a particular definitions
            const builds = yield buildApi.getBuilds(projectId, [buildDefinitionId], undefined, undefined, undefined, undefined, undefined, undefined, bi.BuildStatus.Completed, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined);
            const latestBuild = builds[0];
            // get artifact as zip
            const readableStream = yield buildApi.getArtifactContentZip(projectId, Number(latestBuild.id), artifactName);
            const artifactDirPath = `${process.env.GITHUB_WORKSPACE}/${artifactName}`;
            // create artifact directory if not exists
            if (!fs.existsSync(artifactDirPath)) {
                fs.mkdirSync(artifactDirPath);
            }
            // store artifact
            const artifactFilePathStream = fs.createWriteStream(`${artifactDirPath}/${artifactName}.zip`);
            readableStream.pipe(artifactFilePathStream);
            readableStream.on('end', () => console.log('Artifact download at ', `${artifactDirPath}`));
        });
    }
}
exports.ArtifactDownloader = ArtifactDownloader;
