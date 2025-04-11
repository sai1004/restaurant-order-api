pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                echo 'This is cloning the code base'
                git url:'https://github.com/sai1004/restaurant-order-api.git', branch: 'main'
                echo 'Cloning code base is done'
            }
        }
        stage('Build') {
            steps {
                echo 'Stopping old containers (if any)...'
                sh 'docker-compose down || true'

                echo 'Building fresh containers...'
                sh 'docker-compose build --no-cache'

                echo 'Build completed successfully ✅'
            }
        }
        stage('Test') {
            steps {
                echo 'Skipping the Test stage, Since there is no test cases found'
            }
        }
        stage('Push DockerHub Image') {
            steps {
                script {
                    // Get the correct image name (adjust if needed)
                    def imageName = 'sai1004/restaurant-order-api:latest'

                withCredentials([usernamePassword(
                credentialsId: 'DockerHubCred',
                usernameVariable: 'dockerHubUser',
                passwordVariable: 'dockerHubPass'
                )]) {
                        sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                        sh "docker image tag ${imageName} ${env.dockerHubUser}/restaurant-order-api:latest"
                        sh "docker push ${env.dockerHubUser}/restaurant-order-api:latest"
                        sh 'docker logout'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application'
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}
