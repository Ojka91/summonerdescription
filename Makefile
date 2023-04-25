# Install dependencies
install:
	npm install

# Run the application
run:
	npm start

# Build and run the dev docker image
docker-run:	
	docker build -t summoner-description . && docker run --env-file='.env-dev' -p 3000:3000 summoner-description





