import * as core from '@actions/core';

import { AbstractCmd } from './abstract-cmd';
import { HeadlessParameters } from '../headless-util/headless-parameters';

export abstract class AbstractCmdForProject extends AbstractCmd {

	protected readonly configFile: string;

	protected readonly projectDataDirectory: string;

	protected readonly projectName: string;
	protected readonly configFileDirectory: string;
	protected readonly overwriteConfigFile: boolean;
	protected readonly rootDirectory: string;

	constructor(installDir: string,
		protected readonly githubCheckoutPath: string, protected readonly githubProjectName: string) {
		super(installDir);
		
core.info("configFileDir1: " + core.getInput(HeadlessParameters.CONFIG_FILE_DIRECTORY, { required: false }) + " X");

		this.configFile = core.getInput(HeadlessParameters.CONFIG_FILE, { required: false });

		this.projectDataDirectory = core.getInput(HeadlessParameters.PROJECT_DATA_DIRECTORY, { required: false });

		this.projectName = core.getInput(HeadlessParameters.PROJECT_NAME, { required: false });
		this.configFileDirectory = core.getInput(HeadlessParameters.CONFIG_FILE_DIRECTORY, { required: false });
core.info("configFileDir2: " + this.configFileDirectory + " X");
		let hasNoConfigFile: boolean = this.configFile == null || this.configFile.length === 0;
core.info("configFileDir3: " + hasNoConfigFile + " X");
		this.overwriteConfigFile = this.getBooleanParameter(
			core.getInput(HeadlessParameters.OVERWRITE_CONFIG_FILE, { required: false }), hasNoConfigFile);
		this.rootDirectory = core.getInput(HeadlessParameters.ROOT_DIRECTORY, { required: false });
core.info("rootDir1: " + core.getInput(HeadlessParameters.ROOT_DIRECTORY, { required: false }) + " X");
core.info("rootDir2: " + this.rootDirectory + " X");

		// No configuration file and no root directory set => use checkout path as root directory.
		if (hasNoConfigFile && (this.rootDirectory == null || this.rootDirectory.length === 0)) {
			this.rootDirectory = this.githubCheckoutPath;
core.info("rootDir3: " + this.rootDirectory + " X");
		}

		// Patch root directory dependent attributes if neccessary.
		if (this.rootDirectory != null && this.rootDirectory.length > 0) {
core.info("rootDir4: " + this.rootDirectory + " X");
			if (this.configFileDirectory == null || this.configFileDirectory.length === 0) {
				this.configFileDirectory = this.githubCheckoutPath;
core.info("configFileDirectory1: " + this.configFileDirectory + " X");
			}
		}
	}
}