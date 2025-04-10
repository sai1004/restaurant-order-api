pipeline {
    agent any // using master node
    
    stages {
        stage("Clone Code") {
            steps {
                echo "Cloning repository..."
                git url: "https://github.com/sai1004/restaurant-order-api.git", branch: "main"
            }
        }

        stage("Cleanup Previous Build") {
            steps {
                echo "Removing old containers..."
                sh "docker-compose down --remove-orphans || true"
            }
        }

        stage("Pull Base Images") {
            steps {
                echo "Pulling latest base images..."
                sh "docker pull node:18 || true"
                sh "docker pull mysql:8.0 || true"
            }
        }

        stage("Build") {
            steps {
                echo "Building containers with cache..."
                sh "docker-compose build --pull"
                
                // Verify the image was created
                sh 'docker images | grep "restaurant-order-api"'
            }
        }

        stage("Push to DockerHub") {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: "DockerHubCred",
                        usernameVariable: "DOCKER_HUB_USER",
                        passwordVariable: "DOCKER_HUB_PASS"
                    )]) {
                        echo "Logging into DockerHub..."
                        sh "echo ${DOCKER_HUB_PASS} | docker login -u ${DOCKER_HUB_USER} --password-stdin"
                        
                        echo "Tagging and pushing image..."
                        // Use the exact image name from docker-compose.yml
                        sh "docker tag sai1004/restaurant-order-api:latest ${DOCKER_HUB_USER}/restaurant-order-api:latest"
                        sh "docker push ${DOCKER_HUB_USER}/restaurant-order-api:latest"
                        
                        sh "docker logout"
                    }
                }
            }
        }

        stage("Deploy") {
            steps {
                echo "Starting services..."
                sh "docker-compose up -d"
            }
        }
    }
    
    post {
        always {
            echo "Cleaning up..."
            sh "docker system prune -f --filter 'until=24h' || true"
        }
        failure {
            echo "Pipeline failed - sending notification..."
            // Add your notification logic here (Slack/Email)
        }
    }
}