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
const core = __importStar(require("@actions/core"));
const artifact_downloader_1 = require("./artifact-downloader");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const buildDefinitionId = Number(core.getInput('buildDefinitionId'));
            const projectId = core.getInput('projectId');
            const patToken = core.getInput('patToken');
            const orgName = core.getInput('orgName');
            const artifactName = core.getInput('artifactName');
            const artifactDownloader = new artifact_downloader_1.ArtifactDownloader();
            artifactDownloader.download(projectId, buildDefinitionId, patToken, orgName, artifactName);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
