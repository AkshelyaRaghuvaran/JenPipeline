import jenkins.model.*
def instance = jenkins.model.Jenkins.instance


//###################################################################################
pipelineJob('demo') {
        description('Nightly restart of jenkins.')
        displayName('demo')
        definition {
                cpsScm {
                        scm {
                                git {
                                        remote {
                                                url("${GITHUB_GITOPS_REPO}")
                                                credentials('git-jenkins')
                                        }
                                        branch('*/main')
                                }
                        }
                        scriptPath("${PLATFORM_ITERATION}/${ENV_NAME}/pipelines/demo.pipeline")
                        lightweight(true)
                }
        }
}
//###################################################################################
