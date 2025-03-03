const { AwsCdkConstructLibrary } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'gbvanrenswoude',
  authorAddress: 'gbvanrenswoude@gmail.com',
  cdkVersion: '1.134.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-grafana-json-dashboard-handler',
  repositoryUrl: 'https://github.com/gbvanrenswoude/cdk-grafana-json-dashboard-handler.git',
  gitignore: ['cdk.out', 'cdk.context.json'],
  python: {
    distName: 'cdk-grafana-json-dashboard-handler',
    module: 'cdk-grafana-json-dashboard-handler',
  },
  cdkDependencies: [
    'aws-cdk-lib/core',
    'aws-cdk-lib/aws-iam',
    'aws-cdk-lib/aws-lambda',
    'aws-cdk-lib/aws-ec2',
    'aws-cdk-lib/aws-kms',
    'aws-cdk-lib/aws-secretsmanager',
    'aws-cdk-lib/aws-logs',
    'aws-cdk-lib/aws-s3-deployment',
    'aws-cdk-lib/aws-s3',
    'aws-cdk-lib/aws-ssm',
  ],
  peerDeps: ['aws-cdk-lib/aws-kms'],
  // cdkTestDependencies: undefined,  /* AWS CDK modules required for testing. */
  // deps: ['md5-file'],                        /* Runtime dependencies of this module. */
  bundledDeps: ['md5-file'],
  // description: undefined,          /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['aws-cdk-lib/aws-secretsmanager'] /* Build dependencies for this module. */,
  // packageName: undefined,          /* The "name" in package.json. */
  // release: undefined,              /* Add release management to this project. */
});
project.synth();
