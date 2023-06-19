# Summoner Description

Creates description, compare players or create new champs based on your League of Legends performance using an AI.
https://www.summonerdescription.com/








## Installation

Install local dependencies

```bash
  npm install or make install
```
Copy .env-example to .env and add your own env vars.
You will need to get [Riot](https://developer.riotgames.com/), [Paypal](https://www.paypal.com/uk/home) and [OpenAI](https://openai.com/) credentials.

If you want to run paypal you will need to also change the public address on index.html. Otherwise it wont work
```bash
<script
        src="https://www.paypal.com/sdk/js?client-id={{your client id}}&currency=USD&disable-funding=sofort">
</script>
```

Run locally

```bash
  npm start or make run
```

Run with docker

```bash
  make docker-build
  make docker-run
```


## Disclaimer

This is a small side project I created to play a bit with chatGPT, therefore:

* No test coverage was added
* There may be existing bugs
* Code cleaness can be improved (specially on frontend side)

I do not pretend to improve those points or showcase my skills as a developer, but decided to make this project open to share it with community as may be useful for someone (specially more junior engineers) that can be doing first steps on this world.

I won't improve or add anything else to this project but I'm keen to review and include pull requests that would improve this project or add new features.
If someone is interested just fork this repo and play with it.

No contributing guidelines are added yet. I will add it only if I see people interested on mantaining this.

