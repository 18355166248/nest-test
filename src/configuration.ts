import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { merge } from 'lodash';

const YAML_CONFIG_FILENAME = '../config/index.yml';
const YAML_ENV_CONFIG_FILENAME = `../config/index.${process.env.NODE_ENV}.yml`;

const commonConfig = yaml.load(
  readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
) as Record<string, any>;

const envConfig = yaml.load(
  readFileSync(join(__dirname, YAML_ENV_CONFIG_FILENAME), 'utf8'),
) as Record<string, any>;

export default () => {
  return merge(commonConfig, envConfig);
};
