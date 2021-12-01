import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2'
import * as ssm from '@aws-cdk/aws-ssm'
import { GrafanaHandler } from './index';

const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

// It's nice to test, but not so nice to expose internal confidential information outside.
// Therefore, fail running the test when GRAFANA_PW and GRAFANA_URL are not set in env
function getRequiredEnvVariable(name: string) {
  const v = process.env[name];
  if (!v) {
      throw new Error(`Mising required environment variable needed for testing: "${name}"`);
  }
  return v;
}

const app = new cdk.App();
export class TestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const testingVpc = ec2.Vpc.fromLookup(this, "dataSourceTestingVpc", {
      vpcName: "mn-vpc",
    });

    const testingPrivateSubnetID1 = ec2.Subnet.fromSubnetId(
      this,
      "dataSourceTestingPrivateSubnetID1",
      ssm.StringParameter.fromStringParameterAttributes(
        this,
        "dataSourceSSMSubnet1",
        {
          parameterName: "/mn/landing-zone/vpc/subnets/private-1-id",
        }
      ).stringValue
    );

    const testingPrivateSubnetID2 = ec2.Subnet.fromSubnetId(
      this,
      "dataSourceTestingPrivateSubnetID2",
      ssm.StringParameter.fromStringParameterAttributes(
        this,
        "DataSourceSSMSubnet2",
        {
          parameterName: "/mn/landing-zone/vpc/subnets/private-2-id",
        }
      ).stringValue
    );

    const testingPrivateSubnetID3 = ec2.Subnet.fromSubnetId(
      this,
      "dataSourceTestingPrivateSubnetID3",
      ssm.StringParameter.fromStringParameterAttributes(
        this,
        "DataSourceSSMSubnet3",
        {
          parameterName: "/mn/landing-zone/vpc/subnets/private-3-id",
        }
      ).stringValue
    );

    new GrafanaHandler(this, 'pog', {
      dashboardAppName: 'cdkConstructTest',
      grafanaPw: getRequiredEnvVariable('GRAFANA_PW'),
      grafanaUrl: getRequiredEnvVariable('GRAFANA_URL'),
      pathToFile: '../src/test/test-dashboard.json',
      vpc: testingVpc,
      vpcSubnets: {subnets: [testingPrivateSubnetID1, testingPrivateSubnetID2, testingPrivateSubnetID3]}
    });
  }
};
new TestStack(app, 'test-stack', { env });
