import jenkins.model.*
def instance = jenkins.model.Jenkins.instance


//###################################################################################
//folder("autoTesting") {
//        description('Automatic testing jobs')
//}
//pipelineJob('jenkins/Restart-All') {
//        description('Nightly restart of jenkins.')
//        displayName('Restart-All')
//        definition {
//                cpsScm {
//                        scm {
//                                git {
//                                        remote {
//                                                url("${GITHUB_GITOPS_REPO}")
//                                                credentials('git-jenkins')
//                                        }
//                                        branch('*/main')
//                                }
//                        }
//                        scriptPath("pipelines/${ENV_NAME}/rollout-restart.pipeline")
//                        lightweight(true)
//                }
//        }
//}
//if (!jenkins.model.Jenkins.instance.getItemByFullName('jenkins/Restart-All')) {
//        queue('jenkins/Restart-All')
//}

