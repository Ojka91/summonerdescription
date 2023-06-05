# Install dependencies
install:
	npm install

# Run the application
run:
	npm start

# Run the application dev mode
dev:
	npm run dev

# Build docker image
docker-build:	
	docker build -t summoner-description .

# Run docker
docker-run:	
	docker run --env-file='.env' -p 3000:3000 summoner-description





